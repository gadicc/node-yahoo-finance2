import dotProp = require('dot-prop');

import yahooFinanceFetch = require('../lib/yahooFinanceFetch');
import validate from '../lib/validate';

import { SummaryDetail, SummaryDetailJson } from './quoteSummary/summaryDetail';
import { Price, PriceJson } from './quoteSummary/price';

const QUERY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary';
const QUERY_OPTIONS_SCHEMA_KEY = '#/definitions/QuoteSummaryOptions'
const QUERY_RESULT_SCHEMA_KEY = "#/definitions/QuoteSummaryResultOrig";

const quoteSummary_modules = [
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
  'symbol',
  'topHoldings',
  'upgradeDowngradeHistory',
];

/*
const QUOTESUMMARY_DATEFIELDS = {
  summaryDetail: [ 'exDividendDate' ],
  calendarEvents: [ 'exDividendDate', 'dividendDate' ],
  upgradeDowngradeHistory: [ 'history.epochGradeDate' ],
  price: [ 'preMarketTime', 'postMarketTime', 'regularMarketTime' ],
  defaultKeyStatistics: [
    'lastFiscalYearEnd', 'nextFiscalYearEnd',
    'mostRecentQuarter', 'lastSplitDate'
  ]
};
*/

const DATEFIELDS = [
  'summaryDetail.exDividendDate',
  'price.postMarketTime',
  'price.preMarketTime',
  'price.regularMarketTime',
];

export interface QuoteSummaryResultJson {
  summaryDetail?: SummaryDetailJson;
  price?: PriceJson;
}

export interface QuoteSummaryResult {
  summaryDetail: SummaryDetail;
  price: Price;
}

export interface QuoteSummaryOptions {
  formatted?: boolean;
  modules?: Array<string>;       // TODO actual options
}

const queryOptionsDefaults = {
  formatted: false,
  modules: ['price', 'summaryDetail']
};

export default async function quoteSummary(
  symbol: string,
  queryOptionsOverrides: QuoteSummaryOptions = {},
  fetchOptions?: object
): Promise<QuoteSummaryResult> {
  validate(queryOptionsOverrides, QUERY_OPTIONS_SCHEMA_KEY, 'quoteSummary');

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
  const result = await yahooFinanceFetch(url, queryOptions, fetchOptions);
  const qsResult = result.quoteSummary;

  if (!qsResult)
    throw new Error("Unexpected result: " + JSON.stringify(result));

  const actualResult = qsResult.result[0];

  validate(actualResult, QUERY_RESULT_SCHEMA_KEY);

  for (let key of DATEFIELDS) {
    const value:number|undefined = dotProp.get(actualResult, key);
    if (value)
      dotProp.set(actualResult, key, new Date(value * 1000));
  }

  return actualResult;
}
