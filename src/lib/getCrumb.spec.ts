import env from "../env-node";
import getCrumb, { _getCrumb, getCrumbClear } from "./getCrumb";
import { jest } from "@jest/globals";
import { consoleSilent, consoleRestore } from "../../tests/console.js";

import { ExtendedCookieJar } from "./cookieJar.js";

describe("getCrumb", () => {
  let cookieJar: ExtendedCookieJar;
  beforeAll(() => {
    consoleSilent();
    cookieJar = new ExtendedCookieJar();
  });
  afterAll(consoleRestore);

  describe("_getCrumb", () => {
    it("finds crumb in context", async () => {
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(
        new ExtendedCookieJar(),
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/AAPL",
        "getCrumb-quote-AAPL.json",
        true
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("ditto with shared cookie jar (don't use it for other tests)", async () => {
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true }
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("re-uses cookie", async () => {
      const fetch = await env.fetchDevel();

      let crumb = await _getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/AAPL"
      );
      expect(crumb).toBe("mloUP8q7ZPH");

      // TODO, at tests to see how many times fetch was called, etc.

      crumb = await _getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/AAPL"
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("throws on no cookies", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          new ExtendedCookieJar(),
          fetch,
          // @ts-expect-error: fetchDevel still has no types (yet)
          { devel: true },
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-cookies.fake.json",
          true
        )
      ).rejects.toThrowError(/No set-cookie/);
    });

    it("throws on no context", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          new ExtendedCookieJar(),
          fetch,
          // @ts-expect-error: fetchDevel still has no types (yet)
          { devel: true },
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-context.fake.json",
          true
        )
      ).rejects.toThrowError(/Could not find window.YAHOO.context/);
    });

    it("throws on invalid json", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          new ExtendedCookieJar(),
          fetch,
          // @ts-expect-error: fetchDevel still has no types (yet)
          { devel: true },
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-invalid-json.fake.json",
          true
        )
      ).rejects.toThrowError(/Could not parse window.YAHOO.context/);
    });

    it("throws on no crumb", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          new ExtendedCookieJar(),
          fetch,
          // @ts-expect-error: fetchDevel still has no types (yet)
          { devel: true },
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-crumb.fake.json",
          true
        )
      ).rejects.toThrowError(/Could not find crumb/);
    });

    it("redirect https://guce.yahoo.com/consent?brandType=nonEu", async () => {
      // consoleRestore();
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(
        new ExtendedCookieJar(),
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/AAPL",
        "getCrumb-quote-AAPL-pre-consent-VPN-UK.json",
        true
      );
      expect(crumb).toBe("Ky3Po5TGQRZ");
      // consoleSilent();
    });
  });

  describe("getCrumb", () => {
    it("works", async () => {
      await getCrumbClear(cookieJar);
      const fetch = await env.fetchDevel();
      const crumb = await getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true }
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("only calls getCrumb once", async () => {
      const fetch = await env.fetchDevel();
      const _getCrumb = jest.fn(() => "crumb");
      await getCrumbClear(cookieJar);

      getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/TSLA",
        _getCrumb
      );

      getCrumb(
        cookieJar,
        fetch,
        // @ts-expect-error: fetchDevel still has no types (yet)
        { devel: true },
        "https://finance.yahoo.com/quote/TSLA",
        _getCrumb
      );

      expect(_getCrumb).toHaveBeenCalledTimes(1);
    });
  });
});
