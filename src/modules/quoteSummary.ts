import yahooFinanceFetch = require('../lib/yahooFinanceFetch');
import validate from '../lib/validate';

const QUERY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';
const QUERY_SCHEMA_KEY = "#/definitions/QuoteSummaryResultOrig";

const QUOTESUMMARY_MODULES = [
  'summaryProfile', 'financialData', 'recommendationTrend',
  'upgradeDowngradeHistory', 'earnings', 'price', 'summaryDetail',
  'defaultKeyStatistics', 'calendarEvents'
];

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

export interface QuoteSummaryOptions {
  formatted?: boolean;
  modules?: Array<string>;       // TODO actual options
}

const queryOptionsDefaults = {
  formatted: false,
  modules: ['price', 'summaryDetail']
};

export default async function quoteSummary(
  query: string,
  queryOptionsOverrides: QuoteSummaryOptions = {},
  fetchOptions?: object
): Promise<any> {
  const queryOptions = {
    q: query,
    ...queryOptionsDefaults,
    ...queryOptionsOverrides
  };

  const result = await yahooFinanceFetch(QUERY_URL, queryOptions, fetchOptions);
  //validate(result, QUERY_SCHEMA_KEY);

  return result;
}
