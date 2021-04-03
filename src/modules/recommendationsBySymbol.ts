import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface RecommendationsBySymbolResponse {
  [key: string]: any;
  recommendedSymbols: Array<{
    [key: string]: any;
    score: number; // 0.1927
    symbol: string; // "BMW.DE"
  }>;
  symbol: string;
}

export type RecommendationsBySymbolResponseArray =
  RecommendationsBySymbolResponse[];

export interface RecommendationsBySymbolOptions {}

const queryOptionsDefaults = {};

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<RecommendationsBySymbolResponse>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<RecommendationsBySymbolResponseArray>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  const symbols = typeof query === "string" ? query : query.join(",");

  return this._moduleExec({
    moduleName: "recommendationsBySymbol",

    query: {
      url:
        "https://${YF_QUERY_HOST}/v6/finance/recommendationsbysymbol/" +
        symbols,
      schemaKey: "#/definitions/RecommendationsBySymbolOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/RecommendationsBySymbolResponseArray",
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
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
