import yahooFinanceFetch = require('./lib/yahooFinanceFetch');
const SEARCH_URL = 'https://query2.finance.yahoo.com/v1/finance/search';

interface YahooFinanceSearchQuote {
  exchange: string;        // "NYQ"
  shortname: string;       // "Alibaba Group Holding Limited"
  quoteType: string;       // "EQUITY"     TODO "EQUITY" | ???
  symbol: string;          // "BABA"
  index: string;           // "quotes"
  score: number;           // 1111958.0
  typeDisp: string;        // "Equity"
  longName: string;        // "Alibaba Group Holding Limited"
  isYahooFinance: boolean; // true
}

interface YahooFinanceSearchNews {
  uuid: string;                 // "9aff624a-e84c-35f3-9c23-db39852006dc"
  title: string;                // "Analyst Report: Alibaba Group Holding Limited"
  publisher: string;            // "Morningstar Research"
  link: string;                 // "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html"
  providerPublishTime: number;  // 1611286342
  type: string;                 // "STORY"    TODO "STORY" | ???
}

interface YahooFinanceSearchResult {
  explains: [];
  count: number;
  quotes: [YahooFinanceSearchQuote];
  news: [YahooFinanceSearchNews];
  nav: [];
  lists: [],
  researchReports: [],
  totalTime: number;
  timeTakenForQuotes: number;               // 26
  timeTakenForNews: number;                 // 419
  timeTakenForAlgowatchlist: number;        // 700
  timeTakenForPredefinedScreener: number;   // 400
  timeTakenForCrunchbase: number;           // 400
  timeTakenForNav: number;                  // 400
  timeTakenForResearchReports: number;      // 0
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
  enableCb: 'true',
  enableNavLinks: 'true',
  enableEnhancedTrivialQuery: 'true'
};

async function yahooFinanceSearch(
  query: string,
  queryOptionsOverrides={},
  fetchOptions
): Promise<YahooFinanceSearchResult> {
  const queryOptions = {
    q: query,
    ...queryOptionsDefaults,
    ...queryOptionsOverrides
  };

  return yahooFinanceFetch(SEARCH_URL, queryOptions, fetchOptions);
}

exports = yahooFinanceSearch;
