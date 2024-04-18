import type { ExtendedCookieJar } from "./cookieJar";
import { Logger } from "./options.js";

// Prepare cookies for the API connection.
export async function getCookies(
  url: string,
  cookieJar: ExtendedCookieJar,
  fetchOptionsBase: RequestInit,
  logger: Logger
) {
  let cookies = await cookieJar.getCookies(url, {
    expire: true,
  });
  if (cookies.length > 0) return true;
  return false;
}
