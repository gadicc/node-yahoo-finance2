import { StaticDecode, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { NullableYahooNumber, YahooNumber } from "../lib/yahooFinanceTypes.js";

const TrendingSymbol = Type.Object(
  {
    symbol: Type.String(),
  },
  {
    additionalProperties: Type.Any(),
  },
);

const TrendingSymbolsResult = Type.Object(
  {
    count: YahooNumber,
    quotes: Type.Array(TrendingSymbol),
    jobTimestamp: YahooNumber,
    startInterval: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "TrendingSymbolsResult",
  },
);

const TrendingSymbolsOptions = Type.Optional(
  Type.Object(
    {
      lang: Type.Optional(Type.String()),
      region: Type.Optional(Type.String()),
      count: Type.Optional(YahooNumber),
    },
    {
      title: "TrendingSymbolsOptions",
    },
  ),
);

export type TrendingSymbolsResult = StaticDecode<typeof TrendingSymbolsResult>;
export type TrendingSymbolsOptions = StaticDecode<
  typeof TrendingSymbolsOptions
>;

const queryOptionsDefaults: TrendingSymbolsOptions = {
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
): Promise<any>;

export default function trendingSymbols(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: TrendingSymbolsOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "trendingSymbols",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/trending/" + query,
      schema: TrendingSymbolsOptions,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },
    result: {
      schema: TrendingSymbolsResult,
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
