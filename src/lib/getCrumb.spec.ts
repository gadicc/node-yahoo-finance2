import env from "../env-node";
import getCrumb, { _getCrumb, getCrumbClear } from "./getCrumb";
import { MyCookieJar } from "./cookieJar.js";
import { jest } from "@jest/globals";
import { consoleSilent, consoleRestore } from "../../tests/console.js";
import options from "./options.js";

describe("getCrumb", () => {
  const { logger } = options;

  beforeAll(consoleSilent);
  afterAll(consoleRestore);

  describe("_getCrumb", () => {
    it("finds crumb in context", async () => {
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/AAPL",
        "getCrumb-quote-AAPL.json",
        true,
        new MyCookieJar()
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("ditto with shared cookie jar (don't use it for other tests)", async () => {
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(fetch, { devel: true }, logger);
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("re-uses cookie", async () => {
      const fetch = await env.fetchDevel();

      let crumb = await _getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/AAPL"
      );
      expect(crumb).toBe("mloUP8q7ZPH");

      // TODO, at tests to see how many times fetch was called, etc.

      crumb = await _getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/AAPL"
      );
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("throws on no cookies", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          fetch,
          { devel: true },
          logger,
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-cookies.fake.json",
          true,
          new MyCookieJar()
        )
      ).rejects.toThrowError(/No set-cookie/);
    });

    it("throws on no context", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          fetch,
          { devel: true },
          logger,
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-context.fake.json",
          true,
          new MyCookieJar()
        )
      ).rejects.toThrowError(/Could not find window.YAHOO.context/);
    });

    it("throws on invalid json", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          fetch,
          { devel: true },
          logger,
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-invalid-json.fake.json",
          true,
          new MyCookieJar()
        )
      ).rejects.toThrowError(/Could not parse window.YAHOO.context/);
    });

    it("throws on no crumb", async () => {
      const fetch = await env.fetchDevel();

      await expect(() =>
        _getCrumb(
          fetch,
          { devel: true },
          logger,
          "https://finance.yahoo.com/quote/AAPL",
          "getCrumb-quote-AAPL-no-crumb.fake.json",
          true,
          new MyCookieJar()
        )
      ).rejects.toThrowError(/Could not find crumb/);
    });

    it("redirect https://guce.yahoo.com/consent?brandType=nonEu", async () => {
      // consoleRestore();
      const fetch = await env.fetchDevel();

      const crumb = await _getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/AAPL",
        "getCrumb-quote-AAPL-pre-consent-VPN-UK.json",
        true,
        new MyCookieJar()
      );
      expect(crumb).toBe("Ky3Po5TGQRZ");
      // consoleSilent();
    });
  });

  describe("getCrumb", () => {
    it("works", async () => {
      await getCrumbClear();
      const fetch = await env.fetchDevel();
      const crumb = await getCrumb(fetch, { devel: true }, logger);
      expect(crumb).toBe("mloUP8q7ZPH");
    });

    it("only calls getCrumb once", async () => {
      const fetch = await env.fetchDevel();
      const _getCrumb = jest.fn(() => "crumb");
      await getCrumbClear();

      getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/TSLA",
        _getCrumb as any
      );

      getCrumb(
        fetch,
        { devel: true },
        logger,
        "https://finance.yahoo.com/quote/TSLA",
        _getCrumb as any
      );

      expect(_getCrumb).toHaveBeenCalledTimes(1);
    });
  });
});
