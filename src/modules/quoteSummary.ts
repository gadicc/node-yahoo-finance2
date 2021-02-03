import validateAndCoerceTypes from '../lib/validateAndCoerceTypes';

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

export default async function quoteSummary(
  this: { [key:string]: any, _fetch: Function },
  symbol: string,
  queryOptionsOverrides: QuoteSummaryOptions = {},
  fetchOptions?: object
): Promise<QuoteSummaryResult> {
  validateAndCoerceTypes(queryOptionsOverrides, QUERY_OPTIONS_SCHEMA_KEY, 'quoteSummary');

  if (queryOptionsOverrides.modules === 'all')
    queryOptionsOverrides.modules = quoteSummary_modules as Array<QuoteSummaryModules>;

  const queryOptions = {
    ...queryOptionsDefaults,
    ...queryOptionsOverrides
  };

  const url = QUERY_URL + '/' + symbol;

  /*
    {
      quoteSummary: {
        result: [
          {
            summaryDetail: {},
            ...
          }
        ],
        error: null
      }
    }
   */
  const result = await this._fetch(url, queryOptions, fetchOptions);
  const qsResult = result.quoteSummary;

  if (!qsResult)
    throw new Error("Unexpected result: " + JSON.stringify(result));

  const actualResult = qsResult.result[0];
  validateAndCoerceTypes(actualResult, QUERY_RESULT_SCHEMA_KEY);

  return actualResult;
}
