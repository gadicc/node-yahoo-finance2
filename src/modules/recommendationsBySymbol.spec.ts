import recommendationsBySymbol from "./recommendationsBySymbol.js";
import { testSymbols } from "../../tests/symbols.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ recommendationsBySymbol });

describe("recommendationsBySymbol", () => {
  // make sure it passes validation for some symbols
  describe("passes validation", () => {
    const symbolsToSkip = [
      // 404 Not Found
      "ADH",
      "BTC-USD",
    ];
    const symbols = testSymbols.filter((s) => !symbolsToSkip.includes(s));
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
      { devel }
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

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(
        yf.recommendationsBySymbol("AAPL", {}, { devel })
      ).rejects.toThrow(/^Unexpected result/);
    });
});
