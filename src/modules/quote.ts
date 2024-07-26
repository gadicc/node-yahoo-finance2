import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

import { Static, Type } from "@sinclair/typebox";
import {
  YahooDateInMs,
  YahooFinanceDate,
  YahooNumber,
  YahooTwoNumberRange,
} from "../lib/yahooFinanceTypes.js";

export const QuoteBase = Type.Object(
  {
    language: Type.String(), // "en-US",
    region: Type.String(), // "US",
    quoteType: Type.String(), // "EQUITY" | "ETF" | "MUTUALFUND";
    typeDisp: Type.Optional(Type.String()), // "Equity", not always present.
    quoteSourceName: Type.Optional(Type.String()), // "Delayed Quote",
    triggerable: Type.Boolean(), // true,
    currency: Type.Optional(Type.String()), // "USD",
    // Seems to appear / disappear based not on symbol but network load (#445)
    customPriceAlertConfidence: Type.Optional(Type.String()), // "HIGH" | "LOW"; TODO: anything else?
    marketState: Type.Union([
      Type.Literal("REGULAR"),
      Type.Literal("CLOSED"),
      Type.Literal("PRE"),
      Type.Literal("PREPRE"),
      Type.Literal("POST"),
      Type.Literal("POSTPOST"),
    ]),
    tradeable: Type.Boolean(), // false,
    cryptoTradeable: Type.Optional(Type.Boolean()), // false
    exchange: Type.String(), // "NMS",
    shortName: Type.Optional(Type.String()), // "NVIDIA Corporation",
    longName: Type.Optional(Type.String()), // "NVIDIA Corporation",
    messageBoardId: Type.Optional(Type.String()), // "finmb_32307",
    exchangeTimezoneName: Type.String(), // "America/New_York",
    exchangeTimezoneShortName: Type.String(), // "EST",
    gmtOffSetMilliseconds: YahooNumber, // -18000000,
    market: Type.String(), // "us_market",
    esgPopulated: Type.Boolean(), // false,
    fiftyTwoWeekLowChange: Type.Optional(YahooNumber), // 362.96002,
    fiftyTwoWeekLowChangePercent: Type.Optional(YahooNumber), // 2.0088556,
    fiftyTwoWeekRange: Type.Optional(YahooTwoNumberRange), // "180.68 - 589.07" -> { low, high }
    fiftyTwoWeekHighChange: Type.Optional(YahooNumber), // -45.429993,
    fiftyTwoWeekHighChangePercent: Type.Optional(YahooNumber), // -0.07712155,
    fiftyTwoWeekLow: Type.Optional(YahooNumber), // 180.68,
    fiftyTwoWeekHigh: Type.Optional(YahooNumber), // 589.07,
    fiftyTwoWeekChangePercent: Type.Optional(YahooNumber), // 22.604025
    dividendDate: Type.Optional(YahooFinanceDate), // 1609200000,
    // maybe always present on EQUITY?
    earningsTimestamp: Type.Optional(YahooFinanceDate), // 1614200400,
    earningsTimestampStart: Type.Optional(YahooFinanceDate), // 1614200400,
    earningsTimestampEnd: Type.Optional(YahooFinanceDate), // 1614200400,
    trailingAnnualDividendRate: Type.Optional(YahooNumber), // 0.64,
    trailingPE: Type.Optional(YahooNumber), // 88.873634,
    trailingAnnualDividendYield: Type.Optional(YahooNumber), // 0.0011709387,
    epsTrailingTwelveMonths: Type.Optional(YahooNumber), // 6.117,
    epsForward: Type.Optional(YahooNumber), // 11.68,
    epsCurrentYear: Type.Optional(YahooNumber), // 9.72,
    priceEpsCurrentYear: Type.Optional(YahooNumber), // 55.930042,
    sharesOutstanding: Type.Optional(YahooNumber), // 619000000,
    bookValue: Type.Optional(YahooNumber), // 24.772,
    fiftyDayAverage: Type.Optional(YahooNumber), // 530.8828,
    fiftyDayAverageChange: Type.Optional(YahooNumber), // 12.757202,
    fiftyDayAverageChangePercent: Type.Optional(YahooNumber), // 0.024030166,
    twoHundredDayAverage: Type.Optional(YahooNumber), // 515.8518,
    twoHundredDayAverageChange: Type.Optional(YahooNumber), // 27.788208,
    twoHundredDayAverageChangePercent: Type.Optional(YahooNumber), // 0.053868588,
    marketCap: Type.Optional(YahooNumber), // 336513171456,
    forwardPE: Type.Optional(YahooNumber), // 46.54452,
    priceToBook: Type.Optional(YahooNumber), // 21.945745,
    sourceInterval: YahooNumber, // 15,
    exchangeDataDelayedBy: YahooNumber, // 0,
    firstTradeDateMilliseconds: Type.Optional(YahooDateInMs), // 917015400000 -> Date
    priceHint: YahooNumber, // 2,
    postMarketChangePercent: Type.Optional(YahooNumber), // 0.093813874,
    postMarketTime: Type.Optional(YahooFinanceDate), // 1612573179 -> new Date()
    postMarketPrice: Type.Optional(YahooNumber), // 544.15,
    postMarketChange: Type.Optional(YahooNumber), // 0.51000977,
    regularMarketChange: Type.Optional(YahooNumber), // -2.9299927,
    regularMarketChangePercent: Type.Optional(YahooNumber), // -0.53606904,
    regularMarketTime: Type.Optional(YahooFinanceDate), // 1612558802 -> new Date()
    regularMarketPrice: Type.Optional(YahooNumber), // 543.64,
    regularMarketDayHigh: Type.Optional(YahooNumber), // 549.19,
    regularMarketDayRange: Type.Optional(YahooTwoNumberRange), // "541.867 - 549.19" -> { low, high }
    regularMarketDayLow: Type.Optional(YahooNumber), // 541.867,
    regularMarketVolume: Type.Optional(YahooNumber), // 4228841,
    regularMarketPreviousClose: Type.Optional(YahooNumber), // 546.57,
    preMarketChange: Type.Optional(YahooNumber), // -2.9299927,
    preMarketChangePercent: Type.Optional(YahooNumber), // -0.53606904,
    preMarketTime: Type.Optional(YahooFinanceDate), // 1612558802 -> new Date()
    preMarketPrice: Type.Optional(YahooNumber), // 543.64,
    bid: Type.Optional(YahooNumber), // 543.84,
    ask: Type.Optional(YahooNumber), // 544.15,
    bidSize: Type.Optional(YahooNumber), // 18,
    askSize: Type.Optional(YahooNumber), // 8,
    fullExchangeName: Type.String(), // "NasdaqGS",
    financialCurrency: Type.Optional(Type.String()), // "USD",
    regularMarketOpen: Type.Optional(YahooNumber), // 549.0,
    averageDailyVolume3Month: Type.Optional(YahooNumber), // 7475022,
    averageDailyVolume10Day: Type.Optional(YahooNumber), // 5546385,
    displayName: Type.Optional(Type.String()), // "NVIDIA",
    symbol: Type.String(), // "NVDA"
    underlyingSymbol: Type.Optional(Type.String()), // "LD.MI" (for LDO.MI, #363)
    // only on ETF?  not on EQUITY?
    ytdReturn: Type.Optional(YahooNumber), // 0.31
    trailingThreeMonthReturns: Type.Optional(YahooNumber), // 16.98
    trailingThreeMonthNavReturns: Type.Optional(YahooNumber), // 17.08
    ipoExpectedDate: Type.Optional(YahooFinanceDate), // "2020-08-13",
    newListingDate: Type.Optional(YahooFinanceDate), // "2021-02-16",
    nameChangeDate: Type.Optional(YahooFinanceDate),
    prevName: Type.Optional(Type.String()),
    averageAnalystRating: Type.Optional(Type.String()),
    pageViewGrowthWeekly: Type.Optional(YahooNumber), // Since 2021-11-11 (#326)
    openInterest: Type.Optional(YahooNumber), // SOHO (#248)
    beta: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
  }
);

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
const QuoteCryptoCurrency = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("CRYPTOCURRENCY"),
    circulatingSupply: YahooNumber,
    fromCurrency: Type.String(), // 'BTC'
    toCurrency: Type.String(), // 'USD=X'
    lastMarket: Type.String(), // 'CoinMarketCap'
    coinImageUrl: Type.Optional(Type.String()), // 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1.png'
    volume24Hr: Type.Optional(YahooNumber), // 62631043072
    volumeAllCurrencies: Type.Optional(YahooNumber), // 62631043072
    startDate: Type.Optional(YahooFinanceDate), // new Date(1367103600 * 1000)
  }),
]);

const QuoteCurrency = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("CURRENCY"),
  }),
]);

const QuoteEtf = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("ETF"),
  }),
]);

const QuoteEquity = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("EQUITY"),
    dividendRate: Type.Optional(Type.Number()),
    dividendYield: Type.Optional(Type.Number()),
  }),
]);

const QuoteFuture = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("FUTURE"),
    headSymbolAsString: Type.String(),
    contractSymbol: Type.Boolean(),
    underlyingExchangeSymbol: Type.String(),
    expireDate: YahooFinanceDate,
    expireIsoDate: YahooFinanceDate,
  }),
]);

const QuoteIndex = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("INDEX"),
  }),
]);

const QuoteOption = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("OPTION"),
    strike: YahooNumber,
    openInterest: YahooNumber,
    expireDate: YahooNumber,
    expireIsoDate: YahooNumber,
    underlyingSymbol: Type.String(),
  }),
]);

const QuoteMutualfund = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("MUTUALFUND"),
  }),
]);

const QuoteSchema = Type.Union([
  QuoteCryptoCurrency,
  QuoteCurrency,
  QuoteEtf,
  QuoteEquity,
  QuoteFuture,
  QuoteIndex,
  QuoteMutualfund,
  QuoteOption,
]);

export type Quote = Static<typeof QuoteSchema>;

const QuoteField = Type.KeyOf(QuoteSchema);

const ResultType = Type.Union([
  Type.Literal("array"),
  Type.Literal("object"),
  Type.Literal("map"),
]);

const QuoteResponseArraySchema = Type.Array(QuoteSchema);

type QuoteResponseArray = Quote[];
type QuoteResponseMap = Map<string, Quote>;
type QuoteResponseObject = { [key: string]: Quote };

export const QuoteOptionsSchema = Type.Object({
  fields: Type.Optional(Type.Array(QuoteField)),
  return: Type.Optional(ResultType),
});

const QuoteOptionsWithReturnArraySchema = Type.Composite([
  QuoteOptionsSchema,
  Type.Object({
    return: Type.Optional(Type.Literal("array")),
  }),
]);
const QuoteOptionsWithReturnMapSchema = Type.Composite([
  QuoteOptionsSchema,
  Type.Object({
    return: Type.Literal("map"),
  }),
]);

const QuoteOptionsWithReturnObjectSchema = Type.Composite([
  QuoteOptionsSchema,
  Type.Object({
    return: Type.Literal("object"),
  }),
]);

type QuoteOptionsWithReturnArray = Static<
  typeof QuoteOptionsWithReturnArraySchema
>;

type QuoteOptionsWithReturnMap = Static<typeof QuoteOptionsWithReturnMapSchema>;

type QuoteOptionsWithReturnObject = Static<
  typeof QuoteOptionsWithReturnObjectSchema
>;

export type QuoteOptions = Static<typeof QuoteOptionsSchema>;

const queryOptionsDefaults = {};

/* --- array input, typed output, honor "return" param --- */

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsWithReturnArray,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponseArray>;

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsWithReturnMap,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<QuoteResponseMap>;

export default function quote(
  this: ModuleThis,
  query: string[],
  queryOptionsOverrides?: QuoteOptionsWithReturnObject,
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

export default async function quote(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: QuoteOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  const symbols = typeof query === "string" ? query : query.join(",");
  const returnAs = queryOptionsOverrides && queryOptionsOverrides.return;

  const results: Quote[] = await this._moduleExec<QuoteOptions>({
    moduleName: "quote",

    query: {
      url: "https://${YF_QUERY_HOST}/v7/finance/quote",
      needsCrumb: true,
      schema: QuoteOptionsSchema,
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
      schema: QuoteResponseArraySchema,
      transformWith(rawResult: any) {
        console.log({ rawResult: JSON.stringify(rawResult, null, 2) });
        let results = rawResult?.quoteResponse?.result;

        if (!results || !Array.isArray(results))
          throw new Error("Unexpected result: " + JSON.stringify(rawResult));

        // Filter out quoteType==='NONE'
        // So that delisted stocks will be undefined just like symbol-not-found
        results = results.filter((quote: any) => quote?.quoteType !== "NONE");

        return results;
      },
    },

    moduleOptions,
  });

  if (returnAs) {
    switch (returnAs) {
      case "array":
        return results as Quote[];
      case "object": {
        const object = {} as any;
        for (const result of results) object[result.symbol] = result;
        return object; // TODO: type
      }
      case "map": {
        const map = new Map();
        for (const result of results) map.set(result.symbol, result);
        return map; // TODO: type
      }
    }
  } else {
    // By default, match the query input shape (string or string[]).
    return typeof query === "string"
      ? (results[0] as Quote)
      : (results as Quote[]);
  }
}
