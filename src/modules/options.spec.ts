import options from "./options.js";
import testYf from "../../tests/testYf.js";
import { testSymbols } from "../../tests/symbols.js";

const yf = testYf({ options });

describe("options", () => {
  it.each(testSymbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.options(symbol, undefined, {
      devel: `trendingSymbols-${symbol}.json`,
    });
  });
  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.options("A", {}, { devel })).rejects.toThrow(
        /^Unexpected result/
      );
    });
});
