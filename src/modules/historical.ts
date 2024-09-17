import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { YahooFinanceDate, YahooNumber } from "../lib/yahooFinanceTypes.js";
import _chart, { ChartOptionsSchema } from "./chart.js";
import validateAndCoerceTypebox from "../lib/validateAndCoerceTypes.js";
import { showNotice } from "../lib/notices.js";

const HistoricalRowHistory = Type.Object(
  {
    date: YahooFinanceDate,
    open: YahooNumber,
    high: YahooNumber,
    low: YahooNumber,
    close: YahooNumber,
    adjClose: Type.Optional(YahooNumber),
    volume: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "HistoricalRowHistory",
  },
);

const HistoricalRowDividend = Type.Object(
  {
    date: YahooFinanceDate,
    dividends: YahooNumber,
  },
  { title: "HistoricalRowDividend" },
);

const HistoricalRowStockSplit = Type.Object(
  {
    date: YahooFinanceDate,
    stockSplits: Type.String(),
  },
  { title: "HistoricalRowStockSplit" },
);

const HistoricalOptionsSchema = Type.Object(
  {
    period1: Type.Union([Type.Date(), Type.String(), Type.Number()]),
    period2: Type.Optional(
      Type.Union([Type.Date(), Type.String(), Type.Number()]),
    ),
    interval: Type.Optional(
      Type.Union([
        Type.Literal("1d"),
        Type.Literal("1wk"),
        Type.Literal("1mo"),
      ]),
    ),
    // events: Type.Optional(Type.String()),
    events: Type.Optional(
      Type.Union([
        Type.Literal("history"),
        Type.Literal("dividends"),
        Type.Literal("split"),
      ]),
    ),
    includeAdjustedClose: Type.Optional(Type.Boolean()),
  },
  { title: "HistoricalOptions" },
);

const HistoricalOptionsEventsHistorySchema = Type.Composite(
  [
    HistoricalOptionsSchema,
    Type.Object({
      events: Type.Optional(Type.Literal("history")),
    }),
  ],
  { title: "HistoricalOptionsEventsHistory" },
);

const HistoricalOptionsEventsDividendsSchema = Type.Composite(
  [
    HistoricalOptionsSchema,
    Type.Object({
      events: Type.Literal("dividends"),
    }),
  ],
  { title: "HistoricalOptionsEventsDividends" },
);

const HistoricalOptionsEventsSplitSchema = Type.Composite(
  [
    HistoricalOptionsSchema,
    Type.Object({
      events: Type.Literal("split"),
    }),
  ],
  { title: "HistoricalOptionsEventsSplit" },
);

const HistoricalHistoryResultSchema = Type.Array(HistoricalRowHistory, {
  title: "HistoricalHistoryResult",
});
const HistoricalDividendsResultSchema = Type.Array(HistoricalRowDividend, {
  title: "HistoricalDividendsResult",
});
const HistoricalStockSplitsResultSchema = Type.Array(HistoricalRowStockSplit, {
  title: "HistoricalRowStockSplit",
});

export type HistoricalOptions = Static<typeof HistoricalOptionsSchema>;
export type HistoricalOptionsEventsHistory = Static<
  typeof HistoricalOptionsEventsHistorySchema
>;

export type HistoricalHistoryResult = Static<
  typeof HistoricalHistoryResultSchema
>;
export type HistoricalDividendsResult = Static<
  typeof HistoricalDividendsResultSchema
>;
export type HistoricalOptionsEventsDividends = Static<
  typeof HistoricalOptionsEventsDividendsSchema
>;
export type HistoricalOptionsEventsSplit = Static<
  typeof HistoricalOptionsEventsSplitSchema
>;
export type HistoricalStockSplitsResult = Static<
  typeof HistoricalStockSplitsResultSchema
>;

const queryOptionsDefaults: Omit<HistoricalOptions, "period1"> = {
  interval: "1d",
  events: "history",
  includeAdjustedClose: true,
};

// Count number of null values in object (1-level deep)
function nullFieldCount(object: unknown) {
  if (object == null) {
    return;
  }
  let nullCount = 0;
  for (const val of Object.values(object)) if (val === null) nullCount++;
  return nullCount;
}

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptionsEventsHistory,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<HistoricalHistoryResult>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptionsEventsDividends,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<HistoricalDividendsResult>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptionsEventsSplit,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<HistoricalStockSplitsResult>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default async function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  showNotice("ripHistorical");

  validateAndCoerceTypebox({
    type: "options",
    data: queryOptionsOverrides ?? {},
    schema: HistoricalOptionsSchema,
    options: this._opts.validation,
  });

  let schema;
  if (
    !queryOptionsOverrides.events ||
    queryOptionsOverrides.events === "history"
  )
    schema = HistoricalHistoryResultSchema;
  else if (queryOptionsOverrides.events === "dividends")
    schema = HistoricalDividendsResultSchema;
  else if (queryOptionsOverrides.events === "split")
    schema = HistoricalStockSplitsResultSchema;
  else throw new Error("No such event type:" + queryOptionsOverrides.events);

  const queryOpts = { ...queryOptionsDefaults, ...queryOptionsOverrides };
  if (!Value.Check(HistoricalOptionsSchema, queryOpts))
    throw new Error(
      "Internal error, please report.  Overrides validated but not defaults?",
    );

  // Don't forget that queryOpts are already validated and safe-safe.
  const eventsMap = { history: "", dividends: "div", split: "split" };
  const chartQueryOpts = {
    period1: queryOpts.period1,
    period2: queryOpts.period2,
    interval: queryOpts.interval,
    events: eventsMap[queryOpts.events || "history"],
  };
  if (!Value.Check(ChartOptionsSchema, chartQueryOpts))
    throw new Error(
      "Internal error, please report.  historical() provided invalid chart() query options.",
    );

  // TODO: do we even care?
  if (queryOpts.includeAdjustedClose === false) {
    /* */
  }

  const result = await (this.chart as typeof _chart)(symbol, chartQueryOpts, {
    ...moduleOptions,
    validateResult: true,
  });

  let out;
  if (queryOpts.events === "dividends") {
    out = (result.events?.dividends ?? []).map((d) => ({
      date: d.date,
      dividends: d.amount,
    }));
  } else if (queryOpts.events === "split") {
    out = (result.events?.splits ?? []).map((s) => ({
      date: s.date,
      stockSplits: s.splitRatio,
    }));
  } else {
    out = (result.quotes ?? []).filter((quote) => {
      const fieldCount = Object.keys(quote).length;
      const nullCount = nullFieldCount(quote);

      if (nullCount === 0) {
        // No nulls is a legit (regular) result
        return true;
      } else if (nullCount !== fieldCount - 1 /* skip "date" */) {
        // Unhandled case: some but not all values are null.
        // Note: no need to check for null "date", validation does it for us
        console.error(nullCount, quote);
        throw new Error(
          "Historical returned a result with SOME (but not " +
            "all) null values.  Please report this, and provide the " +
            "query that caused it.",
        );
      } else {
        // All fields (except "date") are null
        return false;
      }
    });
  }

  const validateResult =
    !moduleOptions ||
    moduleOptions.validateResult === undefined ||
    moduleOptions.validateResult === true;

  const validationOpts = {
    ...this._opts.validation,
    // Set logErrors=false if validateResult=false
    logErrors: validateResult ? this._opts.validation.logErrors : false,
  };

  try {
    validateAndCoerceTypebox({
      type: "result",
      data: out,
      schema,
      options: validationOpts,
    });
  } catch (error) {
    if (validateResult) throw error;
  }

  return out;

  /*
  // Original historical() retrieval code when Yahoo API still existed.
  return this._moduleExec({
    moduleName: "historical",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/download/" + symbol,
      schema: HistoricalOptionsSchema,
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
                  "'",
              );

            queryOptions[fieldName] = Math.floor(timestamp / 1000);
          }
        }

        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error(
            "yahooFinance.historical() options `period1` and `period2` " +
              "cannot share the same value.",
          );
        }

        return queryOptions;
      },
    },

    result: {
      schema,
      transformWith(result: any) {
        if (result.length === 0) return result;

        const filteredResults = [];
        const fieldCount = Object.keys(result[0]).length;

        // Count number of null values in object (1-level deep)
        function nullFieldCount(object: unknown) {
          if (object == null) {
            return;
          }
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
          } else if (nullCount !== fieldCount - 1 /* skip "date" */ /*) {
            // Unhandled case: some but not all values are null.
            // Note: no need to check for null "date", validation does it for us
            console.error(nullCount, row);
            throw new Error(
              "Historical returned a result with SOME (but not " +
                "all) null values.  Please report this, and provide the " +
                "query that caused it.",
            );
          } else {
            // All fields (except "date") are null: silently skip (no-op)
          }
        }

        /*
         * We may consider, for future optimization, to count rows and create
         * new array in advance, and skip consecutive blocks of null results.
         * Of doubtful utility.
         */ /*
        return filteredResults;
      },
    },

    moduleOptions,
  });
  */
}
