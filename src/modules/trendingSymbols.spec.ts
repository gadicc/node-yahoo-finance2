import trendingSymbols from "./trendingSymbols.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ trendingSymbols });

describe("trendingSymbols", () => {
  it.each(["US", "GB", "IT", "AU"])(
    "passes validation for country '%s'",
    async (country) => {
      await yf.trendingSymbols(country, undefined, {
        devel: `trendingSymbols-${country}.json`,
      });
    }
  );
  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.trendingSymbols("GB", {}, { devel })).rejects.toThrow(
        /^Unexpected result/
      );
    });
});
