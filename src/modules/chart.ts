// Co-authored by @gadicc, @PythonCreator27 and @huned.

import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface ChartResult {
  meta: ChartMeta;
  timestamp: Array<number>;
  events?: ChartEvents;
  indicators: ChartIndicators;
}

export interface ChartMeta {
  currency: string; // "USD"
  symbol: string; // "AAPL",
  exchangeName: string; // "NMS",
  instrumentType: string; // "EQUITY",
  firstTradeDate: Date; // new Date(345479400 * 1000),
  regularMarketTime: Date; // new Date(1637355602 * 1000),
  gmtoffset: number; // -18000,
  timezone: string; /// "EST",
  exchangeTimezoneName: string; // "America/New_York",
  regularMarketPrice: number; // 160.55,
  chartPreviousClose: number; // 79.75,
  priceHint: number; // 2,
  currentTradingPeriod: {
    pre: ChartMetaTradingPeriod;
    regular: ChartMetaTradingPeriod;
    post: ChartMetaTradingPeriod;
  };
  dataGranularity: string; // "1d",
  range: string; // "",
  validRanges: Array<string>; // ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
}

export interface ChartMetaTradingPeriod {
  timezone: string; // "EST",
  start: Date; // new Date(1637355600 * 1000),
  end: Date; // new Date(1637370000 * 10000),
  gmtoffset: number; // -18000
}

export interface ChartEvents {
  dividends: ChartEventDividends;
  splits: ChartEventSplits;
}

export interface ChartEventDividends {
  [key: string]: ChartEventDividend;
}

export interface ChartEventDividend {
  amount: number;
  date: Date;
}

export interface ChartEventSplits {
  [key: string]: ChartEventSplit;
}

export interface ChartEventSplit {
  date: Date; // new Date(1598880600 * 1000)
  numerator: number; // 4
  denominator: number; // 1
  splitRatio: string; // "4:1"
}

export interface ChartIndicators {
  quote: Array<ChartIndicatorQuote>;
  adjclose: Array<ChartIndicatorAdjclose>;
}

export interface ChartIndicatorQuote {
  high: Array<number>;
  low: Array<number>;
  open: Array<number>;
  close: Array<number>;
  volume: Array<number>;
}

export interface ChartIndicatorAdjclose {
  adjclose: Array<number>;
}

export interface ChartOptions {
  period1: Date | string | number;
  period2?: Date | string | number;
  useYfid?: boolean; // true
  interval?: "1d" | "1wk" | "1mo"; // '1d',  TODO: all | types
  includePrePost?: boolean; // true
  events?: string; // 'history',
  lang?: string; // "en-US"
}

const queryOptionsDefaults: Omit<ChartOptions, "period1"> = {
  useYfid: true,
  interval: "1d",
  includePrePost: true,
  events: "div|split|earn",
  lang: "en-US",
};

export default function _chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<ChartResult>;

export default function _chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function _chart(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: ChartOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "_chart",

    query: {
      url: "https://query1.finance.yahoo.com/v8/finance/chart/" + symbol,
      schemaKey: "#/definitions/ChartOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: ChartOptions) {
        if (!queryOptions.period2) queryOptions.period2 = new Date();

        const dates = ["period1", "period2"] as const;
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date)
            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
          else typeof value === "string";
          queryOptions[fieldName] = Math.floor(
            new Date(value as string).getTime() / 1000
          );
        }

        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/ChartResult",
      transformWith(result: any) {
        if (!result.chart)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.chart.result[0];
      },
    },

    moduleOptions,
  });
}
