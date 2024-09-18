import { StaticDecode, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { YahooNumber } from "../lib/yahooFinanceTypes.js";

const RecommendationsBySymbolResponse = Type.Object(
  {
    recommendedSymbols: Type.Array(
      Type.Object(
        {
          score: YahooNumber, // 0.1927
          symbol: Type.String(), // "BMW.DE"
        },
        {
          additionalProperties: Type.Any(),
        },
      ),
    ),
    symbol: Type.String(),
  },
  {
    additionalProperties: Type.Any(),
  },
);

const RecommendationsBySymbolResponseArray = Type.Array(
  RecommendationsBySymbolResponse,
);

const RecommendationsBySymbolOptions = Type.Object({});

export type RecommendationsBySymbolResponse = StaticDecode<
  typeof RecommendationsBySymbolResponse
>;

export type RecommendationsBySymbolOptions = StaticDecode<
  typeof RecommendationsBySymbolOptions
>;

export type RecommendationsBySymbolResponseArray = StaticDecode<
  typeof RecommendationsBySymbolResponseArray
>;

const queryOptionsDefaults: RecommendationsBySymbolOptions = {};

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
): Promise<any>;

export default function recommendationsBySymbol(
  this: ModuleThis,
  query: string | string[],
  queryOptionsOverrides?: RecommendationsBySymbolOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  const symbols = typeof query === "string" ? query : query.join(",");

  return this._moduleExec({
    moduleName: "recommendationsBySymbol",

    query: {
      url:
        "https://${YF_QUERY_HOST}/v6/finance/recommendationsbysymbol/" +
        symbols,
      schema: RecommendationsBySymbolOptions,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },

    result: {
      schema: RecommendationsBySymbolResponseArray,
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
