import insights from "./insights.js";
import testSymbols from "../../tests/testSymbols.js";

import testYf from "../../tests/testYf.js";

const yf = testYf({ insights });

describe("insights", () => {
  const symbols = testSymbols({
    add: [
      "ABBOTINDIA.NS", // field "upsell" with { "companyName", "upsellReportType" }
    ],
  });

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
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
