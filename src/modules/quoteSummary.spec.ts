import quoteSummary, { QuoteSummaryModules } from "./quoteSummary.js";
import { InvalidOptionsError } from "../lib/errors.js";

import testSymbols from "../../tests/testSymbols.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ quoteSummary });

interface itValidatesOpts {
  skip?: Array<string>;
}

function itValidates(
  name: QuoteSummaryModules | "all",
  opts: itValidatesOpts = {}
) {
  let symbols = testSymbols({
    add: [
      // incomeStatementHistory/sellingGeneralAdministrative is null (#258)
      // "Got {}->null for 'number', did you want 'number | null' ?"
      "CMCOM.AS",
      "CRM",
      "ADA-USD", // has summaryProfile.twitter (#418),
      "EREGL.IS", // null in incomeStatementHistory/operatingIncome, in some .IS (#517)
      "THYAO.IS", // (#517)
      "HISU-U.TO", // topHoldings: missing StockPosition, bondPosition (#639)
      "EURN", // secFilings: missing some filing types (#664)
      "ARMK", // secFilings: missing some filing types (#664)
    ],
  });

  if (opts.skip)
    // @ts-ignore
    symbols = symbols.filter((s) => !opts.skip.includes(s));

  const modules = name === "all" ? "all" : [name];
  it.each(symbols)("validates %s", async (symbol) => {
    const devel = `quoteSummary-${name}-${symbol}.json`;
    try {
      await yf.quoteSummary(symbol, { modules }, { devel });
    } catch (error) {
      if (
        // TypeScript 4.4.4 assumes errors are `unknown`, need to type guard.
        error instanceof Error &&
        error.message.match(/^No fundamentals data found/)
      )
        return;
      throw error;
    }
  });
}

describe("quoteSummary", () => {
  describe("quoteSummary", () => {
    // See also common module tests in moduleExec.spec.js

    if (process.env.FETCH_DEVEL !== "nocache")
      it("throws on invalid result", async () => {
        await expect(
          yf.quoteSummary("AAPL", {}, { devel: "weirdJsonResult.fake.json" })
        ).rejects.toThrow(/Unexpected result/);
      });
  });

  describe("modules", () => {
    describe("assetProfile", () => {
      itValidates("assetProfile");
    });

    describe("balanceSheetHistory", () => {
      itValidates("balanceSheetHistory");
    });

    describe("balanceSheetHistoryQuarterly", () => {
      itValidates("balanceSheetHistoryQuarterly");
    });

    describe("calendarEvents", () => {
      itValidates("calendarEvents");
    });

    describe("cashflowStatementHistory", () => {
      itValidates("cashflowStatementHistory");
    });

    describe("cashflowStatementHistoryQuarterly", () => {
      itValidates("cashflowStatementHistoryQuarterly");
    });

    describe("defaultKeyStatistics", () => {
      itValidates("defaultKeyStatistics");
    });

    describe("earnings", () => {
      itValidates("earnings");
    });

    describe("earningsHistory", () => {
      itValidates("earningsHistory");
    });

    describe("earningsTrend", () => {
      itValidates("earningsTrend");
    });

    describe("financialData", () => {
      itValidates("financialData");
    });

    describe("fundOwnership", () => {
      itValidates("fundOwnership");
    });

    describe("incomeStatementHistory", () => {
      itValidates("incomeStatementHistory");
    });

    describe("incomeStatementHistoryQuarterly", () => {
      itValidates("incomeStatementHistoryQuarterly");
    });

    describe("indexTrend", () => {
      itValidates("indexTrend");
    });

    describe("industryTrend", () => {
      itValidates("industryTrend");
    });

    describe("insiderHolders", () => {
      itValidates("insiderHolders");
    });

    describe("insiderTransactions", () => {
      itValidates("insiderTransactions");
    });

    describe("institutionOwnership", () => {
      itValidates("institutionOwnership");
    });

    describe("majorDirectHolders", () => {
      itValidates("majorDirectHolders");
    });

    describe("majorHoldersBreakdown", () => {
      itValidates("majorHoldersBreakdown");
    });

    describe("netSharePurchaseActivity", () => {
      itValidates("netSharePurchaseActivity");
    });

    describe("price", () => {
      itValidates("price");
    });

    describe("quoteType", () => {
      itValidates("quoteType");
    });

    describe("recommendationTrend", () => {
      itValidates("recommendationTrend");
    });

    describe("secFilings", () => {
      itValidates("secFilings");

      it("handles AAPL's secFilings", async () => {
        await yf.quoteSummary(
          "AAPL",
          {
            modules: ["secFilings"],
          },
          { devel: "quoteSummary-secFilings-AAPL-new.json" }
        );
      });
    });

    describe("summaryDetail", () => {
      itValidates("summaryDetail");
    });

    describe("summaryProfile", () => {
      itValidates("summaryProfile");
    });

    describe("upgradeDowngradeHistory", () => {
      itValidates("upgradeDowngradeHistory");
    });
  }); /* modules */

  describe("all modules at once", () => {
    // Some modules change the output format of other modules!
    // @ts-ignore
    itValidates("all");
  });

  // Output can differ depending on the combination of modules.
  describe("other combinations", () => {
    it("handles BMW.DE module combinations", async () => {
      await yf.quoteSummary(
        "BMW.DE",
        {
          modules: [
            "price",
            "assetProfile",
            "incomeStatementHistory",
            "incomeStatementHistoryQuarterly",
            "balanceSheetHistory",
            "balanceSheetHistoryQuarterly",
            "cashflowStatementHistory",
            "cashflowStatementHistoryQuarterly",
            "quoteType",
            "financialData",
            "defaultKeyStatistics",
            "earnings",
            "earningsHistory",
            "earningsTrend",
            "calendarEvents",
            "summaryDetail",
            "summaryProfile",
          ],
        },
        { devel: "quoteSummary-other-BMW.DE.json" }
      );
    });
  });
});
