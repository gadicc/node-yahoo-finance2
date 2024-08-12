import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { Type, Static } from "@sinclair/typebox";

import {
  YahooDateInMs,
  YahooFinanceDate,
  YahooNumber,
} from "../lib/yahooFinanceTypes.js";

const InsightsDirection = Type.Union(
  [Type.Literal("Bearish"), Type.Literal("Bullish"), Type.Literal("Neutral")],
  { title: "InsightsDirection" },
);

const InsightsOutlookSchema = Type.Object(
  {
    stateDescription: Type.String(),
    direction: InsightsDirection,
    score: YahooNumber,
    scoreDescription: Type.String(),
    sectorDirection: Type.Optional(InsightsDirection),
    sectorScore: Type.Optional(YahooNumber),
    sectorScoreDescription: Type.Optional(Type.String()),
    indexDirection: InsightsDirection,
    indexScore: YahooNumber,
    indexScoreDescription: Type.String(),
  },
  {
    additionalProperties: Type.Any(),
    title: "InsightsOutlook",
  },
);

const InsightsInstrumentInfo = Type.Object(
  {
    keyTechnicals: Type.Object(
      {
        provider: Type.String(),
        support: Type.Optional(YahooNumber),
        resistance: Type.Optional(YahooNumber),
        stopLoss: Type.Optional(YahooNumber),
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
    technicalEvents: Type.Object(
      {
        provider: Type.String(),
        sector: Type.Optional(Type.String()),
        shortTermOutlook: InsightsOutlookSchema,
        intermediateTermOutlook: InsightsOutlookSchema,
        longTermOutlook: InsightsOutlookSchema,
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
    valuation: Type.Object(
      {
        color: Type.Optional(YahooNumber),
        description: Type.Optional(Type.String()),
        discount: Type.Optional(Type.String()),
        provider: Type.String(),
        relativeValue: Type.Optional(Type.String()),
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
  },
  {
    additionalProperties: Type.Any(),
    title: "InsightsInstrumentInfo",
  },
);

const InsightsCompanySnapshot = Type.Object(
  {
    sectorInfo: Type.Optional(Type.String()),
    company: Type.Object(
      {
        innovativeness: Type.Optional(YahooNumber),
        hiring: Type.Optional(YahooNumber),
        sustainability: Type.Optional(YahooNumber),
        insiderSentiments: Type.Optional(YahooNumber),
        earningsReports: Type.Optional(YahooNumber),
        dividends: Type.Optional(YahooNumber),
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
    sector: Type.Object(
      {
        innovativeness: YahooNumber,
        hiring: YahooNumber,
        sustainability: Type.Optional(YahooNumber),
        insiderSentiments: YahooNumber,
        earningsReports: Type.Optional(YahooNumber),
        dividends: YahooNumber,
      },
      {
        additionalProperties: Type.Any(),
      },
    ),
  },
  { title: "InsightsCompanySnapshot", additionalProperties: Type.Any() },
);

const InsightsEventSchema = Type.Object(
  {
    eventType: Type.String(),
    pricePeriod: Type.String(),
    tradingHorizon: Type.String(),
    tradeType: Type.String(),
    imageUrl: Type.String(),
    startDate: YahooFinanceDate,
    endDate: YahooFinanceDate,
  },
  { title: "InsightsEvent", additionalProperties: Type.Any() },
);
const InsightsReport = Type.Object(
  {
    id: Type.String(),
    headHtml: Type.String(),
    provider: Type.String(),
    reportDate: YahooFinanceDate,
    reportTitle: Type.String(),
    reportType: Type.String(),
    targetPrice: Type.Optional(YahooNumber),
    targetPriceStatus: Type.Optional(
      Type.Union([
        Type.Literal("Increased"),
        Type.Literal("Maintained"),
        Type.Literal("Decreased"),
        Type.Literal("-"),
      ]),
    ),
    investmentRating: Type.Optional(
      Type.Union([
        Type.Literal("Bullish"),
        Type.Literal("Neutral"),
        Type.Literal("Bearish"),
      ]),
    ),
    tickers: Type.Optional(Type.Array(Type.String())),
  },
  { title: "InsightsReport", additionalProperties: Type.Any() },
);
const InsightsSigDev = Type.Object(
  {
    headline: Type.String(),
    date: YahooFinanceDate,
  },
  { title: "InsightsSigDev", additionalProperties: Type.Any() },
);
const InsightsUpsell = Type.Object(
  {
    msBullishSummary: Type.Optional(Type.Array(Type.String())),
    msBearishSummary: Type.Optional(Type.Array(Type.String())),
    msBullishBearishSummariesPublishDate: Type.Optional(YahooDateInMs),
    companyName: Type.Optional(Type.String()),
    upsellReportType: Type.Optional(Type.String()),
  },
  { title: "InsightsUpsell", additionalProperties: Type.Any() },
);
const InsightsResearchReport = Type.Object(
  {
    reportId: Type.String(),
    provider: Type.String(),
    title: Type.String(),
    reportDate: YahooFinanceDate,
    summary: Type.String(),
    investmentRating: Type.Optional(
      Type.Union([
        Type.Literal("Bullish"),
        Type.Literal("Neutral"),
        Type.Literal("Bearish"),
      ]),
    ),
  },
  { title: "InsightsResearchReport" },
);
const InsightsSecReport = Type.Object(
  {
    id: Type.String(),
    type: Type.String(),
    title: Type.String(),
    description: Type.String(),
    filingDate: YahooDateInMs,
    snapshotUrl: Type.String(),
    formType: Type.String(),
  },
  {
    title: "InsightsSecReport",
    additionalProperties: Type.Any(),
  },
);

const InsightsResultSchema = Type.Object(
  {
    symbol: Type.String(),
    instrumentInfo: Type.Optional(InsightsInstrumentInfo),
    companySnapshot: Type.Optional(InsightsCompanySnapshot),
    recommendation: Type.Optional(
      Type.Object({
        targetPrice: Type.Optional(YahooNumber),
        provider: Type.String(),
        rating: Type.Union([
          Type.Literal("BUY"),
          Type.Literal("SELL"),
          Type.Literal("HOLD"),
        ]),
      }),
    ),
    events: Type.Optional(Type.Array(InsightsEventSchema)),
    reports: Type.Optional(Type.Array(InsightsReport)),
    sigDevs: Type.Optional(Type.Array(InsightsSigDev)),
    upsell: Type.Optional(InsightsUpsell),
    upsellSearchDD: Type.Optional(
      Type.Object({
        researchReports: InsightsResearchReport,
      }),
    ),
    secReports: Type.Optional(Type.Array(InsightsSecReport)),
  },
  {
    additionalProperties: Type.Any(),
    title: "InsightsResult",
  },
);

type InsightsResult = Static<typeof InsightsResultSchema>;
type InsightsOutlook = Static<typeof InsightsOutlookSchema>;

export interface InsightsInstrumentInfo {
  [key: string]: any;
  keyTechnicals: {
    [key: string]: any;
    provider: string;
    support?: number;
    resistance?: number;
    stopLoss?: number;
  };
  technicalEvents: {
    [key: string]: any;
    provider: string;
    sector?: string;
    shortTermOutlook: InsightsOutlook;
    intermediateTermOutlook: InsightsOutlook;
    longTermOutlook: InsightsOutlook;
  };
  valuation: {
    [key: string]: any;
    color?: number;
    description?: string;
    discount?: string;
    provider: string;
    relativeValue?: string;
  };
}

export interface InsightsCompanySnapshot {
  [key: string]: any;
  sectorInfo?: string;
  company: {
    [key: string]: any;
    innovativeness?: number;
    hiring?: number;
    sustainability?: number;
    insiderSentiments?: number;
    earningsReports?: number;
    dividends?: number;
  };
  sector: {
    [key: string]: any;
    innovativeness: number;
    hiring: number;
    sustainability?: number;
    insiderSentiments: number;
    earningsReports?: number;
    dividends: number;
  };
}

const InsightsOptionsSchema = Type.Object(
  {
    lang: Type.Optional(Type.String()),
    region: Type.Optional(Type.String()),
    reportsCount: Type.Optional(YahooNumber),
  },
  { title: "InsightsOptions" },
);

type InsightsOptions = Static<typeof InsightsOptionsSchema>;

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  getAllResearchReports: true,
  reportsCount: 2,
};

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<InsightsResult>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "insights",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/ws/insights/v2/finance/insights",
      schema: InsightsOptionsSchema,
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      runtime: { symbol },
    },
    result: {
      schema: InsightsResultSchema,
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result;
      },
    },
    moduleOptions,
  });
}
