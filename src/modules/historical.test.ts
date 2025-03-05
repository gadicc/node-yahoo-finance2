import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  setupCache,
  testSymbols,
} from "../../tests/common.ts";

import historical from "./historical.ts";
import chart from "./chart.ts";
import { consoleRestore, consoleSilent } from "../../tests/console.js";

const YahooFinance = createTestYahooFinance({ modules: { historical, chart } });
const yf = new YahooFinance();

describe("historical", () => {
  setupCache();

  // See also common module tests in moduleExec.spec.js

  const symbols = testSymbols({
    skip: [
      "BEKE",
      "BFLY",
      "SIMP",
      "^VXAPL",
      "APS.AX", // Not Found
      "ADH", // Not found
      "SIX", // Not found
      "SI", // Not found
    ],
  });

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.historical(
      symbol,
      {
        period1: "2020-01-01",
        period2: "2020-01-03",
      },
      { devel: `historical-via-chart-${symbol}-2020-01-01-to-2020-01-03.json` },
    );
  });

  it("throws if period1,period2 are the same", async () => {
    await expect(
      yf.historical("TSLA", { period1: "2022-02-22", period2: "2022-02-22" }),
    ).rejects.toThrow(/cannot share the same value/);
  });

  it("throws if period{1,2} gets an invalid string for new Date()", async () => {
    consoleSilent();
    await expect(yf.historical("TSLA", { period1: "invalid" })).rejects.toThrow(
      // /invalid date provided/,
      /yahooFinance.historical called with invalid options/,
    );

    await expect(
      yf.historical("TSLA", { period1: "2022-02-022", period2: "invalid" }),
    ).rejects.toThrow(/invalid date provided/);
    consoleRestore();
  });

  it("dividends pass validation (#557)", async () => {
    await yf.historical(
      "MSFT",
      {
        period1: "2021-02-01",
        period2: "2022-01-31",
        events: "dividends",
      },
      {
        devel:
          "historical-via-chart-MSFT-dividends-2021-02-01-to-2022-01-31.csv",
      },
    );
  });

  it("splits pass validation (#557)", async () => {
    await yf.historical(
      "NVDA",
      {
        period1: "2021-02-01",
        period2: "2022-01-31",
        events: "split",
      },
      { devel: "historical-via-chart-NVDA-split-2021-02-01-to-2022-01-31.csv" },
    );
  });

  /*
   * {
   *    "date": "2024-09-13T13:30:00.000Z",
   *    "high": null,
   *    "volume": null,
   *    "open": null,
   *    "low": null,
   *    "close": null,
   *    "adjclose": null
   * }
   */
  it("filters out null rows", async () => {
    await yf.historical(
      "0P0000XTS7",
      {
        period1: "2024-09-12",
        period2: "2024-09-16",
      },
      {
        devel: "historical-via-chart-0P0000XTS7-2024-09-12-to-2024-09-16.json",
      },
    );
  });

  /*
  // Note: module no longer moduleExec, instead calls chart()
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
  */

  /*
  // #208
  if (false) {
    // Irrelevant for "via-chart"
    describe("null values", () => {
      if (process.env.FETCH_DEVEL !== "nocache") {
        it("strips all-null rows", async () => {
          const createHistoricalPromise = () =>
            yf.historical(
              "EURGBP=X",
              {
                period1: 1567728000,
                period2: 1570665600,
              },
              // Not a "fake" but seems fixed in newer Yahoo requests
              // so let's test against our previously saved cache.
              { devel: "historical-EURGBP-nulls.saved.fake.json" },
            );

          await expect(createHistoricalPromise()).resolves.toBeDefined();

          const result = await createHistoricalPromise();

          // Without stripping, it's about 25 rows.
          expect(result.length).toBe(5);

          // No need to really check there are no nulls in the data, as
          // validation handles that for us automatically.
        });
      }

      if (process.env.FETCH_DEVEL !== "nocache") {
        it("throws on a row with some nulls", () => {
          consoleSilent();
          return expect(
            yf
              .historical(
                "EURGBP=X",
                { period1: 1567728000, period2: 1570665600 },
                { devel: "historical-EURGBP-nulls.fake.json" },
              )
              .finally(consoleRestore),
          ).rejects.toThrow("SOME (but not all) null values");
        });
      }
    });
  }
  */

  it("handles events:dividends for stocks with no dividends (#658)", async () => {
    await yf.historical(
      "TSLA", // No dividends at time of writing
      {
        period1: 0,
        period2: "2023-08-12", // time of writing :)
        events: "dividends",
        interval: "1d",
      },
      { devel: "historical-via-chart-dividends-TSLA-no-dividends.json" },
    );
    // Enough to check that this doesn't throw.
  });
});
