import type { RequestInfo, RequestInit, Response } from "node-fetch";
import cookieJar from "./cookieJar.js";

let crumb: string | null = null;
// let crumbFetchTime = 0;
// const MAX_CRUMB_CACHE_TIME = 60_000 * 60 * 24;

async function _getCrumb(
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>,
  fetchOptionsBase: RequestInit,
  url = "https://finance.yahoo.com/quote/AAPL"
) {
  // if (crumb && crumbFetchTime + MAX_CRUMB_CACHE_TIME > Date.now()) return crumb;

  // If we still have a valid (non-expired) cookie, return the existing crumb.
  const existingCookies = cookieJar.getCookiesSync(url, { expire: true });
  if (existingCookies.length) return crumb;

  console.log("Fetching crumb and cookies from " + url + "...");

  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      // NB, we won't get a set-cookie header back without this:
      accept: "text/html,application/xhtml+xml,application/xml",
      // This request will get our first cookies, so nothing to send.
      // cookie: cookieJar.getCookieStringSync(url),
    },

    // @ts-expect-error: fetchDevel still has no types (yet)
    devel: fetchOptionsBase.devel && "getCrumb-quote-AAPL.json",
  };

  const response = await fetch(url, fetchOptions);
  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) cookieJar.setFromSetCookieHeaders(setCookieHeader, url);

  // console.log(response.headers);
  // console.log(setCookieHeader);
  // console.log(cookieJar);

  const cookie = cookieJar.getCookiesSync(url, { expire: true })[0];
  if (cookie) {
    console.log("Success.  Cookie expires on " + cookie.expires);
  } else {
    console.error(
      "No cookie was retreieved.  Probably the next request " +
        "will fail.  Please report."
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
    console.log(match[1]);
    console.log(error);
    throw new Error(
      "Could not parse window.YAHOO.context.  Yahoo's API may have changed; please report."
    );
  }

  crumb = context.crumb;
  if (!crumb)
    throw new Error(
      "Could not find crumb.  Yahoo's API may have changed; please report."
    );

  // crumbFetchTime = Date.now();

  return crumb;
}

let promise: Promise<string | null> | null = null;
let promiseTime = 0;

export default function getCrumb(
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>,
  fetchOptionsBase: RequestInit,
  url = "https://finance.yahoo.com/quote/AAPL"
) {
  // TODO, rather do this with cookie expire time somehow
  const now = Date.now();
  if (!promise || now - promiseTime > 60_000) {
    promise = _getCrumb(fetch, fetchOptionsBase, url);
    promiseTime = now;
  }

  return promise;
}
