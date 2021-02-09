import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from '../lib/moduleCommon';

import type { DateInMs, TwoNumberRange } from '../lib/commonTypes';

export type Quote = QuoteEquity | QuoteEtf | QuoteMutualfund;
export type QuoteResponse = Quote[];

export interface QuoteBase {
  language: string;                      // "en-US",
  region: string;                        // "US",
  quoteType: string;                     // "EQUITY" | "ETF" | "MUTUALFUND";
  quoteSourceName: string;               // "Delayed Quote",
  triggerable: boolean;                  // true,
  currency: string;                      // "USD",
  marketState: "CLOSED" | "PREPRE";
  tradeable: boolean;                    // false,
  exchange: string;                      // "NMS",
  shortName: string;                     // "NVIDIA Corporation",
  longName: string;                      // "NVIDIA Corporation",
  messageBoardId?: string;               // "finmb_32307",
  exchangeTimezoneName: string;          // "America/New_York",
  exchangeTimezoneShortName: string;     // "EST",
  gmtOffSetMilliseconds: number;         // -18000000,
  market: string;                        // "us_market",
  esgPopulated: boolean;                 // false,
  fiftyTwoWeekLowChange: number;         // 362.96002,
  fiftyTwoWeekLowChangePercent: number;  // 2.0088556,
  fiftyTwoWeekRange: TwoNumberRange;     // "180.68 - 589.07" -> { low, high }
  fiftyTwoWeekHighChange: number;        // -45.429993,
  fiftyTwoWeekHighChangePercent: number; // -0.07712155,
  fiftyTwoWeekLow: number;               // 180.68,
  fiftyTwoWeekHigh: number;              // 589.07,
  dividendDate?: Date;                   // 1609200000,
  // maybe always present on EQUITY?
  earningsTimestamp?: Date;              // 1614200400,
  earningsTimestampStart?: Date;         // 1614200400,
  earningsTimestampEnd?: Date;           // 1614200400,
  trailingAnnualDividendRate?: number;   // 0.64,
  trailingPE?: number;                   // 88.873634,
  trailingAnnualDividendYield?: number;  // 0.0011709387,
  epsTrailingTwelveMonths?: number;      // 6.117,
  epsForward?: number;                   // 11.68,
  epsCurrentYear?: number;               // 9.72,
  priceEpsCurrentYear?: number;          // 55.930042,
  sharesOutstanding?: number;            // 619000000,
  bookValue?: number;                    // 24.772,
  fiftyDayAverage: number;               // 530.8828,
  fiftyDayAverageChange: number;         // 12.757202,
  fiftyDayAverageChangePercent: number;  // 0.024030166,
  twoHundredDayAverage: number;          // 515.8518,
  twoHundredDayAverageChange: number;    // 27.788208,
  twoHundredDayAverageChangePercent: number; // 0.053868588,
  marketCap?: number;                    // 336513171456,
  forwardPE?: number;                    // 46.54452,
  priceToBook?: number;                  // 21.945745,
  sourceInterval: number;                // 15,
  exchangeDataDelayedBy: number;         // 0,
  firstTradeDateMilliseconds: DateInMs;  // 917015400000 -> Date
  priceHint: number;                     // 2,
  postMarketChangePercent?: number;      // 0.093813874,
  postMarketTime?: Date;                 // 1612573179,
  postMarketPrice?: number;              // 544.15,
  postMarketChange?: number;             // 0.51000977,
  regularMarketChange?: number;          // -2.9299927,
  regularMarketChangePercent?: number;   // -0.53606904,
  regularMarketTime?: number;            // 1612558802,
  regularMarketPrice?: number;           // 543.64,
  regularMarketDayHigh?: number;         // 549.19,
  regularMarketDayRange?: TwoNumberRange;// "541.867 - 549.19" -> { low, high }
  regularMarketDayLow?: number;          // 541.867,
  regularMarketVolume?: number;          // 4228841,
  regularMarketPreviousClose?: number;   // 546.57,
  bid?: number;                          // 543.84,
  ask?: number;                          // 544.15,
  bidSize?: number;                      // 18,
  askSize?: number;                      // 8,
  fullExchangeName: string;              // "NasdaqGS",
  financialCurrency?: string;            // "USD",
  regularMarketOpen?: number;            // 549.0,
  averageDailyVolume3Month: number;      // 7475022,
  averageDailyVolume10Day: number;       // 5546385,
  displayName?: string;                  // "NVIDIA",
  symbol: string;                        // "NVDA"
  // only on ETF?  not on EQUITY?
  ytdReturn?: number;                    // 0.31
  trailingThreeMonthReturns?: number;    // 16.98
  trailingThreeMonthNavReturns?: number; // 17.08
}

export interface QuoteEquity extends QuoteBase {
  quoteType: "EQUITY";
}

export interface QuoteEtf extends QuoteBase {
  quoteType: "ETF";
}

export interface QuoteMutualfund extends QuoteBase {
  quoteType: "MUTUALFUND";
}

export interface QuoteOptions {
}

const queryOptionsDefaults = {
};

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponse>;

export default function quote(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function quote(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<Quote>;

export default function quote(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  const symbols = typeof query === 'string' ? query : query.join(',');

  return this._moduleExec({
    moduleName: "quote",

    query: {
      url: "https://query2.finance.yahoo.com/v7/finance/quote",
      schemaKey: "#/definitions/QuoteOptions",
      defaults: queryOptionsDefaults,
      runtime: { symbols },
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/QuoteResponse",
      transformWith(result: any) {
        if (!result.quoteResponse)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.quoteResponse.result;
      }
    },

    moduleOptions,
  }).then((results: Quote[]) => {
    return typeof query === 'string' ? results[0] as Quote : results as Quote[];
  });
}
