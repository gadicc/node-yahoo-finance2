import quote from "./quote.js";
import { testSymbols as testSymbolsOriginal } from "../../tests/symbols.js";
import testYf from "../../tests/testYf.js";

const testSymbols = [
  ...testSymbolsOriginal,
  "AZT.OL", // Far less properties than other symbols (#42)
];

const marketStates = [
  "PREPRE",
  "CLOSED",
  "PRE",
  "REGULAR",
  "POSTPOST",
  //"POST" -- missing test!
];

const yf = testYf({ quote });

describe("quote", () => {
  describe("passes validation", () => {
    it.each(testSymbols)("for symbol '%s'", async (symbol) => {
      const devel = `quote-${symbol}.json`;
      await yf.quote(symbol, {}, { devel });
    });

    if (0)
      it.each(testSymbols)("for symbol %s (for 10AM data)", async (symbol) => {
        const devel = `old/quote-${symbol}-10am.json`;
        await yf.quote(symbol, {}, { devel });
      });

    it.each(marketStates)("for marketState %s", async (state) => {
      const devel = `quote-marketState-${state}.fake.json`;
      await yf.quote("fake", {}, { devel });
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
});
