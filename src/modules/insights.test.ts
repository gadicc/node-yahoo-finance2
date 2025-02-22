import {
  createTestYahooFinance,
  describe,
  // expect,
  it,
  setupCache,
  testSymbols,
} from "../../tests/common.ts";

import insights from "./insights.ts";

const YahooFinance = createTestYahooFinance({ modules: { insights } });
const yf = new YahooFinance();

describe("insights", () => {
  setupCache();

  const symbols = testSymbols({
    add: [
      "ABBOTINDIA.NS", // field "upsell" with { "companyName", "upsellReportType" }
      "HIDV", //  instrumentInfo/keyTechnicals missingProperty: "stopLoss" (#663)
      "MPAY", // companySnapshot missingProperty: "sectorInfo" (#663)
      "RUSHA", // targetPriceStatus/enum "-" (#663)
    ],
  });

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.insights(symbol, undefined, {
      devel: `insights-${symbol}.json`,
    });
  });

  /* XXX TODO
  if (process.env.FETCH_DEVEL !== "nocache") {
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.insights("A", {}, { devel })).rejects.toThrow(
        /^Unexpected result/,
      );
    });
  }
  */
});
