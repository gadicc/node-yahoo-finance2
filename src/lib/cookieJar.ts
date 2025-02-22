// The following is for ts-json-schema-generator, which can't find the
// module installed by Deno, but isn't ussed in the exported schema.
// @ts-ignore: as above
import { Cookie, CookieJar } from "tough-cookie";

export class ExtendedCookieJar extends CookieJar {
  async setFromSetCookieHeaders(
    setCookieHeader: string | Array<string>,
    url: string,
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

    if (cookies) {
      for (const cookie of cookies) {
        if (cookie instanceof Cookie) {
          // console.log("setCookieSync", cookie, url);
          // @ts-ignore: relevant for ts-json-schema-generator
          await this.setCookie(cookie, url);
        }
      }
    }
  }
}
