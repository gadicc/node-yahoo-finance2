import yahooFinanceFetch = require('../lib/yahooFinanceFetch');
import validate from '../lib/validate';

const QUERY_URL = 'https://query2.finance.yahoo.com/v1/finance/search';
const QUERY_SCHEMA_KEY = "#/definitions/SearchResultOrig";

export interface SearchQuoteYahoo {
  exchange: string;        // "NYQ"
  shortname: string;       // "Alibaba Group Holding Limited"
  quoteType: string;       // "EQUITY"     TODO "EQUITY" | ???
  symbol: string;          // "BABA"
  index: string;           // "quotes"
  score: number;           // 1111958.0
  typeDisp: string;        // "Equity"
  longname: string;        // "Alibaba Group Holding Limited"
  isYahooFinance: true;    // true
}
export interface SearchQuoteNonYahoo {
  index: string;           // '78ddc07626ff4bbcae663e88514c23a0'
  name: string;            // 'AAPlasma'
  permalink: string;       // 'aaplasma',
  isYahooFinance: false    // false
}

export interface SearchNewsOrig {
  uuid: string;                 // "9aff624a-e84c-35f3-9c23-db39852006dc"
  title: string;                // "Analyst Report: Alibaba Group Holding Limited"
  publisher: string;            // "Morningstar Research"
  link: string;                 // "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html"
  providerPublishTime: number;  // 1611286342
  type: string;                 // "STORY"    TODO "STORY" | ???
}

export interface SearchNews extends Omit<SearchNewsOrig,'providerPublishTime'> {
  providerPublishTime: Date;    // Date(1611286342 * 1000)
}

export interface SearchResultOrig {
  explains: Array<any>;
  count: number;
  quotes: Array<SearchQuoteYahoo | SearchQuoteNonYahoo>;
  news: Array<SearchNewsOrig>;
  nav: Array<any>;
  lists: Array<any>,
  researchReports: Array<any>,
  totalTime: number;
  timeTakenForQuotes: number;               // 26
  timeTakenForNews: number;                 // 419
  timeTakenForAlgowatchlist: number;        // 700
  timeTakenForPredefinedScreener: number;   // 400
  timeTakenForCrunchbase: number;           // 400
  timeTakenForNav: number;                  // 400
  timeTakenForResearchReports: number;      // 0
}

export interface SearchResult extends Omit<SearchResultOrig,'news'> {
  news: Array<SearchNews>;
}

interface SearchOptions {
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
  lang: 'en-US',
  region: 'US',
  quotesCount: 1,
  newsCount: 0,
  enableFuzzyQuery: false,
  quotesQueryId: 'tss_match_phrase_query',
  multiQuoteQueryId: 'multi_quote_single_token_query',
  newsQueryId: 'news_cie_vespa',
  enableCb: true,
  enableNavLinks: true,
  enableEnhancedTrivialQuery: true
};

async function search(
  query: string,
  queryOptionsOverrides: SearchOptions = {},
  fetchOptions?: object
): Promise<SearchResult> {
  const queryOptions = {
    q: query,
    ...queryOptionsDefaults,
    ...queryOptionsOverrides
  };

  const result = await yahooFinanceFetch(QUERY_URL, queryOptions, fetchOptions);
  validate(result, QUERY_SCHEMA_KEY);

  for (let news of result.news)
    news.providerPublishTime = new Date(news.providerPublishTime * 1000);

  return result;
}

export default search;
