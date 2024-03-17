import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { TIMESERIES_KEYS } from "../lib/timeseriesKeys.js";

export const FundamentalsTimeSeries_Types = ["quarterly", "annual", "trailing"];

export const FundamentalsTimeSeries_Modules = [
  "income",
  "balance",
  "cashflow",
  "all",
];

export type FundamentalsTimeSeriesResults = Array<FundamentalsTimeSeriesResult>;

export interface FundamentalsTimeSeriesResult {
  [key: string]: unknown;
  date: Date;
}

export interface FundamentalsTimeSeriesOptions {
  period1: Date | number | string;
  period2?: Date | number | string;
  type?: string;
  merge?: boolean; // This returns a completely different format that will break the transformer
  padTimeSeries?: boolean; // Not exactly sure what this does, assume it pads p1 and p2???
  lang?: string;
  region?: string;
  module: string;
}

const queryOptionsDefaults: Omit<FundamentalsTimeSeriesOptions, "period1"> = {
  merge: false,
  padTimeSeries: true,
  lang: "en-US",
  region: "US",
  type: "quarterly",
  module: "income",
};

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<FundamentalsTimeSeriesResult>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "options",

    query: {
      assertSymbol: symbol,
      url: `https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${symbol}`,
      needsCrumb: false,
      schemaKey: "#/definitions/FundamentalsTimeSeriesOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: FundamentalsTimeSeriesOptions) {
        // Convert dates
        if (!queryOptions.period2) queryOptions.period2 = new Date();
        const dates = ["period1", "period2"] as const;
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date)
            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
          else if (typeof value === "string") {
            const timestamp = new Date(value as string).getTime();

            if (isNaN(timestamp))
              throw new Error(
                "yahooFinance.fundamentalsTimeSeries() option '" +
                  fieldName +
                  "' invalid date provided: '" +
                  value +
                  "'"
              );

            queryOptions[fieldName] = Math.floor(timestamp / 1000);
          }
        }

        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error(
            "yahooFinance.fundamentalsTimeSeries() options `period1` and `period2` " +
              "cannot share the same value."
          );
        }

        // Validate timeseries type and module
        if (!FundamentalsTimeSeries_Types.includes(queryOptions.type || "")) {
          throw new Error(
            "yahooFinance.fundamentalsTimeSeries() option type invalid."
          );
        } else if (
          !FundamentalsTimeSeries_Modules.includes(queryOptions.module || "")
        ) {
          throw new Error(
            "yahooFinance.fundamentalsTimeSeries() option module invalid."
          );
        }

        // Join the keys for the module into query types.
        const timeseriesKeys = TIMESERIES_KEYS[queryOptions.module];
        queryOptions.type =
          queryOptions.type + timeseriesKeys.join(`,${queryOptions.type}`);
        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/FundamentalsTimeSeriesResults",
      transformWith(response: any) {
        if (!response || !response.timeseries)
          throw new Error(`Unexpected result: ${JSON.stringify(response)}`);

        return processResponse(response);
      },
    },

    moduleOptions,
  });
}

export const processResponse = function (response: any): any {
  const keyedByTimestamp: Record<string, any> = {};
  const replace = new RegExp(FundamentalsTimeSeries_Types.join("|"));
  for (let ct = 0; ct < response.timeseries.result.length; ct++) {
    const result = response.timeseries.result[ct];
    if (!result.timestamp || !result.timestamp.length) {
      continue;
    }
    for (let ct = 0; ct < result.timestamp.length; ct++) {
      const timestamp = result.timestamp[ct];
      const dataKey = Object.keys(result)[2];

      if (!keyedByTimestamp[timestamp]) {
        keyedByTimestamp[timestamp] = { date: timestamp };
      }
      if (
        !result[dataKey][ct] ||
        !result[dataKey][ct].reportedValue ||
        !result[dataKey][ct].reportedValue.raw
      ) {
        continue;
      }

      // Extract the type from the dataKey for later mapping.
      const short = dataKey.replace(replace, "");
      const key =
        short == short.toUpperCase()
          ? short
          : short[0].toLowerCase() + short.slice(1);
      keyedByTimestamp[timestamp][key] = result[dataKey][ct].reportedValue.raw;
    }
  }

  return Object.keys(keyedByTimestamp).map((k) => keyedByTimestamp[k]);
};
