// Co-authored by @gadicc, @PythonCreator27 and @huned.

import { Static, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { YahooFinanceDate, YahooNumber } from "../lib/yahooFinanceTypes.js";

const ChartMetaTradingPeriod = Type.Object(
  {
    timezone: Type.String(), // "EST",
    start: YahooFinanceDate, // new Date(1637355600 * 1000),
    end: YahooFinanceDate, // new Date(1637370000 * 10000),
    gmtoffset: YahooNumber, // -18000
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartMetaTradingPeriod",
  },
);

const ChartMetaTradingPeriods = Type.Object(
  {
    pre: Type.Optional(Type.Array(Type.Array(ChartMetaTradingPeriod))),
    post: Type.Optional(Type.Array(Type.Array(ChartMetaTradingPeriod))),
    regular: Type.Optional(Type.Array(Type.Array(ChartMetaTradingPeriod))),
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartMetaTradingPeriods",
  },
);

const ChartResultArrayQuote = Type.Object(
  {
    date: YahooFinanceDate,
    high: Type.Union([YahooNumber, Type.Null()]),
    low: Type.Union([YahooNumber, Type.Null()]),
    open: Type.Union([YahooNumber, Type.Null()]),
    close: Type.Union([YahooNumber, Type.Null()]),
    volume: Type.Union([YahooNumber, Type.Null()]),
    adjclose: Type.Optional(Type.Union([YahooNumber, Type.Null()])),
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartResultArrayQuote",
  },
);

const ChartEventDividend = Type.Object(
  {
    amount: YahooNumber,
    date: YahooFinanceDate,
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartEventDividend",
  },
);

const ChartEventDividends = Type.Object(
  {},
  {
    additionalProperties: ChartEventDividend,
    title: "ChartEventDividends",
  },
);

const ChartEventSplit = Type.Object(
  {
    date: YahooFinanceDate, // new Date(1598880600 * 1000)
    numerator: YahooNumber, // 4
    denominator: YahooNumber, // 1
    splitRatio: Type.String(), // "4:1"
  },
  {
    additionalProperties: Type.Any(),
  },
);
const ChartEventsArray = Type.Object(
  {
    dividends: Type.Optional(Type.Array(ChartEventDividend)),
    splits: Type.Optional(Type.Array(ChartEventSplit)),
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartEventsArray",
  },
);

const ChartMeta = Type.Object(
  {
    currency: Type.String(), // "USD"
    symbol: Type.String(), // "AAPL",
    exchangeName: Type.String(), // "NMS",
    instrumentType: Type.String(), // "EQUITY",
    firstTradeDate: Type.Union([YahooFinanceDate, Type.Null()]), // new Date(345479400 * 1000); null in e.g. "APS.AX"
    regularMarketTime: YahooFinanceDate, // new Date(1637355602 * 1000),
    gmtoffset: YahooNumber, // -18000,
    timezone: Type.String(), /// "EST",
    exchangeTimezoneName: Type.String(), // "America/New_York",
    regularMarketPrice: YahooNumber, // 160.55,
    chartPreviousClose: Type.Optional(YahooNumber), // 79.75; missing in e.g. "APS.AX"
    previousClose: Type.Optional(YahooNumber), // 1137.06
    scale: Type.Optional(YahooNumber), // 3,
    priceHint: YahooNumber, // 2,
    currentTradingPeriod: Type.Object(
      {
        pre: ChartMetaTradingPeriod,
        regular: ChartMetaTradingPeriod,
        post: ChartMetaTradingPeriod,
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
    tradingPeriods: Type.Optional(ChartMetaTradingPeriods),
    dataGranularity: Type.String(), // "1d",
    range: Type.String(), // ""
    validRanges: Type.Array(Type.String()), // ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartMeta",
  },
);

const ChartResultArraySchema = Type.Object(
  {
    meta: ChartMeta,
    events: Type.Optional(ChartEventsArray),
    quotes: Type.Array(ChartResultArrayQuote),
  },
  { title: "ChartResultArray" },
);

const ChartEventSplits = Type.Object(
  {},
  {
    additionalProperties: ChartEventSplit,
    title: "ChartEventSplits",
  },
);

const ChartIndicatorQuote = Type.Object(
  {
    high: Type.Array(Type.Union([YahooNumber, Type.Null()])),
    low: Type.Array(Type.Union([YahooNumber, Type.Null()])),
    open: Type.Array(Type.Union([YahooNumber, Type.Null()])),
    close: Type.Array(Type.Union([YahooNumber, Type.Null()])),
    volume: Type.Array(Type.Union([YahooNumber, Type.Null()])),
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartIndicatorQuote",
  },
);

const ChartIndicatorAdjclose = Type.Object(
  {
    adjclose: Type.Optional(Type.Array(Type.Union([YahooNumber, Type.Null()]))), // Missing in e.g. "APS.AX"
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartIndicatorAdjClose",
  },
);

const ChartEventsObject = Type.Object(
  {
    dividends: Type.Optional(ChartEventDividends),
    splits: Type.Optional(ChartEventSplits),
  },
  {
    additionalProperties: Type.Any(),
  },
);

const ChartIndicatorsObject = Type.Object(
  {
    quote: Type.Array(ChartIndicatorQuote),
    adjclose: Type.Optional(Type.Array(ChartIndicatorAdjclose)),
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartIndicatorObject",
  },
);
const ChartResultObjectSchema = Type.Object(
  {
    meta: ChartMeta,
    timestamp: Type.Optional(Type.Array(YahooNumber)),
    events: Type.Optional(ChartEventsObject),
    indicators: ChartIndicatorsObject,
  },
  {
    additionalProperties: Type.Any(),
    title: "ChartResultObject",
  },
);

export const ChartOptionsSchema = Type.Object(
  {
    period1: Type.Union([Type.Date(), Type.String(), YahooNumber]),
    period2: Type.Optional(
      Type.Union([Type.Date(), Type.String(), YahooNumber]),
    ),
    useYfid: Type.Optional(Type.Boolean()), // true
    interval: Type.Optional(
      Type.Union([
        Type.Literal("1m"),
        Type.Literal("2m"),
        Type.Literal("5m"),
        Type.Literal("15m"),
        Type.Literal("30m"),
        Type.Literal("60m"),
        Type.Literal("90m"),
        Type.Literal("1h"),
        Type.Literal("1d"),
        Type.Literal("5d"),
        Type.Literal("1wk"),
        Type.Literal("1mo"),
        Type.Literal("3mo"),
      ]),
    ),
    includePrePost: Type.Optional(Type.Boolean()), // true
    events: Type.Optional(Type.String()), // 'history',
    lang: Type.Optional(Type.String()), // "en-US"
    return: Type.Optional(
      Type.Union([Type.Literal("array"), Type.Literal("object")]),
    ),
  },
  {
    title: "ChartOptions",
  },
);

const ChartOptionsWithReturnArraySchema = Type.Composite(
  [
    ChartOptionsSchema,
    Type.Object({
      return: Type.Optional(Type.Literal("array")),
    }),
  ],
  {
    title: "ChartOptionsWithReturnArray",
  },
);

const ChartOptionsWithReturnObjectSchema = Type.Composite(
  [
    ChartOptionsSchema,
    Type.Object({
      return: Type.Literal("object"),
    }),
  ],
  {
    title: "ChartOptionsWithReturnObject",
  },
);

export type ChartOptions = Static<typeof ChartOptionsSchema>;
export type ChartOptionsWithReturnObject = Static<
  typeof ChartOptionsWithReturnObjectSchema
>;
export type ChartResultObject = Static<typeof ChartResultObjectSchema>;
export type ChartOptionsWithReturnArray = Static<
  typeof ChartOptionsWithReturnArraySchema
>;
export type ChartResultArray = Static<typeof ChartResultArraySchema>;

const queryOptionsDefaults: Omit<ChartOptions, "period1"> = {
  useYfid: true,
  interval: "1d",
  includePrePost: true,
  events: "div|split|earn",
  lang: "en-US",
  return: "array",
};
/* --- array input, typed output, honor "return" param --- */

// TODO: make this a deprecration passthrough
export const _chart = chart;

export default function chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptionsWithReturnObject,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<ChartResultObject>;

export default function chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptionsWithReturnArray,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<ChartResultArray>;

export default function chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default async function chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  const returnAs = queryOptionsOverrides?.return || "array";

  const result = (await this._moduleExec<ChartOptions>({
    moduleName: "chart",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v8/finance/chart/" + symbol,
      schema: ChartOptionsSchema,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: ChartOptions) {
        if (!queryOptions.period2) queryOptions.period2 = new Date();

        const dates = ["period1", "period2"] as const;
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date) {
            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
          } else if (typeof value === "string") {
            const timestamp = new Date(value as string).getTime();

            if (isNaN(timestamp))
              throw new Error(
                "yahooFinance.chart() option '" +
                  fieldName +
                  "' invalid date provided: '" +
                  value +
                  "'",
              );

            queryOptions[fieldName] = Math.floor(timestamp / 1000);
          }
        }

        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error(
            "yahooFinance.chart() options `period1` and `period2` " +
              "cannot share the same value.",
          );
        }

        // Don't pass this on to Yahoo
        delete queryOptions.return;

        return queryOptions;
      },
    },

    result: {
      schema: ChartResultObjectSchema,
      transformWith(result: any) {
        if (!result.chart)
          throw new Error("Unexpected result: " + JSON.stringify(result));

        const chart = result.chart.result[0];

        // If there are no quotes, chart.timestamp will be empty, but Yahoo also
        // gives us chart.indicators.quotes = [{}].  Let's clean that up and
        // deliver an empty array rather than an invalid ChartIndicatorQuote/
        if (!chart.timestamp) {
          if (chart.indicators.quote.length !== 1)
            throw new Error(
              "No timestamp with quotes.length !== 1, please report with your query",
            );
          if (Object.keys(chart.indicators.quote[0]).length !== 0)
            // i.e. {}
            throw new Error(
              "No timestamp with unexpected quote, please report with your query" +
                JSON.stringify(chart.indicators.quote[0]),
            );
          chart.indicators.quote.pop();
        }

        return chart;
      },
    },

    moduleOptions,
  })) as ChartResultObject;

  if (returnAs === "object") {
    return result;
  } else if (returnAs === "array") {
    const timestamp = result.timestamp;

    /*
    seems as though yahoo inserts extra quotes at the event times, so no need.
    if (result.events) {
      for (let event of ["dividends", "splits"]) {
        // @ts-ignore
        if (result.events[event])
          // @ts-ignore
          timestamp = timestamp.filter((ts) => !result.events[event][ts]);
      }
    }
    */

    // istanbul ignore next
    if (
      timestamp &&
      result?.indicators?.quote &&
      result.indicators.quote[0].high.length !== timestamp.length
    ) {
      console.log({
        origTimestampSize: result.timestamp && result.timestamp.length,
        filteredSize: timestamp.length,
        quoteSize: result.indicators.quote[0].high.length,
      });
      throw new Error(
        "Timestamp count mismatch, please report this with the query you used",
      );
    }

    const result2 = {
      meta: result.meta,
      quotes: timestamp ? new Array(timestamp.length) : [],
    } as ChartResultArray;

    const adjclose = result?.indicators?.adjclose?.[0].adjclose;

    if (timestamp)
      for (let i = 0; i < timestamp.length; i++) {
        result2.quotes[i] = {
          // @ts-expect-error (eatkinson): clean this up with type in followup
          date: new Date(timestamp[i] * 1000),
          high: result.indicators.quote[0].high[i],
          volume: result.indicators.quote[0].volume[i],
          open: result.indicators.quote[0].open[i],
          low: result.indicators.quote[0].low[i],
          close: result.indicators.quote[0].close[i],
        };
        if (adjclose) result2.quotes[i].adjclose = adjclose[i];
      }

    if (result.events) {
      result2.events = {};

      for (const event of ["dividends", "splits"]) {
        // @ts-expect-error (eatkinson): Fix up type in follow up
        if (result.events[event])
          // @ts-expect-error (eatkinson): Fix up type in follow up
          result2.events[event] = Object.values(result.events[event]);
      }
    }

    return result2;
  }

  // TypeScript runtime validation ensures no other values for
  // "returnAs" are possible.
}
