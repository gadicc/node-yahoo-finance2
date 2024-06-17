import type { ExtendedCookieJar } from "./cookieJar";
import { Logger } from "./options.js";

// Prepare cookies for the API connection.
export async function getCookies(
  cookieJar: ExtendedCookieJar,
  fetchOptionsBase: RequestInit,
  logger: Logger,
  url: string
) {
  const cookies = await cookieJar.getCookies(url, {
    expire: true,
  });
  if (cookies.length > 0) return true;

  // This request will get our first cookies, so nothing to send.
  logger.debug("Fetching cookies from " + url + "...");
  const fetchOptions: RequestInit = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      // NB, we won't get a set-cookie header back without this:
      accept: "text/html,application/xhtml+xml,application/xml",
    },
    redirect: "manual",
  };

  const response = await fetch(url, fetchOptions);
  await cookieJar.setFromHeaders(response.headers, url);

  // Redirects when consent is missing.
  const location = response.headers.get("location");
  if (location) {
    if (location.match(/guce.yahoo/)) {
      const consentFetchOptions: RequestInit = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          // GUCS=XXXXXXXX; Max-Age=1800; Domain=.yahoo.com; Path=/; Secure
          cookie: await cookieJar.getCookieString(location),
        },
      };

      // Returns 302 to collectConsent?sessionId=XXX
      logger.debug("Fetch", location);
      const consentResponse = await fetch(location, consentFetchOptions);
      const consentLocation = consentResponse.headers.get("location");
    } else {
      throw new Error(
        "Unsupported redirect to " + location + ", please report."
      );
    }
  } else {
    logger.debug("Consent is given.");
  }

  return true;
}
