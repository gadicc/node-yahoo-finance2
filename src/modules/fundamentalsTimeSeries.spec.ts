import fundamentalsTimeSeries from "./fundamentalsTimeSeries.js";
import testSymbols from "../../tests/testSymbols.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import testYf from "../../tests/testYf.js";
import { processResponse } from "./fundamentalsTimeSeries.js";

const yf = testYf({ fundamentalsTimeSeries });

describe("fundamentalsTimeSeries", () => {
  const symbols = testSymbols();

  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.fundamentalsTimeSeries(
      symbol,
      {
        period1: "2020-01-01",
        period2: "2024-01-01",
      },
      {
        devel: `fundamentalsTimeSeries-${symbol}-2020-01-01-to-2021-01-01.json`,
      }
    );
  });

  it("throws if period1,period2 are the same", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2020-01-01",
      })
    ).rejects.toThrow(/cannot share the same value/);
  });

  it("throws if period{1,2} gets an invalid string for new Date()", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "invalid",
        period2: "2021-01-01",
      })
    ).rejects.toThrow(/invalid date provided/);

    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-011",
        period2: "invalid",
      })
    ).rejects.toThrow(/invalid date provided/);
  });

  it("throws if invalid type", async () => {
    await expect(
      yf.fundamentalsTimeSeries("TSLA", {
        period1: "2020-01-01",
        period2: "2021-01-01",
        type: "invalid",
      })
    ).rejects.toThrow(/option type invalid/);
  });

  it("throws error with unexpected results", () => {
    return expect(
      yf.fundamentalsTimeSeries(
        "EURGBP=X",
        { period1: 1567728000, period2: 1570665600 },
        { devel: "fundamentalsTimeSeries-EURGBP-unexpected-results.fake.json" }
      )
    ).rejects.toThrow(/Unexpected result/);
  });

  it("has valid output", async () => {
    const cachedFile = path.join(
      __dirname,
      "../../tests/http/fundamentalsTimeSeries-AMZN-2020-01-01-to-2021-01-01.json"
    );
    const request = JSON.parse(await fs.readFileSync(cachedFile, "utf-8"));
    const response = JSON.parse(request.response.body);

    const processed = processResponse(response);
    expect(processed.length).toBeGreaterThan(0);
  });
});
