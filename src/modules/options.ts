import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { Type, StaticDecode } from "@sinclair/typebox";

import { YahooFinanceDate, YahooNumber } from "../lib/yahooFinanceTypes.js";
import { QuoteBase } from "./quote.js";
import { Value } from "@sinclair/typebox/value";

/*
 * [TODO] Fields seen in a query but not in this module yet:
 *
 *   - extendedMarketChange
 *   - extendedMarketChangePercent
 *   - extendedMarketPrice
 *   - extendedMarketTime
 *   - dayHigh (separate to regularMarketDayHigh, etc)
 *   - dayLow (separate to regularMarketDayLow, etc)
 *   - volume (separate to regularMarketVolume, etc)
 *
 * i.e. on yahoo site, with ?fields=dayHigh,dayLow,etc.
 */

/*
 * Guaranteed fields, even we don't ask for them
 */
const QuoteCryptoCurrency = Type.Composite(
  [
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
  ],
  { title: "QuoteCryptoCurrency" },
);

const QuoteCurrency = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("CURRENCY"),
    }),
  ],
  { title: "QuoteCurrency" },
);

const QuoteEtf = Type.Composite([
  QuoteBase,
  Type.Object({
    quoteType: Type.Literal("ETF"),
  }),
]);

const QuoteEquity = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("EQUITY"),
      dividendRate: Type.Optional(Type.Number()),
      dividendYield: Type.Optional(Type.Number()),
    }),
  ],
  { title: "QuoteEquity" },
);

const QuoteFuture = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("FUTURE"),
      headSymbolAsString: Type.String(),
      contractSymbol: Type.Boolean(),
      underlyingExchangeSymbol: Type.String(),
      expireDate: YahooFinanceDate,
      expireIsoDate: YahooFinanceDate,
    }),
  ],
  {
    title: "QuoteFuture",
  },
);

const QuoteIndex = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("INDEX"),
    }),
  ],
  {
    title: "QuoteIndex",
  },
);

const QuoteOption = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("OPTION"),
      strike: YahooNumber,
      openInterest: YahooNumber,
      expireDate: YahooNumber,
      expireIsoDate: YahooNumber,
      underlyingSymbol: Type.String(),
    }),
  ],
  {
    title: "QuoteOption",
  },
);

const QuoteMutualfund = Type.Composite(
  [
    QuoteBase,
    Type.Object({
      quoteType: Type.Literal("MUTUALFUND"),
    }),
  ],
  {
    title: "QuoteMutualFund",
  },
);

const QuoteSchema = Type.Union(
  [
    QuoteCryptoCurrency,
    QuoteCurrency,
    QuoteEtf,
    QuoteEquity,
    QuoteFuture,
    QuoteIndex,
    QuoteMutualfund,
    QuoteOption,
  ],
  {
    title: "Quote",
  },
);

const CallOrPut = Type.Object(
  {
    contractSymbol: Type.String(),
    strike: YahooNumber,
    currency: Type.Optional(Type.String()),
    lastPrice: YahooNumber,
    change: YahooNumber,
    percentChange: Type.Optional(YahooNumber),
    volume: Type.Optional(YahooNumber),
    openInterest: Type.Optional(YahooNumber),
    bid: Type.Optional(YahooNumber),
    ask: Type.Optional(YahooNumber),
    contractSize: Type.Literal("REGULAR"),
    expiration: YahooFinanceDate,
    lastTradeDate: YahooFinanceDate,
    impliedVolatility: YahooNumber,
    inTheMoney: Type.Boolean(),
  },
  {
    additionalProperties: Type.Any(),
    title: "CallOrPut",
  },
);

const Option = Type.Object(
  {
    expirationDate: YahooFinanceDate,
    hasMiniOptions: Type.Boolean(),
    calls: Type.Array(CallOrPut),
    puts: Type.Array(CallOrPut),
  },
  {
    additionalProperties: Type.Any(),
    title: "Option",
  },
);

const OptionsResultSchema = Type.Object(
  {
    underlyingSymbol: Type.String(),
    expirationDates: Type.Array(YahooFinanceDate),
    strikes: Type.Array(YahooNumber),
    hasMiniOptions: Type.Boolean(),
    quote: QuoteSchema,
    options: Type.Array(Option),
  },
  {
    additionalProperties: Type.Any(),
    title: "OptionsResult",
  },
);

const OptionsOptionsSchema = Type.Object(
  {
    formatted: Type.Optional(Type.Boolean()),
    lang: Type.Optional(Type.String()),
    region: Type.Optional(Type.String()),
    date: Type.Optional(YahooFinanceDate),
  },
  {
    title: "OptionsOptions",
  },
);

export type OptionsOptions = StaticDecode<typeof OptionsOptionsSchema>;
export type OptionsResult = StaticDecode<typeof OptionsResultSchema>;

const queryOptionsDefaults: OptionsOptions = {
  formatted: false,
  lang: "en-US",
  region: "US",
};

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<OptionsResult>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec<OptionsOptions>({
    moduleName: "options",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/options/" + symbol,
      needsCrumb: true,
      schema: OptionsOptionsSchema,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: OptionsOptions) {
        // This is honestly the easiest way to coerce the date properly
        const parsed = Value.Decode(OptionsOptionsSchema, queryOptions);

        if (parsed.date) {
          queryOptions.date = Math.floor(parsed.date.getTime() / 1000);
        }
        return queryOptions;
      },
    },

    result: {
      schema: OptionsResultSchema,
      transformWith(result: any) {
        if (!result.optionChain)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.optionChain.result[0];
      },
    },

    moduleOptions,
  });
}
