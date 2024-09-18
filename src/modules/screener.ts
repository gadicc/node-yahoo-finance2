import { StaticDecode, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import {
  YahooFinanceDate,
  YahooNumber,
  YahooTwoNumberRange,
} from "../lib/yahooFinanceTypes.js";

const ScreenerCriterum = Type.Object(
  {
    field: Type.String(),
    operators: Type.Array(Type.String()),
    values: Type.Array(YahooNumber),
    labelsSelected: Type.Array(YahooNumber),
    dependentValues: Type.Array(Type.Any()),
  },
  {
    title: "ScreenerCriterum",
  },
);

const ScreenerCriteriaMeta = Type.Object(
  {
    size: YahooNumber,
    offset: YahooNumber,
    sortField: Type.String(),
    sortType: Type.String(),
    quoteType: Type.String(),
    criteria: Type.Array(ScreenerCriterum),
    topOperator: Type.String(),
  },
  {
    title: "ScreenerCriteriaMeta",
  },
);

const ScreenerQuote = Type.Object(
  {
    language: Type.String(),
    region: Type.String(),
    quoteType: Type.String(),
    typeDisp: Type.String(),
    quoteSourceName: Type.String(),
    triggerable: Type.Boolean(),
    customPriceAlertConfidence: Type.String(),
    lastCloseTevEbitLtm: Type.Optional(YahooNumber),
    lastClosePriceToNNWCPerShare: Type.Optional(YahooNumber),
    firstTradeDateMilliseconds: YahooNumber,
    priceHint: YahooNumber,
    postMarketChangePercent: Type.Optional(YahooNumber),
    postMarketTime: Type.Optional(YahooNumber),
    postMarketPrice: Type.Optional(YahooNumber),
    postMarketChange: Type.Optional(YahooNumber),
    regularMarketChange: YahooNumber,
    regularMarketTime: YahooNumber,
    regularMarketPrice: YahooNumber,
    regularMarketDayHigh: Type.Optional(YahooNumber),
    regularMarketDayRange: YahooTwoNumberRange,
    currency: Type.String(),
    regularMarketDayLow: Type.Optional(YahooNumber),
    regularMarketVolume: Type.Optional(YahooNumber),
    regularMarketPreviousClose: YahooNumber,
    bid: Type.Optional(YahooNumber),
    ask: Type.Optional(YahooNumber),
    bidSize: Type.Optional(YahooNumber),
    askSize: Type.Optional(YahooNumber),
    market: Type.String(),
    messageBoardId: Type.String(),
    fullExchangeName: Type.String(),
    longName: Type.String(),
    financialCurrency: Type.Optional(Type.String()),
    regularMarketOpen: Type.Optional(YahooNumber),
    averageDailyVolume3Month: YahooNumber,
    averageDailyVolume10Day: YahooNumber,
    fiftyTwoWeekLowChange: YahooNumber,
    fiftyTwoWeekLowChangePercent: YahooNumber,
    fiftyTwoWeekRange: YahooTwoNumberRange,
    fiftyTwoWeekHighChange: YahooNumber,
    fiftyTwoWeekHighChangePercent: YahooNumber,
    fiftyTwoWeekChangePercent: YahooNumber,
    earningsTimestamp: Type.Optional(YahooNumber),
    earningsTimestampStart: Type.Optional(YahooNumber),
    earningsTimestampEnd: Type.Optional(YahooNumber),
    trailingAnnualDividendRate: Type.Optional(YahooNumber),
    trailingAnnualDividendYield: Type.Optional(YahooNumber),
    marketState: Type.String(),
    epsTrailingTwelveMonths: Type.Optional(YahooNumber),
    epsForward: Type.Optional(YahooNumber),
    epsCurrentYear: Type.Optional(YahooNumber),
    priceEpsCurrentYear: Type.Optional(YahooNumber),
    sharesOutstanding: Type.Optional(YahooNumber),
    bookValue: Type.Optional(YahooNumber),
    fiftyDayAverage: YahooNumber,
    fiftyDayAverageChange: YahooNumber,
    fiftyDayAverageChangePercent: YahooNumber,
    twoHundredDayAverage: YahooNumber,
    twoHundredDayAverageChange: YahooNumber,
    twoHundredDayAverageChangePercent: YahooNumber,
    marketCap: Type.Optional(YahooNumber),
    forwardPE: Type.Optional(YahooNumber),
    priceToBook: Type.Optional(YahooNumber),
    sourceInterval: YahooNumber,
    exchangeDataDelayedBy: YahooNumber,
    exchangeTimezoneName: Type.String(),
    exchangeTimezoneShortName: Type.String(),
    gmtOffSetMilliseconds: YahooNumber,
    esgPopulated: Type.Boolean(),
    tradeable: Type.Boolean(),
    cryptoTradeable: Type.Boolean(),
    exchange: Type.String(),
    fiftyTwoWeekLow: YahooNumber,
    fiftyTwoWeekHigh: YahooNumber,
    shortName: Type.String(),
    averageAnalystRating: Type.Optional(Type.String()),
    regularMarketChangePercent: YahooNumber,
    symbol: Type.String(),
    dividendDate: Type.Optional(YahooFinanceDate),
    displayName: Type.Optional(Type.String()),
    trailingPE: Type.Optional(YahooNumber),
    prevName: Type.Optional(Type.String()),
    nameChangeDate: Type.Optional(YahooFinanceDate),
    ipoExpectedDate: Type.Optional(YahooFinanceDate),
    dividendYield: Type.Optional(YahooNumber),
    dividendRate: Type.Optional(YahooNumber),
    yieldTTM: Type.Optional(YahooNumber),
    peTTM: Type.Optional(YahooNumber),
    annualReturnNavY3: Type.Optional(YahooNumber),
    annualReturnNavY5: Type.Optional(YahooNumber),
    ytdReturn: Type.Optional(YahooNumber),
    trailingThreeMonthReturns: Type.Optional(YahooNumber),
    netAssets: Type.Optional(YahooNumber),
    netExpenseRatio: Type.Optional(YahooNumber),
  },
  {
    title: "ScreenerQuote",
  },
);

const ScreenerResult = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    description: Type.String(),
    canonicalName: Type.String(),
    criteriaMeta: ScreenerCriteriaMeta,
    rawCriteria: Type.String(),
    start: YahooNumber,
    count: YahooNumber,
    total: YahooNumber,
    quotes: Type.Array(ScreenerQuote),
    useRecords: Type.Boolean(),
    predefinedScr: Type.Boolean(),
    versionId: YahooNumber,
    creationDate: YahooFinanceDate,
    lastUpdated: YahooFinanceDate,
    isPremium: Type.Boolean(),
    iconUrl: Type.String(),
  },
  {
    title: "ScreenerResult",
  },
);

const PredefinedScreenerModules = Type.Union(
  [
    Type.Literal("aggressive_small_caps"),
    Type.Literal("conservative_foreign_funds"),
    Type.Literal("day_gainers"),
    Type.Literal("day_losers"),
    Type.Literal("growth_technology_stocks"),
    Type.Literal("high_yield_bond"),
    Type.Literal("most_actives"),
    Type.Literal("most_shorted_stocks"),
    Type.Literal("portfolio_anchors"),
    Type.Literal("small_cap_gainers"),
    Type.Literal("solid_large_growth_funds"),
    Type.Literal("solid_midcap_growth_funds"),
    Type.Literal("top_mutual_funds"),
    Type.Literal("undervalued_growth_stocks"),
    Type.Literal("undervalued_large_caps"),
  ],
  {
    title: "ScreenerPredefinedScreenerModules",
  },
);

export type ScreenerResult = StaticDecode<typeof ScreenerResult>;

export type ScreenerOptions = StaticDecode<typeof ScreenerOptions>;

const queryOptionsDefaults: ScreenerOptions = {
  lang: "en-US",
  region: "US",
  scrIds: "day_gainers",
  count: 5,
};

const ScreenerOptions = Type.Object({
  lang: Type.Optional(Type.String()),
  region: Type.Optional(Type.String()),
  scrIds: PredefinedScreenerModules,
  count: Type.Optional(Type.Number()),
});

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<ScreenerResult>;

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "screener",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schema: ScreenerOptions,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true,
    },
    result: {
      schema: ScreenerResult,
      transformWith(result: any) {
        // console.log(result);
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
