import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

import type { DateInMs } from "../lib/commonTypes.js";

export interface InsightsResult {
  [key: string]: any;
  symbol: string;
  instrumentInfo?: InsightsInstrumentInfo;
  companySnapshot?: InsightsCompanySnapshot;
  recommendation?: {
    targetPrice?: number;
    provider: string;
    rating: "BUY" | "SELL" | "HOLD";
  };
  events?: InsightsEvent[];
  reports?: InsightsReport[];
  sigDevs: InsightsSigDev[];
  upsell?: InsightsUpsell;
  upsellSearchDD?: {
    researchReports: InsightsResearchReport;
  };
  secReports?: InsightsSecReport[];
}

export interface InsightsSigDev {
  [key: string]: any;
  headline: string;
  date: Date;
}

export interface InsightsReport {
  [key: string]: any;
  id: string;
  headHtml: string;
  provider: string;
  reportDate: Date;
  reportTitle: string;
  reportType: string;
  targetPrice?: number;
  targetPriceStatus?: "Increased" | "Maintained" | "Decreased" | "-";
  investmentRating?: "Bullish" | "Neutral" | "Bearish";
  tickers?: string[];
}

export interface InsightsResearchReport {
  reportId: string;
  provider: string;
  title: string;
  reportDate: Date;
  summary: string;
  investmentRating?: "Bullish" | "Neutral" | "Bearish";
}

export interface InsightsSecReport {
  id: string;
  type: string;
  title: string;
  description: string;
  filingDate: DateInMs;
  snapshotUrl: string;
  formType: string;
}

export interface InsightsEvent {
  [key: string]: any;
  eventType: string;
  pricePeriod: string;
  tradingHorizon: string;
  tradeType: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
}

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

export type InsightsDirection = "Bearish" | "Bullish" | "Neutral";

export interface InsightsOutlook {
  [key: string]: any;
  stateDescription: string;
  direction: InsightsDirection;
  score: number;
  scoreDescription: string;
  sectorDirection?: InsightsDirection;
  sectorScore?: number;
  sectorScoreDescription?: string;
  indexDirection: InsightsDirection;
  indexScore: number;
  indexScoreDescription: string;
}

export interface InsightsUpsell {
  [key: string]: any;
  msBullishSummary?: Array<string>;
  msBearishSummary?: Array<string>;
  msBullishBearishSummariesPublishDate?: DateInMs;
  companyName?: string; // Missing in e.g. APS.AX
  upsellReportType?: string;
}

export interface InsightsOptions {
  lang?: string;
  region?: string;
  reportsCount?: number;
}

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
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<InsightsResult>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "insights",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/ws/insights/v2/finance/insights",
      schemaKey: "#/definitions/InsightsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      runtime: { symbol },
    },
    result: {
      schemaKey: "#/definitions/InsightsResult",
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result;
      },
    },
    moduleOptions,
  });
}
