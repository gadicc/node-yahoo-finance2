import recommendationsBySymbol from "./recommendationsBySymbol";
import { testSymbols } from "../../tests/symbols";

import _env from "../env-node";
import _fetch from "../lib/yahooFinanceFetch";
import _moduleExec from "../lib/moduleExec";
import { zip } from "../../tests/utils/zip";

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true } },
  _moduleExec,
  recommendationsBySymbol,
};

describe("recommendationsBySymbol", () => {
  const symbolsToSkip = [
    "ADH", // 404 Not Found
  ];
  const symbols = testSymbols.filter((s) => !symbolsToSkip.includes(s));

  // make sure it passes validation for some symbols
  describe("passes validation", () => {
    it.each(symbols)("for symbol '%s'", async (symbol) => {
      const devel = `recommendationsBySymbol-${symbol}.json`;
      await yf.recommendationsBySymbol(symbol, {}, { devel });
    });

    // make sure it passes validation for multiple symbols
    it.each(zip(symbols, symbols.slice().reverse()))(
      "for multiple symbols ('%s' and '%s')",
      async (symbol1, symbol2) => {
        const devel = `recommendationsBySymbol-${symbol1}-${symbol2}.json`;
        await yf.recommendationsBySymbol([symbol1, symbol2], {}, { devel });
      }
    );
  });

  it.each(zip(symbols, symbols.slice().reverse()))(
    "returns an array for an array ('%s', '%s')",
    async (symbol1, symbol2) => {
      const devel = `recommendationsBySymbol-${symbol1}-${symbol2}.json`;
      const results = await yf.recommendationsBySymbol(
        [symbol1, symbol2],
        {},
        { devel }
      );
      expect(results.length).toBe(2);
      expect(results[0].symbol).toBe(symbol1);
      expect(results[1].symbol).toBe(symbol2);
    }
  );

  it.each(symbols)("returns single for a string ('%s')", async (symbol) => {
    const devel = `recommendationsBySymbol-${symbol}.json`;
    const result = await yf.recommendationsBySymbol(symbol, {}, { devel });
    expect(Array.isArray(result)).toBe(false);
    expect(result.symbol).toBe(symbol);
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(
        yf.recommendationsBySymbol("AAPL", {}, { devel })
      ).rejects.toThrow(/^Unexpected result/);
    });
});
