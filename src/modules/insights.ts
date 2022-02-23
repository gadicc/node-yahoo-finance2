import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface InsightsResult {
  symbol: string;
  instrumentInfo?: InsightsInstrumentInfo;
  companySnapshot?: InsightsCompanySnapshot;
  recommendation?: {
    targetPrice: number;
    provider: string;
    rating: "BUY" | "SELL" | "HOLD";
  };
  events?: InsightsEvent[];
  reports?: InsightsReport[];
  sigDevs: InsightsSigDev[];
  upsell?: InsightsUpsell;
}

export interface InsightsSigDev {
  headline: string;
  date: Date;
}

export interface InsightsReport {
  id: string;
  headHtml: string;
  provider: string;
  reportDate: string;
  reportTitle: string;
  reportType: string;
}

export interface InsightsEvent {
  eventType: string;
  pricePeriod: string;
  tradingHorizon: string;
  tradeType: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
}

export interface InsightsInstrumentInfo {
  keyTechnicals: {
    provider: string;
    support?: number;
    resistance?: number;
    stopLoss: number;
  };
  technicalEvents: {
    provider: string;
    sector?: string;
    shortTermOutlook: InsightsOutlook;
    intermediateTermOutlook: InsightsOutlook;
    longTermOutlook: InsightsOutlook;
  };
  valuation: {
    color?: number;
    description?: string;
    discount?: string;
    provider: string;
    relativeValue?: string;
  };
}

export interface InsightsCompanySnapshot {
  sectorInfo: string;
  company: {
    innovativeness?: number;
    hiring?: number;
    sustainability?: number;
    insiderSentiments?: number;
    earningsReports?: number;
    dividends?: number;
  };
  sector: {
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

export interface InsightsOptions {
  lang?: string;
  region?: string;
  reportsCount?: number;
}

export interface InsightsUpsell {
  companyName: string;
  upsellReportType: string;
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
      url: "https://query2.finance.yahoo.com/ws/insights/v2/finance/insights",
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
