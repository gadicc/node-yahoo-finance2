import {
  createTestYahooFinance,
  describe,
  it,
  PERFORM_FAKE_TESTS,
  setupCache,
} from "../../tests/common.ts";
import screener from "./screener.ts";

const YahooFinance = createTestYahooFinance({ modules: { screener } });
const yf = new YahooFinance();

describe("screener", () => {
  setupCache();

  // TODO - Add reset of predefined screener responses
  it.each(["aggressive_small_caps"])(
    "passes validation for predefined screener '%s'",
    async (predefined_screener) => {
      await yf.screener(
        { scrIds: predefined_screener },
        {
          devel: `screener-${predefined_screener}.json`,
        },
      );
    },
  );

  /* TODO
  if (PERFORM_FAKE_TESTS) {
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(
        yf.screener({ scrIds: "aggressive_small_caps" }, { devel }),
      ).rejects.toThrow(/^Unexpected result/);
    });
  }
  */
});
