import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from '../lib/moduleCommon';

export interface RecommendationsBySymbolItem {
  score: number; // 0.1927
  symbol: string; // "BMW.DE"
}

export interface RecommendationsBySymbolResult {
  finance: {
    error: null,
    result: Array<{
      recommendedSymbols: Array<RecommendationsBySymbolItem>,
      symbol: string,
    }>
  }
}

export interface RecommendationsBySymbolOptions {}

const queryOptionsDefaults = {};

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<RecommendationsBySymbolResult>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptions
): Promise<RecommendationsBySymbolResult> {

  const symbols = typeof query === 'string' ? query : query.join(',');

  return this._moduleExec({
    moduleName: "recommendationsBySymbol",

    query: {
      url: `https://query2.finance.yahoo.com/v6/finance/recommendationsbysymbol/${symbols}`,
      schemaKey: "#/definitions/RecommendationsBySymbolOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides || {},
    },

    result: {
      schemaKey: "#/definitions/RecommendationsBySymbolResult",
    },

    moduleOptions,
  });

}
