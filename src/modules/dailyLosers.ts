import { StaticDecode, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { YahooNumber, YahooFinanceDate } from "../lib/yahooFinanceTypes.js";

const DailyLosersCriterum = Type.Object(
  {
    field: Type.String(),
    operators: Type.Array(Type.String()),
    values: Type.Array(YahooNumber),
    labelsSelected: Type.Array(YahooNumber),
    dependentValues: Type.Array(Type.Any()),
  },
  { title: "DailyLosersCriterium" },
);

const DailyLosersQuote = Type.Object(
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
    regularMarketDayHigh: YahooNumber,
    regularMarketDayRange: Type.String(),
    currency: Type.String(),
    regularMarketDayLow: YahooNumber,
    regularMarketVolume: YahooNumber,
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
    regularMarketOpen: YahooNumber,
    averageDailyVolume3Month: YahooNumber,
    averageDailyVolume10Day: YahooNumber,
    fiftyTwoWeekLowChange: YahooNumber,
    fiftyTwoWeekLowChangePercent: YahooNumber,
    fiftyTwoWeekRange: Type.String(),
    fiftyTwoWeekHighChange: YahooNumber,
    fiftyTwoWeekHighChangePercent: YahooNumber,
    fiftyTwoWeekChangePercent: YahooNumber,
    earningsTimestamp: Type.Optional(YahooNumber),
    earningsTimestampStart: Type.Optional(YahooNumber),
    earningsTimestampEnd: Type.Optional(YahooNumber),
    trailingAnnualDividendRate: YahooNumber,
    trailingAnnualDividendYield: YahooNumber,
    marketState: Type.String(),
    epsTrailingTwelveMonths: Type.Optional(YahooNumber),
    epsForward: Type.Optional(YahooNumber),
    epsCurrentYear: Type.Optional(YahooNumber),
    priceEpsCurrentYear: Type.Optional(YahooNumber),
    sharesOutstanding: YahooNumber,
    bookValue: Type.Optional(YahooNumber),
    fiftyDayAverage: YahooNumber,
    fiftyDayAverageChange: YahooNumber,
    fiftyDayAverageChangePercent: YahooNumber,
    twoHundredDayAverage: YahooNumber,
    twoHundredDayAverageChange: YahooNumber,
    twoHundredDayAverageChangePercent: YahooNumber,
    marketCap: YahooNumber,
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
    dividendDate: Type.Optional(YahooNumber),
    displayName: Type.Optional(Type.String()),
    trailingPE: Type.Optional(YahooNumber),
    prevName: Type.Optional(Type.String()),
    nameChangeDate: Type.Optional(YahooNumber),
    ipoExpectedDate: Type.Optional(YahooFinanceDate),
    dividendYield: Type.Optional(YahooNumber),
    dividendRate: Type.Optional(YahooNumber),
  },
  { title: "DailyLosersQuote" },
);

const DailyLosersOptionsSchema = Type.Object(
  {
    lang: Type.Optional(Type.String()),
    region: Type.Optional(Type.String()),
    count: Type.Optional(YahooNumber),
  },
  { title: "DailyLosersOptions" },
);

const DailyLosersCriteriaMeta = Type.Object(
  {
    size: YahooNumber,
    offset: YahooNumber,
    sortField: Type.String(),
    sortType: Type.String(),
    quoteType: Type.String(),
    criteria: Type.Array(DailyLosersCriterum),
    topOperator: Type.String(),
  },
  { title: "DailyLosersCriteriaMeta" },
);

const DailyLosersResultSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    description: Type.String(),
    canonicalName: Type.String(),
    criteriaMeta: DailyLosersCriteriaMeta,
    rawCriteria: Type.String(),
    start: YahooNumber,
    count: YahooNumber,
    total: YahooNumber,
    quotes: Type.Array(DailyLosersQuote),
    useRecords: Type.Boolean(),
    predefinedScr: Type.Boolean(),
    versionId: YahooNumber,
    creationDate: YahooNumber,
    lastUpdated: YahooNumber,
    isPremium: Type.Boolean(),
    iconUrl: Type.String(),
  },
  { title: "DailyLosersResult" },
);

export type DailyLosersResult = StaticDecode<typeof DailyLosersResultSchema>;
export type DailyLosersOptions = StaticDecode<typeof DailyLosersOptionsSchema>;

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_losers",
  count: 5,
};

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyLosersOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<DailyLosersResult>;

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyLosersOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyLosersOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "dailyLosers",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schema: DailyLosersOptionsSchema,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true,
    },
    result: {
      schema: DailyLosersResultSchema,
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
