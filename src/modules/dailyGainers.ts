import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface DailyGainersResult {
  id: string;
  title: string;
  description: string;
  canonicalName: string;
  criteriaMeta: DailyGainersCriteriaMeta;
  rawCriteria: string;
  start: number;
  count: number;
  total: number;
  quotes: DailyGainersQuote[];
  useRecords: boolean;
  predefinedScr: boolean;
  versionId: number;
  creationDate: number;
  lastUpdated: number;
  isPremium: boolean;
  iconUrl: string;
}

export interface DailyGainersCriteriaMeta {
  size: number;
  offset: number;
  sortField: string;
  sortType: string;
  quoteType: string;
  criteria: DailyGainersCriterum[];
  topOperator: string;
}

export interface DailyGainersCriterum {
  field: string;
  operators: string[];
  values: number[];
  labelsSelected: number[];
  dependentValues: any[];
}

export interface DailyGainersQuote {
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
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  currency: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
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
  regularMarketOpen: number;
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
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
  marketState: string;
  epsTrailingTwelveMonths?: number;
  epsForward?: number;
  epsCurrentYear?: number;
  priceEpsCurrentYear?: number;
  sharesOutstanding: number;
  bookValue?: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
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
}

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_gainers",
  count: 5,
};

export interface DailyGainersOptions {
  lang?: string;
  region?: string;
  count?: number;
}

export default function dailyGainers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<DailyGainersResult>;

export default function dailyGainers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function dailyGainers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "dailyGainers",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schemaKey: "#/definitions/DailyGainersOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true,
    },
    result: {
      schemaKey: "#/definitions/DailyGainersResult",
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
