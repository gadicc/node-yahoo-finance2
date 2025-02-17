import {
  describe,
  expect,
  it,
  setupCache,
  testSymbols,
} from "../../tests/common.ts";

import quote from "./quote.ts";
import createYahooFinance from "../createYahooFinance.ts";

const YahooFinance = createYahooFinance({ modules: { quote } });
const yf = new YahooFinance();

/*
const marketStates = [
  "PREPRE",
  "CLOSED",
  "PRE",
  "REGULAR",
  "POSTPOST",
  //"POST" -- missing test!
];
*/

describe("quote", () => {
  setupCache();

  const symbols = testSymbols({
    add: [
      "AZT.OL", // Far less properties than other symbols (#42)
      "AAPL220121C00025000", // Option
      "LDO.MI", // additionalProperty: underlyingSymbol (#363)
      "ZRC-USD", // Low cap crypto (#403)
      "SOHO", // "openInterest" prop (#445)
    ],
  });

  /*
  const ticker = "ZRC-USD";
  it(`single test for ticker ${ticker}`, async () => {
    const devel = `quote-${ticker}.json`;
    const result = await yf.quote(ticker, {}, { devel });
    expect(result.symbol).toBe(ticker);
  });
  */

  describe("passes validation", () => {
    it.each(symbols)("for symbol '%s'", async (symbol) => {
      const devel = `quote-${symbol}.json`;
      await yf.quote(symbol, {}, { devel });
    });

    // TODO, what was this test? `:)  need to find original commmit for it.
    // Doesn't look like it does anything at all?
    /*
    it.each(marketStates)("for marketState %s", async (state) => {
      const devel = `quote-marketState-${state}.fake.json`;
      await yf.quote("fake", {}, { devel });
    });
    */
  });

  it("allows blank options", async () => {
    await expect(() =>
      yf.quote("AAPL", undefined, { devel: "quote-AAPL.json" })
    ).not.toThrow();
  });

  it("returns an array for an array", async () => {
    const devel = "quote-AAPL-BABA.json";
    const results = await yf.quote(["AAPL", "BABA"], {}, { devel });
    expect(results.length).toBe(2);
    expect(results[0].symbol).toBe("AAPL");
    expect(results[1].symbol).toBe("BABA");
  });

  it("returns single for a string", async () => {
    const devel = "quote-AAPL.json";
    const result = await yf.quote("AAPL", {}, { devel });
    expect(Array.isArray(result)).toBe(false);
    expect(result.symbol).toBe("AAPL");
  });

  /// XXX TODO
  /*
  if (process.env.FETCH_DEVEL !== "nocache") {
    it("throws on unexpected result", async () => {
      await expect(
        yf.quote("AAPL", {}, { devel: "weirdJsonResult.fake.json" }),
      ).rejects.toThrow(/Unexpected result/);
    });
  }
  */

  it("passes through single ?fields", async () => {
    const devel = "quote-TSLA-fields-symbol.json";
    const queryOpts = { fields: ["symbol"] };
    const result = await yf.quote("TSLA", queryOpts, { devel });
    expect(result.symbol).toBe("TSLA");
    expect(result.displayName).not.toBeDefined();
  });

  it("passes through multiple ?fields", async () => {
    const devel = "quote-TSLA-fields-symbol-shortName.json";
    const queryOpts = { fields: ["symbol", "displayName"] };
    const result = await yf.quote("TSLA", queryOpts, { devel });
    expect(result.symbol).toBe("TSLA");
    expect(result.displayName).toBeDefined();
  });

  describe("return type", () => {
    it("array", async () => {
      const devel = "quote-AAPL-BABA.json";
      const results = await yf.quote(
        ["AAPL", "BABA"],
        { return: "array" },
        { devel },
      );
      expect(results.length).toBe(2);
      expect(results[0].symbol).toBe("AAPL");
      expect(results[1].symbol).toBe("BABA");
    });

    it("object", async () => {
      const devel = "quote-AAPL-BABA.json";
      const results = await yf.quote(
        ["AAPL", "BABA"],
        { return: "object" },
        { devel },
      );
      expect(Object.keys(results).length).toBe(2);
      expect(results.AAPL.symbol).toBe("AAPL");
      expect(results.BABA.symbol).toBe("BABA");
    });

    it("map", async () => {
      const devel = "quote-AAPL-BABA.json";
      const results = await yf.quote(
        ["AAPL", "BABA"],
        { return: "map" },
        { devel },
      );
      expect(results.size).toBe(2);
      expect(results.get("AAPL")?.symbol).toBe("AAPL");
      expect(results.get("BABA")?.symbol).toBe("BABA");
    });
  });

  describe('{ quoteType: "NONE" }', () => {
    it("returns undefined on single result", async () => {
      const result = await yf.quote("BRKS", {}, { devel: "quote-BRKS.json" });
      expect(result).toBe(undefined);
    });
  });

  it("passes through beta field option", async () => {
    const devel = "quote-MSFT-fields-beta.json";
    const queryOpts = { fields: ["beta"] };
    const result = await yf.quote("MSFT", queryOpts, { devel });
    expect(result.symbol).toBe("MSFT");
    expect(result.beta).toBeDefined();
  });
});
