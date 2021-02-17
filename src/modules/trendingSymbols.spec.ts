import trendingSymbols from "./trendingSymbols";
import testYf from "../../tests/testYf";

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
});
