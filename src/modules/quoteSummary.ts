import type { QuoteSummaryResult } from "./quoteSummary-iface.ts";

import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

export const quoteSummary_modules = [
  "assetProfile",
  "balanceSheetHistory",
  "balanceSheetHistoryQuarterly",
  "calendarEvents",
  "cashflowStatementHistory",
  "cashflowStatementHistoryQuarterly",
  "defaultKeyStatistics",
  "earnings",
  "earningsHistory",
  "earningsTrend",
  "financialData",
  "fundOwnership",
  "fundPerformance",
  "fundProfile",
  "incomeStatementHistory",
  "incomeStatementHistoryQuarterly",
  "indexTrend",
  "industryTrend",
  "insiderHolders",
  "insiderTransactions",
  "institutionOwnership",
  "majorDirectHolders",
  "majorHoldersBreakdown",
  "netSharePurchaseActivity",
  "price",
  "quoteType",
  "recommendationTrend",
  "secFilings",
  "sectorTrend",
  "summaryDetail",
  "summaryProfile",
  "topHoldings",
  "upgradeDowngradeHistory",
];

export type QuoteSummaryModules =
  | "assetProfile"
  | "balanceSheetHistory"
  | "balanceSheetHistoryQuarterly"
  | "calendarEvents"
  | "cashflowStatementHistory"
  | "cashflowStatementHistoryQuarterly"
  | "defaultKeyStatistics"
  | "earnings"
  | "earningsHistory"
  | "earningsTrend"
  | "financialData"
  | "fundOwnership"
  | "fundPerformance"
  | "fundProfile"
  | "incomeStatementHistory"
  | "incomeStatementHistoryQuarterly"
  | "indexTrend"
  | "industryTrend"
  | "insiderHolders"
  | "insiderTransactions"
  | "institutionOwnership"
  | "majorDirectHolders"
  | "majorHoldersBreakdown"
  | "netSharePurchaseActivity"
  | "price"
  | "quoteType"
  | "recommendationTrend"
  | "secFilings"
  | "sectorTrend"
  | "summaryDetail"
  | "summaryProfile"
  | "topHoldings"
  | "upgradeDowngradeHistory";

export interface QuoteSummaryOptions {
  formatted?: boolean;
  modules?: Array<QuoteSummaryModules> | "all";
}

const queryOptionsDefaults = {
  formatted: false,
  modules: ["price", "summaryDetail"],
};

export default function quoteSummary(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: QuoteSummaryOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<QuoteSummaryResult>;

export default function quoteSummary(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: QuoteSummaryOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<unknown>;

export default function quoteSummary(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: QuoteSummaryOptions,
  moduleOptions?: ModuleOptions,
): Promise<QuoteSummaryResult> {
  return this._moduleExec({
    moduleName: "quoteSummary",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v10/finance/quoteSummary/" + symbol,
      needsCrumb: true,
      schemaKey: "#/definitions/QuoteSummaryOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(options: QuoteSummaryOptions) {
        if (options.modules === "all") {
          options.modules = quoteSummary_modules as Array<QuoteSummaryModules>;
        }
        return options;
      },
    },

    result: {
      schemaKey: "#/definitions/QuoteSummaryResult",
      // deno-lint-ignore no-explicit-any
      transformWith(result: any) {
        if (!result.quoteSummary) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }

        return result.quoteSummary.result[0];
      },
    },

    moduleOptions,
  });
}
