import options from "./options.js";
import testYf from "../../tests/testYf.js";
import { testSymbols as commonTestSymbols } from "../../tests/symbols.js";

const symbolsToSkip = [
  // Missing OptionType for {contract: BRKS220414C00097500 }, {tickerSymbol: BRKS },
  //   {strike: 97.5 }, {expirationDate: 1649894400 }
  "BRKS",
];

const testSymbols = commonTestSymbols.filter((s) => !symbolsToSkip.includes(s));

const yf = testYf({ options });

describe("options", () => {
  it.each(testSymbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.options(symbol, undefined, {
      devel: `options-${symbol}.json`,
    });
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.options("A", {}, { devel })).rejects.toThrow(
        /^Unexpected result/
      );
    });

  describe("date queryOpt should accept `date` as Date, number, string`", () => {
    // NB: fetchDevel will confirm that all options below map to same request params.
    // (because we re-use same devel filename)
    const devel = { devel: "options-AAPL-expire-2022-03-01.json" };

    it("accepts a Date", () => {
      return expect(
        yf.options("AAPL", { date: new Date("2022-03-01") }, devel)
      ).resolves.not.toThrow();
    });

    it("accepts a number", () => {
      return expect(
        yf.options("AAPL", { date: 1646092800 /* 2022-03-01 */ }, devel)
      ).resolves.not.toThrow();
    });

    it("accepts a string", () => {
      return expect(
        yf.options("AAPL", { date: "2022-03-01T00:00:00.000Z" }, devel)
      ).resolves.not.toThrow();
    });
  });
});
