// /// <reference path="quoteSummary-iface.ts"/>
// import QuoteSummaryResult from "QuoteSummaryIfaces";
import { QuoteSummaryResult } from './quoteSummary-iface';

const QUERY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary';
const QUERY_OPTIONS_SCHEMA_KEY = '#/definitions/QuoteSummaryOptions'
const QUERY_RESULT_SCHEMA_KEY = "#/definitions/QuoteSummaryResult";

export const quoteSummary_modules = [
  'assetProfile',
  'balanceSheetHistory',
  'balanceSheetHistoryQuarterly',
  'calendarEvents',
  'cashflowStatementHistory',
  'cashflowStatementHistoryQuarterly',
  'defaultKeyStatistics',
  'earnings',
  'earningsHistory',
  'earningsTrend',
  'financialData',
  'fundOwnership',
  'fundPerformance',
  'fundProfile',
  'incomeStatementHistory',
  'incomeStatementHistoryQuarterly',
  'indexTrend',
  'industryTrend',
  'insiderHolders',
  'insiderTransactions',
  'institutionOwnership',
  'majorDirectHolders',
  'majorHoldersBreakdown',
  'netSharePurchaseActivity',
  'price',
  'quoteType',
  'recommendationTrend',
  'secFilings',
  'sectorTrend',
  'summaryDetail',
  'summaryProfile',
  'topHoldings',
  'upgradeDowngradeHistory',
];

export type QuoteSummaryModules =
  "assetProfile" |
  "balanceSheetHistory" |
  "balanceSheetHistoryQuarterly" |
  "calendarEvents" |
  "cashflowStatementHistory" |
  "cashflowStatementHistoryQuarterly" |
  "defaultKeyStatistics" |
  "earnings" |
  "earningsHistory" |
  "earningsTrend" |
  "financialData" |
  "fundOwnership" |
  "fundPerformance" |
  "fundProfile" |
  "incomeStatementHistory" |
  "incomeStatementHistoryQuarterly" |
  "indexTrend" |
  "industryTrend" |
  "insiderHolders" |
  "insiderTransactions" |
  "institutionOwnership" |
  "majorDirectHolders" |
  "majorHoldersBreakdown" |
  "netSharePurchaseActivity" |
  "price" |
  "quoteType" |
  "recommendationTrend" |
  "secFilings" |
  "sectorTrend" |
  "summaryDetail" |
  "summaryProfile" |
  "topHoldings" |
  "upgradeDowngradeHistory"
;

export interface QuoteSummaryOptions {
  formatted?: boolean;
  modules?: Array<QuoteSummaryModules> | "all";
}

const queryOptionsDefaults = {
  formatted: false,
  modules: ['price', 'summaryDetail']
};

export default function quoteSummary(
  this: { [key:string]: any, _moduleExec: Function },
  symbol: string,
  queryOptionsOverrides: QuoteSummaryOptions = {},
  fetchOptions?: object
): Promise<QuoteSummaryResult> {

  return this._moduleExec({
    moduleName: "search",

    query: {
      url: "https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + symbol,
      schemaKey: "#/definitions/QuoteSummaryOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      fetchOptions,
      transformWith(options: QuoteSummaryOptions) {
        if (options.modules === 'all')
          options.modules = quoteSummary_modules as Array<QuoteSummaryModules>;
        return options;
      }
    },

    result: {
      schemaKey: "#/definitions/QuoteSummaryResult",
      transformWith(result: any) {
        if (!result.quoteSummary)
          throw new Error("Unexpected result: " + JSON.stringify(result));

        return result.quoteSummary.result[0];
      }
    }
  });

}
