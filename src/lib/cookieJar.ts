import { Cookie, CookieJar } from "tough-cookie";

export class ExtendedCookieJar extends CookieJar {
  async setFromHeaders(headers: Headers, url: string): Promise<boolean> {
    const setCookieHeader = headers.get("set-cookie");
    let cookies: (Cookie | undefined)[];

    if (Array.isArray(setCookieHeader)) {
      cookies = setCookieHeader.map((header) => Cookie.parse(header));
    } else if (typeof setCookieHeader === "string") {
      cookies = [Cookie.parse(setCookieHeader)];
    } else return false;

    if (cookies) {
      for (const cookie of cookies) {
        if (cookie instanceof Cookie) {
          await this.setCookie(cookie, url);
        }
      }
      return true;
    } else return false;
  }
}
