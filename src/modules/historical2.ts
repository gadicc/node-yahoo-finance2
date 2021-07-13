import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface Historical2Result {
  quote: {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    adjClose?: number;
    volume: number;
  }[];
  dividends?: { date: Date; amount: number }[];
  splits?: {
    date: Date;
    numerator: number;
    denominator: number;
    splitRatio: string;
  }[];
  meta: {
    currency?: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: Date;
    regularMarketTime: Date;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: Historical2TradingPeriod;
      regular: Historical2TradingPeriod;
      post: Historical2TradingPeriod;
    };
    dataGranularity: "1d" | "1wk" | "1mo";
    range: string;
    validRanges: string[];
  };
}

export interface Historical2TradingPeriod {
  timezone: string;
  start: Date;
  end: Date;
  gmtoffset: number;
}

export interface Historical2Options {
  period1: Date | string | number;
  period2: Date | string | number;
  interval?: "1d" | "1wk" | "1mo";
  events?: "div" | "split" | "div|split";
  includeAdjustedClose?: boolean;
}

const queryOptionsDefaults: Omit<
  Omit<Historical2Options, "period1">,
  "period2"
> & {
  formatted: true;
} = {
  interval: "1d",
  includeAdjustedClose: true,
  formatted: true,
};

export default function historical2(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: Historical2Options,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<Historical2Result>;

export default function historical2(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: Historical2Options,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function historical2(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: Historical2Options,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "historical2",

    query: {
      url: "https://query1.finance.yahoo.com/v8/finance/chart/" + symbol,
      schemaKey: "#/definitions/Historical2Options",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: Historical2Options) {
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
      schemaKey: "#/definitions/Historical2Result",
      transformWith(result: any) {
        if (!result?.chart?.result[0]) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        const _result = result.chart.result[0];
        const newResult: Record<string, any> = {};
        newResult.meta = _result.meta;
        const timestamps = _result.timestamp;
        const quoteObj = _result.indicators.quote[0];
        newResult.quote = [];
        if (_result.indicators.adjclose) {
          const adjClose = _result.indicators.adjclose[0].adjclose;
          for (let i = 0; i < timestamps.length; i++) {
            newResult.quote.push({
              date: timestamps[i],
              open: quoteObj.open[i],
              close: quoteObj.close[i],
              high: quoteObj.high[i],
              low: quoteObj.low[i],
              volume: quoteObj.volume[i],
              adjClose: adjClose[i],
            });
          }
        } else {
          for (let i = 0; i < timestamps.length; i++) {
            newResult.quote.push({
              date: timestamps[i],
              open: quoteObj.open[i],
              close: quoteObj.close[i],
              high: quoteObj.high[i],
              low: quoteObj.low[i],
              volume: quoteObj.volume[i],
            });
          }
        }
        const splits = _result.events?.splits;
        const dividends = _result.events?.dividends;
        if (splits) {
          newResult.splits = Object.values(splits);
        }
        if (dividends) {
          newResult.dividends = Object.values(dividends);
        }

        return newResult;
      },
    },

    moduleOptions,
  });
}
