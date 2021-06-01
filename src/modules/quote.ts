import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

import type { DateInMs, TwoNumberRange } from "../lib/commonTypes.js";

export interface QuoteBase {
  language: string; // "en-US",
  region: string; // "US",
  quoteType: string; // "EQUITY" | "ETF" | "MUTUALFUND";
  quoteSourceName?: string; // "Delayed Quote",
  triggerable: boolean; // true,
  currency?: string; // "USD",
  marketState: "REGULAR" | "CLOSED" | "PRE" | "PREPRE" | "POST" | "POSTPOST";
  tradeable: boolean; // false,
  exchange: string; // "NMS",
  shortName?: string; // "NVIDIA Corporation",
  longName?: string; // "NVIDIA Corporation",
  messageBoardId?: string; // "finmb_32307",
  exchangeTimezoneName: string; // "America/New_York",
  exchangeTimezoneShortName: string; // "EST",
  gmtOffSetMilliseconds: number; // -18000000,
  market: string; // "us_market",
  esgPopulated: boolean; // false,
  fiftyTwoWeekLowChange?: number; // 362.96002,
  fiftyTwoWeekLowChangePercent?: number; // 2.0088556,
  fiftyTwoWeekRange?: TwoNumberRange; // "180.68 - 589.07" -> { low, high }
  fiftyTwoWeekHighChange?: number; // -45.429993,
  fiftyTwoWeekHighChangePercent?: number; // -0.07712155,
  fiftyTwoWeekLow?: number; // 180.68,
  fiftyTwoWeekHigh?: number; // 589.07,
  dividendDate?: Date; // 1609200000,
  // maybe always present on EQUITY?
  earningsTimestamp?: Date; // 1614200400,
  earningsTimestampStart?: Date; // 1614200400,
  earningsTimestampEnd?: Date; // 1614200400,
  trailingAnnualDividendRate?: number; // 0.64,
  trailingPE?: number; // 88.873634,
  trailingAnnualDividendYield?: number; // 0.0011709387,
  epsTrailingTwelveMonths?: number; // 6.117,
  epsForward?: number; // 11.68,
  epsCurrentYear?: number; // 9.72,
  priceEpsCurrentYear?: number; // 55.930042,
  sharesOutstanding?: number; // 619000000,
  bookValue?: number; // 24.772,
  fiftyDayAverage?: number; // 530.8828,
  fiftyDayAverageChange?: number; // 12.757202,
  fiftyDayAverageChangePercent?: number; // 0.024030166,
  twoHundredDayAverage?: number; // 515.8518,
  twoHundredDayAverageChange?: number; // 27.788208,
  twoHundredDayAverageChangePercent?: number; // 0.053868588,
  marketCap?: number; // 336513171456,
  forwardPE?: number; // 46.54452,
  priceToBook?: number; // 21.945745,
  sourceInterval: number; // 15,
  exchangeDataDelayedBy: number; // 0,
  firstTradeDateMilliseconds?: DateInMs; // 917015400000 -> Date
  priceHint: number; // 2,
  postMarketChangePercent?: number; // 0.093813874,
  postMarketTime?: Date; // 1612573179 -> new Date()
  postMarketPrice?: number; // 544.15,
  postMarketChange?: number; // 0.51000977,
  regularMarketChange?: number; // -2.9299927,
  regularMarketChangePercent?: number; // -0.53606904,
  regularMarketTime?: Date; // 1612558802 -> new Date()
  regularMarketPrice?: number; // 543.64,
  regularMarketDayHigh?: number; // 549.19,
  regularMarketDayRange?: TwoNumberRange; // "541.867 - 549.19" -> { low, high }
  regularMarketDayLow?: number; // 541.867,
  regularMarketVolume?: number; // 4228841,
  regularMarketPreviousClose?: number; // 546.57,
  preMarketChange?: number; // -2.9299927,
  preMarketChangePercent?: number; // -0.53606904,
  preMarketTime?: Date; // 1612558802 -> new Date()
  preMarketPrice?: number; // 543.64,
  bid?: number; // 543.84,
  ask?: number; // 544.15,
  bidSize?: number; // 18,
  askSize?: number; // 8,
  fullExchangeName: string; // "NasdaqGS",
  financialCurrency?: string; // "USD",
  regularMarketOpen?: number; // 549.0,
  averageDailyVolume3Month?: number; // 7475022,
  averageDailyVolume10Day?: number; // 5546385,
  displayName?: string; // "NVIDIA",
  symbol: string; // "NVDA"
  // only on ETF?  not on EQUITY?
  ytdReturn?: number; // 0.31
  trailingThreeMonthReturns?: number; // 16.98
  trailingThreeMonthNavReturns?: number; // 17.08
  ipoExpectedDate?: Date; // "2020-08-13",
  newListingDate?: Date; // "2021-02-16",
  nameChangeDate?: Date;
  prevName?: string;
  averageAnalystRating?: string;
}

/*
 * [TODO] Fields seen in a query but not in this module yet:
 *
 *   - extendedMarketChange
 *   - extendedMarketChangePercent
 *   - extendedMarketPrice
 *   - extendedMarketTime
 *   - dayHigh (separate to regularMarketDayHigh, etc)
 *   - dayLow (separate to regularMarketDayLow, etc)
 *   - volume (separaet to regularMarketVolume, etc)
 *
 * i.e. on yahoo site, with ?fields=dayHigh,dayLow,etc.
 */

/*
 * Guaranteed fields, even we don't ask for them
 */

export interface QuoteEquity extends QuoteBase {
  quoteType: "EQUITY";
}

export interface QuoteEtf extends QuoteBase {
  quoteType: "ETF";
}

export interface QuoteMutualfund extends QuoteBase {
  quoteType: "MUTUALFUND";
}

export interface QuoteCurrency extends QuoteBase {
  quoteType: "CURRENCY";
}

export interface QuoteCryptoCurrency extends QuoteBase {
  quoteType: "CRYPTOCURRENCY";
  circulatingSupply: number;
  fromCurrency: string; // 'BTC'
  toCurrency: string; // 'USD=X'
  lastMarket: string; // 'CoinMarketCap'
  coinImageUrl: string; // 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1.png'
  volume24Hr: number; // 62631043072
  volumeAllCurrencies: number; // 62631043072
  startDate: Date; // new Date(1367103600 * 1000)
}

export type Quote =
  | QuoteCryptoCurrency
  | QuoteCurrency
  | QuoteEtf
  | QuoteEquity
  | QuoteMutualfund;

export type QuoteField = keyof Quote;

export type ResultType = "array" | "object" | "map";

export type QuoteResponseArray = Quote[];
export type QuoteResponseMap = Map<string, Quote>;
export type QuoteResponseObject = { [key: string]: Quote };

export interface QuoteOptions {
  fields?: QuoteField[];
  return?: ResultType;
}

export interface QuoteOptionsReturnArray extends QuoteOptions {
  return?: "array";
}
export interface QuoteOptionsReturnMap extends QuoteOptions {
  return: "map";
}
export interface QuoteOptionsReturnObject extends QuoteOptions {
  return: "object";
}

const queryOptionsDefaults = {};

/* --- array input, typed output, honor "return" param --- */

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsReturnArray,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponseArray>;

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsReturnMap,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponseMap>;

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsReturnObject,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponseObject>;

/* --- everything else --- */

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
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function quote(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  const symbols = typeof query === "string" ? query : query.join(",");
  const returnAs = queryOptionsOverrides && queryOptionsOverrides.return;

  return this._moduleExec({
    moduleName: "quote",

    query: {
      url: "https://query2.finance.yahoo.com/v7/finance/quote",
      schemaKey: "#/definitions/QuoteOptions",
      defaults: queryOptionsDefaults,
      runtime: { symbols },
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: QuoteOptions) {
        // Options validation ensures this is a string[]
        if (queryOptions.fields) queryOptions.fields.join(",");

        // Don't pass this on to Yahoo
        delete queryOptions.return;

        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/QuoteResponseArray",
      transformWith(result: any) {
        if (!result.quoteResponse)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.quoteResponse.result;
      },
    },

    moduleOptions,
  }).then((results: Quote[]) => {
    if (returnAs) {
      switch (returnAs) {
        case "array":
          return results as Quote[];
        case "object":
          const object = {} as any;
          for (let result of results) object[result.symbol] = result;
          return object; // TODO: type
        case "map":
          const map = new Map();
          for (let result of results) map.set(result.symbol, result);
          return map; // TODO: type
      }
    } else {
      // By default, match the query input shape (string or string[]).
      return typeof query === "string"
        ? (results[0] as Quote)
        : (results as Quote[]);
    }
  });
}
