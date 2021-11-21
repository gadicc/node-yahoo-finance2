import { jest } from "@jest/globals";

import chart from "./chart.js";
import { testSymbols } from "../../tests/symbols.js";

import testYf from "../../tests/testYf.js";
import { consoleSilent, consoleRestore } from "../../tests/console.js";

const yf = testYf({ chart });

describe("chart", () => {
  // See also common module tests in moduleExec.spec.js

  const symbolsToSkip = [
    "ADH", // currency: null; Yahoo-finance does show a chart though, should we allow this?
    "BEKE", // BadRequestError: Data doesn't exist for startDate = 1577836800, endDate = 1578009600
    "BFLY", // BadRequestError: Data doesn't exist for startDate = 1577836800, endDate = 1578009600
    "^VXAPL", // firstTradeDate: null; Yahoo-finance shows an empty chart even though there's some data.
  ];
  const symbols = testSymbols.filter((s) => symbolsToSkip.indexOf(s) === -1);
  //const symbols = ["ADH"];

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.chart(
      symbol,
      {
        period1: "2020-01-01",
        period2: "2020-01-03",
      },
      { devel: `chart-${symbol}-2020-01-01-to-2020-01-03.json` }
    );
  });

  /*
  describe("transformWith", () => {
    const yf = { _moduleExec: jest.fn(), historical };
    // @ts-ignore: TODO
    yf.historical("symbol", { period1: "required-but-not-used" });
    // @ts-ignore: TODO
    const { transformWith } = yf._moduleExec.mock.calls[0][0].query;

    it("uses today's date as default for period2", () => {
      const now = new Date();
      const options = transformWith({ period1: "2020-01-01" });
      expect(options.period2).toBeDefined();
      expect(options.period2).toBe(Math.floor(now.getTime() / 1000));
    });
  });

  // #208
  describe("null values", () => {
    it("strips all-null rows", async () => {
      const createHistoricalPromise = () =>
        yf.historical(
          "EURGBP=X",
          {
            period1: 1567728000,
            period2: 1570665600,
          },
          { devel: "historical-EURGBP-nulls.json" }
        );

      await expect(createHistoricalPromise()).resolves.toBeDefined();

      const result = await createHistoricalPromise();

      // Without stripping, it's about 25 rows.
      expect(result.length).toBe(5);

      // No need to really check there are no nulls in the data, as
      // validation handles that for us automatically.
    });

    it("throws on a row with some nulls", () => {
      consoleSilent();
      return expect(
        yf
          .historical(
            "EURGBP=X",
            { period1: 1567728000, period2: 1570665600 },
            { devel: "historical-EURGBP-nulls.fake.json" }
          )
          .finally(consoleRestore)
      ).rejects.toThrow("SOME (but not all) null values");
    });
  });
  */
});
