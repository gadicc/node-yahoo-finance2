import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export interface SearchQuoteYahoo {
  [key: string]: any;
  symbol: string; // "BABA"
  isYahooFinance: true; // true
  exchange: string; // "NYQ"
  exchDisp?: string; // "London" e.g. with BJ0CDD2
  shortname?: string; // "Alibaba Group Holding Limited"
  longname?: string; // "Alibaba Group Holding Limited"
  index: "quotes"; // "quotes"
  score: number; // 1111958.0
  newListingDate?: Date; // "2021-02-16"
  prevName?: string;
  nameChangeDate?: Date;
}
export interface SearchQuoteYahooEquity extends SearchQuoteYahoo {
  quoteType: "EQUITY";
  typeDisp: "Equity";
}
export interface SearchQuoteYahooOption extends SearchQuoteYahoo {
  quoteType: "OPTION";
  typeDisp: "Option";
}
export interface SearchQuoteYahooETF extends SearchQuoteYahoo {
  quoteType: "ETF";
  typeDisp: "ETF"; // "Option"
}
export interface SearchQuoteYahooFund extends SearchQuoteYahoo {
  quoteType: "MUTUALFUND";
  typeDisp: "Fund";
}
export interface SearchQuoteYahooIndex extends SearchQuoteYahoo {
  quoteType: "INDEX";
  typeDisp: "Index";
}
export interface SearchQuoteYahooCurrency extends SearchQuoteYahoo {
  quoteType: "CURRENCY";
  typeDisp: "Currency";
}
export interface SearchQuoteYahooCryptocurrency extends SearchQuoteYahoo {
  quoteType: "CRYPTOCURRENCY";
  typeDisp: "Cryptocurrency";
}

export interface SearchQuoteYahooFuture extends SearchQuoteYahoo {
  quoteType: "FUTURE";
  typeDisp: "Future";
}

export interface SearchQuoteNonYahoo {
  [key: string]: any;
  index: string; // '78ddc07626ff4bbcae663e88514c23a0'
  name: string; // 'AAPlasma'
  permalink: string; // 'aaplasma',
  isYahooFinance: false; // false
}

export interface SearchNews {
  [key: string]: any;
  uuid: string; // "9aff624a-e84c-35f3-9c23-db39852006dc"
  title: string; // "Analyst Report: Alibaba Group Holding Limited"
  publisher: string; // "Morningstar Research"
  link: string; // "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html"
  providerPublishTime: Date; // coerced to new Date(1611286342 * 1000)
  type: string; // "STORY"    TODO "STORY" | ???
}

export interface SearchResult {
  [key: string]: any;
  explains: Array<any>;
  count: number;
  quotes: Array<
    | SearchQuoteYahooEquity
    | SearchQuoteYahooOption
    | SearchQuoteYahooETF
    | SearchQuoteYahooFund
    | SearchQuoteYahooIndex
    | SearchQuoteYahooCurrency
    | SearchQuoteYahooCryptocurrency
    | SearchQuoteNonYahoo
    | SearchQuoteYahooFuture
  >;
  news: Array<SearchNews>;
  nav: Array<any>;
  lists: Array<any>;
  researchReports: Array<any>;
  totalTime: number;
  // ALWAYS present, but TEMPORARILY marked optional ("?") since its
  // sudden appearance, let's make sure it doesn't get suddenly removed.
  // Array<any> until we can find some examples of what it actually looks
  // like (#255).
  screenerFieldResults?: Array<any>;
  // ALWAYS present, but TEMPORARILY marked optional ("?") since its
  // sudden appearance, let's make sure it doesn't get suddenly removed.
  // Array<any> until we can find some examples of what it actually looks
  // like (#399).
  culturalAssets?: Array<any>;
  timeTakenForQuotes: number; // 26
  timeTakenForNews: number; // 419
  timeTakenForAlgowatchlist: number; // 700
  timeTakenForPredefinedScreener: number; // 400
  timeTakenForCrunchbase: number; // 400
  timeTakenForNav: number; // 400
  timeTakenForResearchReports: number; // 0
  // ALWAYS present, but TEMPORARILY marked optional ("?") since its
  // sudden appearance, let's make sure it doesn't get suddenly removed.
  timeTakenForScreenerField?: number;
  // ALWAYS present, but TEMPORARILY marked optional ("?") since its
  // sudden appearance, let's make sure it doesn't get suddenly removed.
  timeTakenForCulturalAssets?: number;
}

export interface SearchOptions {
  lang?: string;
  region?: string;
  quotesCount?: number;
  newsCount?: number;
  enableFuzzyQuery?: boolean;
  quotesQueryId?: string;
  multiQuoteQueryId?: string;
  newsQueryId?: string;
  enableCb?: boolean;
  enableNavLinks?: boolean;
  enableEnhancedTrivialQuery?: boolean;
}

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  quotesCount: 6,
  newsCount: 4,
  enableFuzzyQuery: false,
  quotesQueryId: "tss_match_phrase_query",
  multiQuoteQueryId: "multi_quote_single_token_query",
  newsQueryId: "news_cie_vespa",
  enableCb: true,
  enableNavLinks: true,
  enableEnhancedTrivialQuery: true,
};

export default function search(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: SearchOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<SearchResult>;

export default function search(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: SearchOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function search(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: SearchOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "search",

    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/search",
      schemaKey: "#/definitions/SearchOptions",
      defaults: queryOptionsDefaults,
      runtime: { q: query },
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/SearchResult",
    },

    moduleOptions,
  });
}
