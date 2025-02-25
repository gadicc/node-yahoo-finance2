import {
  createTestYahooFinance,
  describe,
  it,
  setupCache,
} from "../../tests/common.ts";

import trendingSymbols from "./trendingSymbols.ts";

const YahooFinance = createTestYahooFinance({ modules: { trendingSymbols } });
const yf = new YahooFinance();

describe("trendingSymbols", () => {
  setupCache();

  it.each(["US", "GB", "IT", "AU"])(
    "passes validation for country '%s'",
    async (country) => {
      await yf.trendingSymbols(country, undefined, {
        devel: `trendingSymbols-${country}.json`,
      });
    },
  );

  /* TODO
  if (process.env.FETCH_DEVEL !== "nocache") {
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.trendingSymbols("GB", {}, { devel })).rejects.toThrow(
        /^Unexpected result/,
      );
    });
  }
  */
});
