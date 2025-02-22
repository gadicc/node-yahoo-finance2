import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  setupCache,
  testSymbols,
} from "../../tests/common.ts";
import { consoleRestore, consoleSilent } from "../../tests/console.js";

import fundamentalsTimeSeries from "./fundamentalsTimeSeries.ts";

const YahooFinance = createTestYahooFinance({
  modules: { fundamentalsTimeSeries },
});
const yf = new YahooFinance();

describe("fundamentalsTimeSeries", () => {
  setupCache();

  const symbols = testSymbols();

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.fundamentalsTimeSeries(
      symbol,
      {
        period1: "2024-01-01",
        period2: "2025-01-01",
        module: "financials",
      },
      {
        devel: `fundamentalsTimeSeries-${symbol}-financials-quarterly.json`,
      },
    );
    // console.log(`${symbol} fetched ${res.length} reports.`);
  });

  it("passes validation with module all & quarterly", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "quarterly",
        period1: "2024-01-01",
        period2: "2025-01-01",
        module: "all",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-all-quarterly.json`,
      },
    );
    expect(res).toHaveLength(4);
  });

  it("passes validation with module financials & quarterly", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "quarterly",
        period1: "2024-01-01",
        period2: "2025-01-01",
        module: "financials",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-financials-quarterly.json`,
      },
    );
    expect(res).toHaveLength(4);
    expect(res[0]).toHaveProperty("totalRevenue");
  });

  it("passes validation with module balance-sheet & quarterly", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "quarterly",
        period1: "2024-01-01",
        period2: "2025-01-01",
        module: "balance-sheet",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-balance-sheet-quarterly.json`,
      },
    );
    expect(res).toHaveLength(4);
    expect(res[0]).toHaveProperty("netDebt");
  });

  it("passes validation with module cash-flow & quarterly", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "quarterly",
        period1: "2024-01-01",
        period2: "2025-01-01",
        module: "cash-flow",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-cash-flow-quarterly.json`,
      },
    );
    expect(res).toHaveLength(4);
    expect(res[0]).toHaveProperty("freeCashFlow");
  });

  it("passes validation with module all & annual", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "annual",
        period1: "2022-01-01",
        period2: "2025-01-01",
        module: "all",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-all-annual.json`,
      },
    );
    expect(res).toHaveLength(3);
  });

  it("passes validation with module financials & annual", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "annual",
        period1: "2022-01-01",
        period2: "2025-01-01",
        module: "financials",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-financials-annual.json`,
      },
    );
    expect(res).toHaveLength(3);
    expect(res[0]).toHaveProperty("totalRevenue");
  });

  it("passes validation with module balance-sheet & annual", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "annual",
        period1: "2022-01-01",
        period2: "2025-01-01",
        module: "balance-sheet",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-balance-sheet-annual.json`,
      },
    );
    expect(res).toHaveLength(3);
    expect(res[0]).toHaveProperty("netDebt");
  });

  it("passes validation with module cash-flow & annual", async () => {
    const res = await yf.fundamentalsTimeSeries(
      "AAPL",
      {
        type: "annual",
        period1: "2022-01-01",
        period2: "2025-01-01",
        module: "cash-flow",
      },
      {
        devel: `fundamentalsTimeSeries-AAPL-cash-flow-annual.json`,
      },
    );
    expect(res).toHaveLength(3);
    expect(res[0]).toHaveProperty("freeCashFlow");
  });

  it("throws if period1,period2 are the same", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2020-01-01",
        module: "financials",
      }),
    ).rejects.toThrow(/cannot share the same value/);
  });

  it("throws if period{1,2} gets an invalid string for new Date()", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "invalid",
        period2: "2021-01-01",
        module: "financials",
      }),
    ).rejects.toThrow(/invalid date provided/);

    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-011",
        period2: "invalid",
        module: "financials",
      }),
    ).rejects.toThrow(/invalid date provided/);
  });

  it("throws if invalid type", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2021-01-01",
        type: "invalid",
        module: "financials",
      }),
    ).rejects.toThrow(/option type invalid/);
  });

  it("throws if invalid module", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2021-01-01",
        module: "invalid",
      }),
    ).rejects.toThrow(/option module invalid/);
  });

  it("throws if module not set", async () => {
    consoleSilent();
    await expect(
      // @ts-expect-error: intentional invalid options check
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2021-01-01",
      }),
    ).rejects.toThrow(/called with invalid options/);
    consoleRestore();
  });

  /* XXX TODO
  it("throws error with unexpected results", () => {
    return expect(
      yf.fundamentalsTimeSeries(
        "EURGBP=X",
        { period1: 1567728000, period2: 1570665600, module: "financials" },
        { devel: "fundamentalsTimeSeries-EURGBP-unexpected-results.fake.json" },
      ),
    ).rejects.toThrow(/Unexpected result/);
  });
  */
});
