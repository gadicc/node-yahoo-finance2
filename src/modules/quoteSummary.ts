import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { Static, Type } from "@sinclair/typebox";
import { QuoteSummaryResult } from "./quoteSummary-iface.js";

const QuoteSummaryModules = Type.Union([
  Type.Literal("assetProfile"),
  Type.Literal("balanceSheetHistory"),
  Type.Literal("balanceSheetHistoryQuarterly"),
  Type.Literal("calendarEvents"),
  Type.Literal("cashflowStatementHistory"),
  Type.Literal("cashflowStatementHistoryQuarterly"),
  Type.Literal("defaultKeyStatistics"),
  Type.Literal("earnings"),
  Type.Literal("earningsHistory"),
  Type.Literal("earningsTrend"),
  Type.Literal("financialData"),
  Type.Literal("fundOwnership"),
  Type.Literal("fundPerformance"),
  Type.Literal("fundProfile"),
  Type.Literal("incomeStatementHistory"),
  Type.Literal("incomeStatementHistoryQuarterly"),
  Type.Literal("indexTrend"),
  Type.Literal("industryTrend"),
  Type.Literal("insiderHolders"),
  Type.Literal("insiderTransactions"),
  Type.Literal("institutionOwnership"),
  Type.Literal("majorDirectHolders"),
  Type.Literal("majorHoldersBreakdown"),
  Type.Literal("netSharePurchaseActivity"),
  Type.Literal("price"),
  Type.Literal("quoteType"),
  Type.Literal("recommendationTrend"),
  Type.Literal("secFilings"),
  Type.Literal("sectorTrend"),
  Type.Literal("summaryDetail"),
  Type.Literal("summaryProfile"),
  Type.Literal("topHoldings"),
  Type.Literal("upgradeDowngradeHistory"),
]);

type QuoteSummaryModulesLiteral = Static<typeof QuoteSummaryModules>;

const quoteSummaryModules = [
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

type QuoteSummaryOptions = Static<typeof QuoteSummaryOptions>;
type QuoteSummaryResult = Static<typeof QuoteSummaryResult>;

const QuoteSummaryOptions = Type.Object({
  formatted: Type.Optional(Type.Boolean()),
  modules: Type.Optional(
    Type.Union([Type.Array(QuoteSummaryModules), Type.Literal("all")]),
  ),
});

const queryOptionsDefaults: QuoteSummaryOptions = {
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
): Promise<any>;

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
      schema: QuoteSummaryOptions,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(options: unknown) {
        if (
          typeof options === "object" &&
          options != null &&
          "modules" in options &&
          options.modules === "all"
        )
          options.modules =
            quoteSummaryModules as Array<QuoteSummaryModulesLiteral>;
        return options;
      },
    },

    result: {
      schema: QuoteSummaryResult,
      transformWith(result: any) {
        if (!result.quoteSummary)
          throw new Error("Unexpected result: " + JSON.stringify(result));

        return result.quoteSummary.result[0];
      },
    },

    moduleOptions,
  });
}
