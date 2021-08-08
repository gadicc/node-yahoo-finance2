import insights from "./insights.js";
import { testSymbols as commonTestSymbols } from "../../tests/symbols.js";

import testYf from "../../tests/testYf.js";

const yf = testYf({ insights });
const testSymbols = [
  ...commonTestSymbols,
  "ABBOTINDIA.NS", // field "upsell" with { "companyName", "upsellReportType" }
];

describe("insights", () => {
  it.each(testSymbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.insights(symbol, undefined, {
      devel: `insights-${symbol}.json`,
    });
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.insights("A", {}, { devel })).rejects.toThrow(
        /^Unexpected result/
      );
    });
});
