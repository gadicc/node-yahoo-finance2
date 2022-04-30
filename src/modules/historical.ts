import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export type HistoricalResult = Array<HistoricalRow>;

export interface HistoricalRow {
  [key: string]: any;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose?: number;
  volume: number;
}

export interface HistoricalOptions {
  period1: Date | string | number;
  period2?: Date | string | number;
  interval?: "1d" | "1wk" | "1mo"; // '1d',  TODO: all | types
  events?: string; // 'history',
  includeAdjustedClose?: boolean; // true,
}

const queryOptionsDefaults: Omit<HistoricalOptions, "period1"> = {
  interval: "1d",
  events: "history",
  includeAdjustedClose: true,
};

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<HistoricalResult>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "historical",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/download/" + symbol,
      schemaKey: "#/definitions/HistoricalOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      fetchType: "csv",
      transformWith(queryOptions: HistoricalOptions) {
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
                "yahooFinance.historical() option '" +
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
            "yahooFinance.historical() options `period1` and `period2` " +
              "cannot share the same value."
          );
        }

        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/HistoricalResult",
      transformWith(result: any) {
        const filteredResults = [];
        const fieldCount = Object.keys(result[0]).length;

        // Count number of null values in object (1-level deep)
        function nullFieldCount(object: Object) {
          let nullCount = 0;
          for (const val of Object.values(object))
            if (val === null) nullCount++;
          return nullCount;
        }

        for (const row of result) {
          const nullCount = nullFieldCount(row);

          if (nullCount === 0) {
            // No nulls is a legit (regular) result
            filteredResults.push(row);
          } else if (nullCount !== fieldCount - 1 /* skip "date" */) {
            // Unhandled case: some but not all values are null.
            // Note: no need to check for null "date", validation does it for us
            console.error(nullCount, row);
            throw new Error(
              "Historical returned a result with SOME (but not " +
                "all) null values.  Please report this, and provide the " +
                "query that caused it."
            );
          } else {
            // All fields (except "date") are null: silently skip (no-op)
          }
        }

        /*
         * We may consider, for future optimization, to count rows and create
         * new array in advance, and skip consecutive blocks of null results.
         * Of doubtful utility.
         */
        return filteredResults;
      },
    },

    moduleOptions,
  });
}
