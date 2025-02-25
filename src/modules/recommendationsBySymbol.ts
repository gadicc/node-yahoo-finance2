import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

export interface RecommendationsBySymbolResponse {
  [key: string]: unknown;
  recommendedSymbols: Array<{
    [key: string]: unknown;
    score: number; // 0.1927
    symbol: string; // "BMW.DE"
  }>;
  symbol: string;
}

export type RecommendationsBySymbolResponseArray =
  RecommendationsBySymbolResponse[];

export interface RecommendationsBySymbolOptions {
  [key: string]: never;
}

const queryOptionsDefaults = {};

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<RecommendationsBySymbolResponse>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<RecommendationsBySymbolResponseArray>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<unknown>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptions,
): Promise<unknown> {
  const symbols = typeof query === "string" ? query : query.join(",");

  return this._moduleExec({
    moduleName: "recommendationsBySymbol",

    query: {
      url: "https://${YF_QUERY_HOST}/v6/finance/recommendationsbysymbol/" +
        symbols,
      schemaKey: "#/definitions/RecommendationsBySymbolOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/RecommendationsBySymbolResponseArray",
      // deno-lint-ignore no-explicit-any
      transformWith(result: any) {
        if (!result.finance) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        return result.finance.result;
      },
    },

    moduleOptions,
  }).then((results: RecommendationsBySymbolResponseArray) => {
    return typeof query === "string"
      ? (results[0] as RecommendationsBySymbolResponse)
      : (results as RecommendationsBySymbolResponseArray);
  });
}
