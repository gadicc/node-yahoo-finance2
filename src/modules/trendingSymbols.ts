import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

import { getTypedDefinitions } from "../lib/validate/index.ts";

// @yf-schema: see the docs on how this file is automatically updated.
import schema from "./trendingSymbols.schema.json" with { type: "json" };
const definitions = getTypedDefinitions(schema);

export interface TrendingSymbol {
  [key: string]: unknown;
  symbol: string;
}

export interface TrendingSymbolsResult {
  [key: string]: unknown;
  count: number;
  quotes: TrendingSymbol[];
  jobTimestamp: number;
  startInterval: number;
}

export interface TrendingSymbolsOptions {
  lang?: string;
  region?: string;
  count?: number;
}

const queryOptionsDefaults = {
  lang: "en-US",
  count: 5,
};

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<TrendingSymbolsResult>;

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<unknown>;

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptions,
): Promise<unknown> {
  return this._moduleExec({
    moduleName: "trendingSymbols",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/trending/" + query,
      definitions,
      schemaKey: "#/definitions/TrendingSymbolsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },
    result: {
      definitions,
      schemaKey: "#/definitions/TrendingSymbolsResult",
      // deno-lint-ignore no-explicit-any
      transformWith(result: any) {
        if (!result.finance) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
