import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  PERFORM_FAKE_TESTS,
  setupCache,
  testSymbols,
} from "../../tests/common.ts";

import recommendationsBySymbol from "./recommendationsBySymbol.ts";

const YahooFinance = createTestYahooFinance({
  modules: { recommendationsBySymbol },
});
const yf = new YahooFinance();

describe("recommendationsBySymbol", () => {
  setupCache();

  // make sure it passes validation for some symbols
  describe("passes validation", () => {
    const symbols = testSymbols({
      skip: [
        // 404 Not Found
        "ADH",
        "BTC-USD",
        "GC=F",
        "APS.AX",
      ],
    });

    it.each(symbols)("for symbol '%s'", async (symbol) => {
      const devel = `recommendationsBySymbol-${symbol}.json`;
      await yf.recommendationsBySymbol(symbol, {}, { devel });
    });
  });

  // make sure it passes validation for multiple symbols
  it(`passes validation for multiple symbols ("AAPL" and "BMW.DE")`, async () => {
    const devel = `recommendationsBySymbol-AAPL-BMW.DE.json`;
    await yf.recommendationsBySymbol(["AAPL", "BMW.DE"], {}, { devel });
  });

  it("returns an array for an array", async () => {
    const devel = "recommendationsBySymbol-AAPL-BMW.DE.json";
    const results = await yf.recommendationsBySymbol(
      ["AAPL", "BMW.DE"],
      {},
      { devel },
    );
    expect(results.length).toBe(2);
    expect(results[0].symbol).toBe("AAPL");
    expect(results[1].symbol).toBe("BMW.DE");
  });

  it("returns single for a string", async () => {
    const devel = "recommendationsBySymbol-AAPL.json";
    const result = await yf.recommendationsBySymbol("AAPL", {}, { devel });
    expect(Array.isArray(result)).toBe(false);
    expect(result.symbol).toBe("AAPL");
  });

  /* XXX TODO
  if (PERFORM_FAKE_TESTS) {
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(
        yf.recommendationsBySymbol("AAPL", {}, { devel }),
      ).rejects.toThrow(/^Unexpected result/);
    });
  }
  */
});
