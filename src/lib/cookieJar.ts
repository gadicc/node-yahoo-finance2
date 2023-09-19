import { Cookie, CookieJar } from "tough-cookie";

export class ExtendedCookieJar extends CookieJar {
  async setFromSetCookieHeaders(
    setCookieHeader: string | Array<string>,
    url: string
  ) {
    let cookies;
    // console.log("setFromSetCookieHeaders", setCookieHeader);

    if (typeof setCookieHeader === "undefined") {
      // no-op
    } else if (setCookieHeader instanceof Array) {
      cookies = setCookieHeader.map((header) => Cookie.parse(header));
    } else if (typeof setCookieHeader === "string") {
      cookies = [Cookie.parse(setCookieHeader)];
    }

    if (cookies)
      for (const cookie of cookies)
        if (cookie instanceof Cookie) {
          // console.log("setCookieSync", cookie, url);
          await this.setCookie(cookie, url);
        }
  }
}
