import dotProp = require('dot-prop');

import yahooFinanceFetch = require('../lib/yahooFinanceFetch');
import validate from '../lib/validate';

//import { SummaryDetail, SummaryDetailJson } from './quoteSummary/summaryDetail';
//import { Price, PriceJson } from './quoteSummary/price';

// /// <reference path="quoteSummary.d.ts"/>
// import QuoteSummaryResult from "QuoteSummaryIfaces";
import { QuoteSummaryResult } from './quoteSummary.d';

const QUERY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary';
const QUERY_OPTIONS_SCHEMA_KEY = '#/definitions/QuoteSummaryOptions'
const QUERY_RESULT_SCHEMA_KEY = "#/definitions/QuoteSummaryResultJson";

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

type QuoteSummaryModules =
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
  "symbol" |
  "topHoldings" |
  "upgradeDowngradeHistory"
;

export const quoteSummary_dateFields = {
  assetProfile: {
    governanceEpochDate: 'epoch',
    compensationAsOfEpochDate: 'epoch',
  },
  balanceSheetHistory: {
    balanceSheetStatements: [ { endDate: 'dateObj' } ],
    earningsTrend: {
      trend: {
        endDate: 'dateStr' // not dateObj like other endDates!
      }
    }
  },
  balanceSheetHistoryQuarterly: {
    balanceSheetStatements: [ { endDate: 'dateObj' } ]
  },
  calendarEvents: {
    earnings: {
      earningsDate: [ 'epoch' ]
    },
    exDividendDate: 'epoch',  // not ISODate like summaryDetail.exDividendDate
    dividendDate: 'epoch',
  },
  cashflowStatementHistory: {
    cashflowStatements: {
      endDate: 'dateObj',
    }
  },
  cashflowStatementHistoryQuarterly: {
    cashflowStatements: [ { endDate: 'dateObj' } ]
  },
  defaultKeyStatistics: {
    // check these
    sharesShortPreviousMonthDate: 'epoch',
    dateShortInterest: 'epoch',
    lastFiscalYearEnd: 'epoch',
    nextFiscalYearEnd: 'epoch',
    mostRecentQuarter: 'epoch',
    lastSplitDate: 'epoch',
    lastDividendDate: 'epoch',
  },
  earnings: {
    earningsDate: [ 'epoch' ]
  },
  fundOwnership: {
    ownershipList: {
      reportDate: 'dateObj',
    }
  },
  incomeStatementHistory: {
    incomeStatementHistory: {
      endDate: 'dateObj',
    }
  },
  incomeStatementHistoryQuarterly: {
    incomeStatementHistory: [ { endDate: 'dateObj' } ]
  },
  insiderHolders: {
    holders: {
      latestTransDate: 'dateObj',
      positionDirectDate: 'dateObj',
    }
  },
  insiderTransactions: {
    transactions: [ { startDate: 'dateObj' } ]
  },
  institutionOwnership: {
    ownershipList: [ { reportDate: 'dateObj' } ]
  },
  quoteType: {
    firstTradeDateEpochUtc: 'epoch',
  },
  summaryDetail: {
    exDividendDate: 'ISODate'  // not epoch like calendarEvents.exDividendDate
  },
  upgradeDowngradeHistory: {
    history: {
      epochGradeDate: 'epoch',
    }
  },
  price: {
    // these were num??  auto detecgt??  XXX TODO
    postMarketTime: 'epoch|ISODate',
    preMarketTime: 'epoch|ISODate',
    regularMarketTime: 'epoch|ISODate',
  },
  secFilings: {
    // "date": "2021-01-28", "epochDate": 1611831743
    filings: [ 'objWithEpochDate' ]
  },
};

/*
export interface QuoteSummaryResultJson {
  summaryDetail?: SummaryDetailJson;
  price?: PriceJson;
}

export interface QuoteSummaryResult {
  summaryDetail: SummaryDetail;
  price: Price;
}
*/

export interface QuoteSummaryOptions {
  formatted?: boolean;
  modules?: Array<QuoteSummaryModules>;
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

  // allow an 'all' parameter?
  // queryOptions.modules = quoteSummary_modules;

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

  // useful to comment this out when working on new modules
  validate(actualResult, QUERY_RESULT_SCHEMA_KEY);

  return actualResult;
}
