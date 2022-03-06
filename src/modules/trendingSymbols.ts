import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface TrendingSymbol {
  [key: string]: any;
  symbol: string;
}

export interface TrendingSymbolsResult {
  [key: string]: any;
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
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<TrendingSymbolsResult>;

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "trendingSymbols",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/trending/" + query,
      schemaKey: "#/definitions/TrendingSymbolsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },
    result: {
      schemaKey: "#/definitions/TrendingSymbolsResult",
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
