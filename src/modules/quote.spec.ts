import quote from "./quote";
import { testSymbols as testSymbolsOriginal } from "../../tests/symbols";
import testYf from "../../tests/testYf";

const testSymbols = [
  ...testSymbolsOriginal,
  "AZT.OL", // Far less properties than other symbols (#42)
];

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

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on unexpected result", async () => {
      await expect(
        yf.quote("AAPL", {}, { devel: "weirdJsonResult.fake.json" })
      ).rejects.toThrow(/Unexpected result/);
    });
});
