import quote from "./quote";
import { testSymbols } from "../../tests/symbols";
import testYf from "../../tests/testYf";
import { zip } from "../../tests/utils/zip";

const yf = testYf({ quote });

describe("quote", () => {
  describe("passes validation", () => {
    it.each(testSymbols)("for symbol '%s'", async (symbol) => {
      const devel = `quote-${symbol}.json`;
      await yf.quote(symbol, {}, { devel });
    });

    it.each(testSymbols)("for symbol %s (for 10AM data)", async (symbol) => {
      const devel = `quote-${symbol}-10am.json`;
      await yf.quote(symbol, {}, { devel });
    });
  });

  it("allows blank options", async () => {
    await expect(() =>
      yf.quote("AAPL", undefined, { devel: "quote-AAPL.json" })
    ).not.toThrow();
  });

  it.each(zip(testSymbols, testSymbols.slice().reverse()))(
    "returns an array for an array ('%s', '%s')",
    async (symbol1, symbol2) => {
      const devel = `quote-${symbol1}-${symbol2}.json`;
      const results = await yf.quote([symbol1, symbol2], {}, { devel });
      expect(results.length).toBe(2);
      expect(results[0].symbol).toBe(symbol1);
      expect(results[1].symbol).toBe(symbol2);
    }
  );

  it.each(testSymbols)("returns single for a string ('%s')", async (symbol) => {
    const devel = `quote-${symbol}.json`;
    const result = await yf.quote(symbol, {}, { devel });
    expect(Array.isArray(result)).toBe(false);
    expect(result.symbol).toBe(symbol);
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on unexpected result", async () => {
      await expect(
        yf.quote("AAPL", {}, { devel: "weirdJsonResult.fake.json" })
      ).rejects.toThrow(/Unexpected result/);
    });
});
