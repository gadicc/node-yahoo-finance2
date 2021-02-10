import recommendationsBySymbol from "./recommendationsBySymbol";
import { testSymbols } from "../../tests/symbols";

import _env from "../env-node";
import _fetch from "../lib/yahooFinanceFetch";
import _moduleExec from "../lib/moduleExec";

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true } },
  _moduleExec,
  recommendationsBySymbol,
};

describe("recommendationsBySymbol", () => {
  // make sure it passes validation for some symbols
  testSymbols.forEach((symbol) => {
    it(`passes validation for symbol: ${symbol}`, async () => {
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
