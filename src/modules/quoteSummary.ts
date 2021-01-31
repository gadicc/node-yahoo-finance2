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

export function transformDate(input:any, format:string) {
  if (format === 'epoch') {
    if (typeof input !== 'number')
      throw new Error("convertDate(input, format), format=epoch but typeof input !== 'number'");
    // TODO, check range? 1604620800
    return new Date(input * 1000);
  }

  if (format === 'dateObj') {
    input.date = new Date(input.raw * 1000);
    return input;
  }

  // 2020-01-01
  if (format === 'dateStr') {
    if (typeof input !== 'string')
      throw new Error("convertDate(input, format), format=dateStr but typeof input !== 'string'");
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}/))
      throw new Error("convertDate(input, format), format=dateStr but typeof input doesn't match 'YYYY-MM-DD'");
    return new Date(input);
  }

  if (format === 'ISODate') {
    // 2021-02-05T00:00:00.000Z
    if (typeof input !== 'string')
      throw new Error("convertDate(input, format), format=ISODate but typeof input !== 'string'");
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}\.\d{3,3}Z/))
      throw new Error("convertDate(input, format), format=ISODate but got input " + input);
    return new Date(input);
  }

  if (format.match(/\|/)) {
    const formats = format.split('|');
    let date;
    let failed = new Array(formats.length);
    for (let format of formats) {
      try {
        date = transformDate(input, format)
        break;
      } catch (error) {
        failed.push({ format, error })
      }
    }
    if (!date) {
      const data = { input, format, failed };
      throw new Error("convertDate(input, format) failed: " + JSON.stringify(data, null, 2));
    }
    return date;
  }

  throw new Error("convertDate(input, format) but unknown format: " + format);
}

export function mutateDates(
  obj: { [key: string]: any },
  mapping: { [key: string]: any }
) {
  for (let key of Object.keys(obj)) {

    if (typeof mapping[key] === 'undefined') {

      // no-op

    } else if (typeof mapping[key] === 'string') {

      obj[key] = transformDate(obj[key], mapping[key]);

    } else if (Array.isArray(mapping[key])) {

      if (typeof mapping[key][0] === 'string') {

        // earningsDate: [ 'epoch' ]
        obj[key] = obj[key].map((n:number) => transformDate(n, mapping[key][0]))

      } else if (typeof mapping[key][0] === 'object') {

        // cashflowStatements: [ { endDate: 'dateObj'} ]
        obj[key].forEach((o:object) => mutateDates(o, mapping[key][0]));

      } else {

        throw new Error("Unknown array type:" + mapping[key][0]);

      }

    } else if (typeof mapping[key] === 'object') {

      mutateDates(obj[key], mapping[key]);

    } else {

      throw new Error("Unknown mapping:" + mapping[key]);

    }
  }
}

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
