import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface ScreenerResult {
  id: string;
  title: string;
  description: string;
  canonicalName: string;
  criteriaMeta: ScreenerCriteriaMeta;
  rawCriteria: string;
  start: number;
  count: number;
  total: number;
  quotes: ScreenerQuote[];
  useRecords: boolean;
  predefinedScr: boolean;
  versionId: number;
  creationDate: number;
  lastUpdated: number;
  isPremium: boolean;
  iconUrl: string;
}

export interface ScreenerCriteriaMeta {
  size: number;
  offset: number;
  sortField: string;
  sortType: string;
  quoteType: string;
  criteria: ScreenerCriterum[];
  topOperator: string;
}

export interface ScreenerCriterum {
  field: string;
  operators: string[];
  values: number[];
  labelsSelected: number[];
  dependentValues: any[];
}

export interface ScreenerQuote {
  language: string;
  region: string;
  quoteType: string;
  typeDisp: string;
  quoteSourceName: string;
  triggerable: boolean;
  customPriceAlertConfidence: string;
  lastCloseTevEbitLtm?: number;
  lastClosePriceToNNWCPerShare?: number;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  postMarketChangePercent?: number;
  postMarketTime?: number;
  postMarketPrice?: number;
  postMarketChange?: number;
  regularMarketChange: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh?: number;
  regularMarketDayRange?: string;
  currency: string;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  regularMarketPreviousClose: number;
  bid?: number;
  ask?: number;
  bidSize?: number;
  askSize?: number;
  market: string;
  messageBoardId: string;
  fullExchangeName: string;
  longName: string;
  financialCurrency?: string;
  regularMarketOpen?: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekChangePercent: number;
  earningsTimestamp?: number;
  earningsTimestampStart?: number;
  earningsTimestampEnd?: number;
  trailingAnnualDividendRate?: number;
  trailingAnnualDividendYield?: number;
  marketState: string;
  epsTrailingTwelveMonths?: number;
  epsForward?: number;
  epsCurrentYear?: number;
  priceEpsCurrentYear?: number;
  sharesOutstanding?: number;
  bookValue?: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap?: number;
  forwardPE?: number;
  priceToBook?: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  esgPopulated: boolean;
  tradeable: boolean;
  cryptoTradeable: boolean;
  exchange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  shortName: string;
  averageAnalystRating?: string;
  regularMarketChangePercent: number;
  symbol: string;
  dividendDate?: number;
  displayName?: string;
  trailingPE?: number;
  prevName?: string;
  nameChangeDate?: number;
  ipoExpectedDate?: number;
  dividendYield?: number;
  dividendRate?: number;
  yieldTTM?: number;
  peTTM?: number;
  annualReturnNavY3?: number;
  annualReturnNavY5?: number;
  ytdReturn?: number;
  trailingThreeMonthReturns?: number;
  netAssets?: number;
  netExpenseRatio?: number;
}

export type PredefinedScreenerModules =
  | "aggressive_small_caps"
  | "conservative_foreign_funds"
  | "day_gainers"
  | "day_losers"
  | "growth_technology_stocks"
  | "high_yield_bond"
  | "most_actives"
  | "most_shorted_stocks"
  | "portfolio_anchors"
  | "small_cap_gainers"
  | "solid_large_growth_funds"
  | "solid_midcap_growth_funds"
  | "top_mutual_funds"
  | "undervalued_growth_stocks"
  | "undervalued_large_caps";

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_gainers",
  count: 5,
};

export interface ScreenerOptions {
  lang?: string;
  region?: string;
  scrIds: PredefinedScreenerModules;
  count?: number;
}

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<ScreenerResult>;

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function screener(
  this: ModuleThis,
  queryOptionsOverrides?: ScreenerOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "screener",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schemaKey: "#/definitions/ScreenerOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true,
    },
    result: {
      schemaKey: "#/definitions/ScreenerResult",
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

// aggressive_small_caps
// conservative_foreign_funds
// day_gainers
// day_losers
// growth_technology_stocks
// high_yield_bond
// most_actives
// most_shorted_stocks
// portfolio_anchors
// small_cap_gainers
// solid_large_growth_funds
// solid_midcap_growth_funds
// top_mutual_funds
// undervalued_growth_stocks
// undervalued_large_caps
