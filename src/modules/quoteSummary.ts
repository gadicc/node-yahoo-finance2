import dotProp = require('dot-prop');

import yahooFinanceFetch = require('../lib/yahooFinanceFetch');
import validate from '../lib/validate';

const QUERY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary';
const QUERY_OPTIONS_SCHEMA_KEY = '#/definitions/QuoteSummaryOptions'
const QUERY_RESULT_SCHEMA_KEY = "#/definitions/QuoteSummaryResultOrig";

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

const DATEFIELDS = [
  'summaryDetail.exDividendDate',
  'price.postMarketTime',
  'price.preMarketTime',
  'price.regularMarketTime',
];

export interface SummaryDetailOrig {
  maxAge: number;                       // 1,
  priceHint: number;                    // 2,
  previousClose: number;                // 142.06,
  open: number;                         // 139.52,
  dayLow: number;                       // 136.7,
  dayHigh: number;                      // 141.99,
  regularMarketPreviousClose: number;   // 142.06,
  regularMarketOpen: number;            // 139.52,
  regularMarketDayLow: number;          // 136.7,
  regularMarketDayHigh: number;         // 141.99,
  dividendRate: number;                 // 0.82,
  dividendYield: number;                // 0.0058,
  exDividendDate: number;               // 1604620800,
  payoutRatio: number;                  // 0.24239999,
  fiveYearAvgDividendYield: number;     // 1.46,
  trailingPE: number;                   // 37.181988,
  forwardPE: number;                    // 29.802174,
  volume: number;                       // 142621028,
  regularMarketVolume: number;          // 142621028,
  averageVolume: number;                // 110435154,
  averageVolume10days: number;          // 118130257,
  averageDailyVolume10Day: number;      // 118130257,
  bid: number;                          // 0,
  ask: number;                          // 0,
  bidSize: number;                      // 900,
  askSize: number;                      // 1000,
  marketCap: number;                    // 2306306211840,
  fiftyTwoWeekLow: number;              // 53.1525,
  fiftyTwoWeekHigh: number;             // 145.09,
  priceToSalesTrailing12Months: number; // 7.840978,
  fiftyDayAverage: number;              // 130.90666,
  twoHundredDayAverage: number;         // 118.00237,
  trailingAnnualDividendRate: number;   // 0.603,
  trailingAnnualDividendYield: number;  // 0.004244685,
  currency: string;                     // 'USD',
  fromCurrency: any;                    // null,
  toCurrency: any;                      // null,
  lastMarket: any;                      // null,
  algorithm: any;                       // null,
  tradeable: boolean;                   // false
}

export interface SummaryDetail extends Omit<SummaryDetailOrig,'exDividendDate'> {
  exDividendDate: Date;                 // Date(1611286342 * 1000)
}

export interface PriceOrig {
  maxAge: number;                       // 1,
  preMarketSource: string;              // 'FREE_REALTIME',   TODO | allvalues
  postMarketChangePercent: number;      // -0.0033553976,
  postMarketChange: number;             // -0.45999146,
  postMarketTime: number;               // 1611881999,
  postMarketPrice: number;              // 136.63,
  postMarketSource: string;             // 'DELAYED',
  regularMarketChangePercent: number;   // -0.034985226,
  regularMarketChange: number;          // -4.970001,
  regularMarketTime: number;            // 1611867601,
  priceHint: number;                    // 2,
  regularMarketPrice: number;           // 137.09,
  regularMarketDayHigh: number;         // 141.99,
  regularMarketDayLow: number;          // 136.7,
  regularMarketVolume: number;          // 142621028,
  averageDailyVolume10Day: number;      // 118130257,
  averageDailyVolume3Month: number;     // 110435154,
  regularMarketPreviousClose: number;   // 142.06,
  regularMarketSource: string;          // 'FREE_REALTIME',  TODO | allvalues
  regularMarketOpen: number;            // 139.52,
  exchange: string;                     // 'NMS',
  exchangeName: string;                 // 'NasdaqGS',
  exchangeDataDelayedBy: number;        // 0,
  marketState: string;                  // 'PREPRE',
  quoteType: string;                    // 'EQUITY',
  symbol: string;                       // 'AAPL',
  underlyingSymbol: null | string;      // null,  TODO
  shortName: string;                    // 'Apple Inc.',
  longName: string;                     // 'Apple Inc.',
  currency: string;                     // 'USD',
  quoteSourceName: string;              // 'Delayed Quote',
  currencySymbol: string;               // '$',
  fromCurrency: null | string;          // null,
  toCurrency: null | string;            // null,
  lastMarket: null | string;            // null,
  marketCap: number;                    // 2306306211840
}

export interface Price extends Omit<PriceOrig,'preMarketTime'|'postMarketTime'|'regularMarketTime'> {
  preMarketTime: Date;
  postMarketTime: Date;
  regularMarketTime: Date;
}

export interface QuoteSummaryResultOrig {
  summaryDetail?: SummaryDetailOrig;
  price?: PriceOrig;
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
