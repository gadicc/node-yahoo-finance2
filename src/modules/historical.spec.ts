import { jest } from "@jest/globals";

import historical from "./historical.js";
import testSymbols from "../../tests/testSymbols.js";

import testYf from "../../tests/testYf.js";
import { consoleSilent, consoleRestore } from "../../tests/console.js";

const yf = testYf({ historical });

describe("historical", () => {
  // See also common module tests in moduleExec.spec.js

  const symbols = testSymbols({
    skip: ["BEKE", "BFLY", "SIMP", "^VXAPL", "APS.AX" /* Not Found */],
  });

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.historical(
      symbol,
      {
        period1: "2020-01-01",
        period2: "2020-01-03",
      },
      { devel: `historical-${symbol}-2020-01-01-to-2020-01-03.json` }
    );
  });

  it("throws if period1,period2 are the same", async () => {
    await expect(
      yf.historical("TSLA", { period1: "2022-02-22", period2: "2022-02-22" })
    ).rejects.toThrow(/cannot share the same value/);
  });

  it("throws if period{1,2} gets an invalid string for new Date()", async () => {
    await expect(yf.historical("TSLA", { period1: "invalid" })).rejects.toThrow(
      /invalid date provided/
    );

    await expect(
      yf.historical("TSLA", { period1: "2022-02-022", period2: "invalid" })
    ).rejects.toThrow(/invalid date provided/);
  });

  it("dividends pass validation (#557)", async () => {
    await yf.historical(
      "MSFT",
      {
        period1: "2021-02-01",
        period2: "2022-01-31",
        events: "dividends",
      },
      { devel: "historical-MSFT-dividends-2021-02-01-to-2022-01-31.csv" }
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
      { devel: "historical-NVDA-split-2021-02-01-to-2022-01-31.csv" }
    );
  });

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
    if (process.env.FETCH_DEVEL !== "nocache")
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
            { devel: "historical-EURGBP-nulls.saved.fake.json" }
          );

        await expect(createHistoricalPromise()).resolves.toBeDefined();

        const result = await createHistoricalPromise();

        // Without stripping, it's about 25 rows.
        expect(result.length).toBe(5);

        // No need to really check there are no nulls in the data, as
        // validation handles that for us automatically.
      });

    if (process.env.FETCH_DEVEL !== "nocache")
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

  it("handles events:dividends for stocks with no dividends (#658)", async () => {
    const data = await yf.historical(
      "TSLA", // No dividends at time of writing
      {
        period1: 0,
        period2: "2023-08-12", // time of writing :)
        events: "dividends",
        interval: "1d",
      },
      { devel: "historical-dividends-TSLA-no-dividends.json" }
    );
    // Enough to check that this doesn't throw.
  });
});
