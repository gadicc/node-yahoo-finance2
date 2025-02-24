import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

import type { Quote } from "./quote.ts";

export interface OptionsResult {
  [key: string]: unknown;
  underlyingSymbol: string;
  expirationDates: Date[];
  strikes: number[];
  hasMiniOptions: boolean;
  quote: Quote;
  options: Option[];
}

export interface Option {
  [key: string]: unknown;
  expirationDate: Date;
  hasMiniOptions: boolean;
  calls: CallOrPut[];
  puts: CallOrPut[];
}

export interface CallOrPut {
  [key: string]: unknown;
  contractSymbol: string;
  strike: number;
  currency?: string;
  lastPrice: number;
  change: number;
  percentChange?: number;
  volume?: number;
  openInterest?: number;
  bid?: number;
  ask?: number;
  contractSize: "REGULAR";
  expiration: Date;
  lastTradeDate: Date;
  impliedVolatility: number;
  inTheMoney: boolean;
}

export interface OptionsOptions {
  formatted?: boolean;
  lang?: string;
  region?: string;
  date?: Date | number | string;
}

const queryOptionsDefaults: OptionsOptions = {
  formatted: false,
  lang: "en-US",
  region: "US",
};

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<OptionsResult>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<unknown>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: OptionsOptions,
  moduleOptions?: ModuleOptions,
): Promise<unknown> {
  return this._moduleExec({
    moduleName: "options",

    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/options/" + symbol,
      needsCrumb: true,
      schemaKey: "#/definitions/OptionsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: OptionsOptions) {
        const date = queryOptions.date;
        if (date) {
          // yfDate will convert valid number/string to Date.
          if (date instanceof Date) {
            // now we convert back to unix epoch in seconds for query
            queryOptions.date = Math.floor(date.getTime() / 1000);
          } else {
            // yfDate didn't recognize it as a date.
            throw new Error("Unsupported date type: " + date);
          }
        }
        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/OptionsResult",
      // deno-lint-ignore no-explicit-any
      transformWith(result: any) {
        if (!result.optionChain) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        return result.optionChain.result[0];
      },
    },

    moduleOptions,
  });
}
