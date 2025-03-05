import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

import type { DateInMs } from "../lib/commonTypes.ts";
import { getTypedDefinitions } from "../lib/validate/index.ts";

// @yf-schema: see the docs on how this file is automatically updated.
// @ts-ignore: tmp
import schema from "./insights.schema.json" with { type: "json" };
const definitions = getTypedDefinitions(schema);

export interface InsightsResult {
  [key: string]: unknown;
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
  [key: string]: unknown;
  headline: string;
  date: Date;
}

export interface InsightsReport {
  [key: string]: unknown;
  id: string;
  title?: string;
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
  [key: string]: unknown;
  eventType: string;
  pricePeriod: string;
  tradingHorizon: string;
  tradeType: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
}

export interface InsightsInstrumentInfo {
  [key: string]: unknown;
  keyTechnicals: {
    [key: string]: unknown;
    provider: string;
    support?: number;
    resistance?: number;
    stopLoss?: number;
  };
  technicalEvents: {
    [key: string]: unknown;
    provider: string;
    sector?: string;
    shortTermOutlook: InsightsOutlook;
    intermediateTermOutlook: InsightsOutlook;
    longTermOutlook: InsightsOutlook;
  };
  valuation: {
    [key: string]: unknown;
    color?: number;
    description?: string;
    discount?: string;
    provider: string;
    relativeValue?: string;
  };
}

export interface InsightsCompanySnapshot {
  [key: string]: unknown;
  sectorInfo?: string;
  company: {
    [key: string]: unknown;
    innovativeness?: number;
    hiring?: number;
    sustainability?: number;
    insiderSentiments?: number;
    earningsReports?: number;
    dividends?: number;
  };
  sector: {
    [key: string]: unknown;
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
  [key: string]: unknown;
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
  [key: string]: unknown;
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
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<InsightsResult>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<unknown>;

export default function trendingSymbols(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides?: InsightsOptions,
  moduleOptions?: ModuleOptions,
): Promise<unknown> {
  return this._moduleExec({
    moduleName: "insights",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/ws/insights/v2/finance/insights",
      definitions,
      schemaKey: "#/definitions/InsightsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      runtime: { symbol },
    },
    result: {
      definitions,
      schemaKey: "#/definitions/InsightsResult",
      transformWith(result: Record<string, Record<string, unknown>>) {
        if (!result.finance) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        return result.finance.result;
      },
    },
    moduleOptions,
  });
}
