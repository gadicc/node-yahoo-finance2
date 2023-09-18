import type { RequestInfo, RequestInit, Response } from "node-fetch";
import type { ExtendedCookieJar } from "./cookieJar";
import { Logger } from "./options.js";
import { Cookie } from "tough-cookie";

const CONFIG_FAKE_URL = "http://config.yf2/";

let crumb: string | null = null;

const parseHtmlEntities = (str: string) =>
  str.replace(/&#x([0-9A-Fa-f]{1,3});/gi, (_, numStr) =>
    String.fromCharCode(parseInt(numStr, 16))
  );

type CrumbOptions = RequestInit & { devel?: boolean | string };
export async function _getCrumb(
  cookieJar: ExtendedCookieJar,
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>,
  fetchOptionsBase: CrumbOptions,
  logger: Logger,
  url = "https://finance.yahoo.com/quote/AAPL",
  develOverride = "getCrumb-quote-AAPL.json",
  noCache = false
): Promise<string | null> {
  if (!crumb) {
    const cookies = await cookieJar.getCookies(CONFIG_FAKE_URL);
    for (const cookie of cookies) {
      if (cookie.key === "crumb") {
        crumb = cookie.value;
        console.log("Retrieved crumb from cookie store: " + crumb);
        break;
      }
    }
  }

  if (crumb && !noCache) {
    // If we still have a valid (non-expired) cookie, return the existing crumb.
    const existingCookies = await cookieJar.getCookies(url, { expire: true });
    if (existingCookies.length) return crumb;
  }

  async function processSetCookieHeader(
    header: string[] | undefined,
    url: string
  ) {
    if (header) {
      await cookieJar.setFromSetCookieHeaders(header, url);
      return true;
    }
    return false;
  }

  logger.debug("Fetching crumb and cookies from " + url + "...");

  const fetchOptions: CrumbOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      // NB, we won't get a set-cookie header back without this:
      accept: "text/html,application/xhtml+xml,application/xml",
      // This request will get our first cookies, so nothing to send.
      // cookie: await cookieJar.getCookieString(url),
    },
    redirect: "manual",
    devel: fetchOptionsBase.devel && develOverride,
  };

  const response = await fetch(url, fetchOptions);
  await processSetCookieHeader(response.headers.raw()["set-cookie"], url);

  // logger.debug(response.headers.raw());
  // logger.debug(cookieJar);

  const location = response.headers.get("location");
  if (location) {
    if (location.match(/guce.yahoo/)) {
      const consentFetchOptions: typeof fetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          // GUCS=XXXXXXXX; Max-Age=1800; Domain=.yahoo.com; Path=/; Secure
          cookie: await cookieJar.getCookieString(location),
        },
        devel: "getCrumb-quote-AAPL-consent.html",
      };
      // Returns 302 to collectConsent?sessionId=XXX
      logger.debug("fetch", location /*, consentFetchOptions */);
      const consentResponse = await fetch(location, consentFetchOptions);
      const consentLocation = consentResponse.headers.get("location");

      if (consentLocation) {
        if (!consentLocation.match(/collectConsent/))
          throw new Error("Unexpected redirect to " + consentLocation);

        const collectConsentFetchOptions: typeof fetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation),
          },
          devel: "getCrumb-quote-AAPL-collectConsent.html",
        };
        logger.debug(
          "fetch",
          consentLocation /*, collectConsentFetchOptions */
        );

        const collectConsentResponse = await fetch(
          consentLocation,
          collectConsentFetchOptions
        );
        const collectConsentBody = await collectConsentResponse.text();

        const collectConsentResponseParams =
          [
            ...collectConsentBody.matchAll(
              /<input type="hidden" name="([^"]+)" value="([^"]+)">/g
            ),
          ]
            .map(
              ([, name, value]) =>
                `${name}=${encodeURIComponent(parseHtmlEntities(value))}&`
            )
            .join("") + "agree=agree&agree=agree";

        const collectConsentSubmitFetchOptions: typeof fetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation),
            "content-type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          // body: "csrfToken=XjJfOYU&sessionId=3_cc-session_bd9a3b0c-c1b4-4aa8-8c18-7a82ec68a5d5&originalDoneUrl=https%3A%2F%2Ffinance.yahoo.com%2Fquote%2FAAPL%3Fguccounter%3D1&namespace=yahoo&agree=agree&agree=agree",
          body: collectConsentResponseParams,
          devel: "getCrumb-quote-AAPL-collectConsentSubmit",
        };
        logger.debug(
          "fetch",
          consentLocation /*, collectConsentSubmitFetchOptions */
        );
        const collectConsentSubmitResponse = await fetch(
          consentLocation,
          collectConsentSubmitFetchOptions
        );

        // Set-Cookie: CFC=AQABCAFkWkdkjEMdLwQ9&s=AQAAAClxdtC-&g=ZFj24w; Expires=Wed, 8 May 2024 01:18:54 GMT; Domain=consent.yahoo.com; Path=/; Secure
        if (
          !(await processSetCookieHeader(
            collectConsentSubmitResponse.headers.raw()["set-cookie"],
            consentLocation
          ))
        )
          throw new Error(
            "No set-cookie header on collectConsentSubmitResponse, please report."
          );

        // https://guce.yahoo.com/copyConsent?sessionId=3_cc-session_04da10ea-1025-4676-8175-60d2508bfc6c&lang=en-GB
        const collectConsentSubmitResponseLocation =
          collectConsentSubmitResponse.headers.get("location");
        if (!collectConsentSubmitResponseLocation)
          throw new Error(
            "collectConsentSubmitResponse unexpectedly did not return a Location header, please report."
          );

        const copyConsentFetchOptions: typeof fetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(
              collectConsentSubmitResponseLocation
            ),
          },
          devel: "getCrumb-quote-AAPL-copyConsent",
        };

        logger.debug(
          "fetch",
          collectConsentSubmitResponseLocation /*, copyConsentFetchOptions */
        );
        const copyConsentResponse = await fetch(
          collectConsentSubmitResponseLocation,
          copyConsentFetchOptions
        );

        if (
          !(await processSetCookieHeader(
            copyConsentResponse.headers.raw()["set-cookie"],
            collectConsentSubmitResponseLocation
          ))
        )
          throw new Error(
            "No set-cookie header on copyConsentResponse, please report."
          );

        const copyConsentResponseLocation =
          copyConsentResponse.headers.get("location");
        if (!copyConsentResponseLocation)
          throw new Error(
            "collectConsentSubmitResponse unexpectedly did not return a Location header, please report."
          );

        const finalResponseFetchOptions: typeof fetchOptions = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(
              collectConsentSubmitResponseLocation
            ),
          },
          devel: "getCrumb-quote-AAPL-consent-final-redirect.html",
        };

        return await _getCrumb(
          cookieJar,
          fetch,
          finalResponseFetchOptions,
          logger,
          copyConsentResponseLocation,
          "getCrumb-quote-AAPL-consent-final-redirect.html",
          noCache
        );
      }
    } else {
      throw new Error(
        "Unsupported redirect to " + location + ", please report."
      );
    }
  }

  const cookie = (await cookieJar.getCookies(url, { expire: true }))[0];
  if (cookie) {
    logger.debug("Success. Cookie expires on " + cookie.expires);
  } else {
    /*
    logger.error(
      "No cookie was retreieved.  Probably the next request " +
        "will fail.  Please report."
    );
    */
    throw new Error(
      "No set-cookie header present in Yahoo's response.  Something must have changed, please report."
    );
  }

  const source = await response.text();

  // Could also match on window.YAHOO.context = { /* multi-line JSON */ }
  const match = source.match(/\nwindow.YAHOO.context = ({[\s\S]+\n});\n/);
  if (!match) {
    throw new Error(
      "Could not find window.YAHOO.context. Yahoo's API may have changed; please report."
    );
  }

  let context;
  try {
    context = JSON.parse(match[1]);
  } catch (error) {
    logger.debug(match[1]);
    logger.error(error);
    throw new Error(
      "Could not parse window.YAHOO.context.  Yahoo's API may have changed; please report."
    );
  }

  crumb = context.crumb;
  if (!crumb)
    throw new Error(
      "Could not find crumb.  Yahoo's API may have changed; please report."
    );

  console.log("New crumb: " + crumb);
  await cookieJar.setCookie(
    new Cookie({
      key: "crumb",
      value: crumb,
    }),
    CONFIG_FAKE_URL
  );

  promise = null;
  return crumb;
}

let promise: Promise<string | null> | null = null;

export async function getCrumbClear(cookieJar: ExtendedCookieJar) {
  crumb = null;
  promise = null;
  await cookieJar.removeAllCookies();
}

export default function getCrumb(
  cookieJar: ExtendedCookieJar,
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>,
  fetchOptionsBase: CrumbOptions,
  logger: Logger,
  url = "https://finance.yahoo.com/quote/AAPL",
  __getCrumb = _getCrumb
) {
  if (!promise)
    promise = __getCrumb(cookieJar, fetch, fetchOptionsBase, logger, url);

  return promise;
}
