/*
https://query2.finance.yahoo.com/v1/finance/search?q=BP41ZD1&lang=en-US&region=US&quotesCount=6&newsCount=4&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true

{
    "explains": [],
    "count": 5,
    "quotes": [{
        "exchange": "NYQ",
        "shortname": "Alibaba Group Holding Limited",
        "quoteType": "EQUITY",
        "symbol": "BABA",
        "index": "quotes",
        "score": 1111958.0,
        "typeDisp": "Equity",
        "longname": "Alibaba Group Holding Limited",
        "isYahooFinance": true
    }],
    "news": [{
        "uuid": "67922875-4b6f-30c1-8737-18c39d392e41",
        "title": "Where Will Alibaba Be in 1 Year?",
        "publisher": "Motley Fool",
        "link": "https://finance.yahoo.com/m/67922875-4b6f-30c1-8737-18c39d392e41/where-will-alibaba-be-in-1.html",
        "providerPublishTime": 1611324000,
        "type": "STORY"
    }, {
        "uuid": "59d0f410-5735-39bb-9433-0ce4738c9b22",
        "title": "Alibaba-Backed Ant Group's Valuation Estimated To Drop To $108B",
        "publisher": "Benzinga",
        "link": "https://finance.yahoo.com/news/alibaba-backed-ant-groups-valuation-063243747.html",
        "providerPublishTime": 1611297163,
        "type": "STORY"
    }, {
        "uuid": "9aff624a-e84c-35f3-9c23-db39852006dc",
        "title": "Analyst Report: Alibaba Group Holding Limited",
        "publisher": "Morningstar Research",
        "link": "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html",
        "providerPublishTime": 1611286342,
        "type": "STORY"
    }, {
        "uuid": "6b9d58a6-0efe-3fd9-8c23-fbad2ba4c476",
        "title": "Top Analyst Reports for Alibaba, Procter & Gamble & Wells Fargo",
        "publisher": "Zacks",
        "link": "https://finance.yahoo.com/news/top-analyst-reports-alibaba-procter-213609987.html",
        "providerPublishTime": 1611264969,
        "type": "STORY"
    }],
    "nav": [],
    "lists": [],
    "researchReports": [],
    "totalTime": 26,
    "timeTakenForQuotes": 419,
    "timeTakenForNews": 700,
    "timeTakenForAlgowatchlist": 400,
    "timeTakenForPredefinedScreener": 400,
    "timeTakenForCrunchbase": 400,
    "timeTakenForNav": 400,
    "timeTakenForResearchReports": 0
}

 */

const yahooFinanceFetch = require('./lib/yahooFinanceFetch');
const SEARCH_URL = 'https://query2.finance.yahoo.com/v1/finance/search';

const optsDefaults = {
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

async function yahooFinanceSearch(query, opts={}) {
  const finalOpts = {
    q: query,
    ...optsDefaults,
    ...opts
  };

  return yahooFinanceFetch(SEARCH_URL, finalOpts);
}

module.exports = yahooFinanceSearch;
