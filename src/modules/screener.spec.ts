import screener from "./screener.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ screener });

describe("screener", () => {
  // TODO - Add reset of predefined screener responses
  it.each(["aggressive_small_caps"])(
    "passes validation for predefined screener '%s'",
    async (predefined_screener) => {
      await yf.screener(
        { scrIds: predefined_screener },
        {
          devel: `screener-${predefined_screener}.json`,
        }
      );
    }
  );
  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(
        yf.screener({ scrIds: "aggressive_small_caps" }, { devel })
      ).rejects.toThrow(/^Unexpected result/);
    });
});
