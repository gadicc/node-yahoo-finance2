import { StaticDecode, Type } from "@sinclair/typebox";
import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";
import { YahooFinanceDate, YahooNumber } from "../lib/yahooFinanceTypes.js";

const SearchQuoteYahoo = Type.Object(
  {
    symbol: Type.String(), // "BABA"
    isYahooFinance: Type.Literal(true), // true
    exchange: Type.String(), // "NYQ"
    exchDisp: Type.Optional(Type.String()), // "London", e.g. with BJ0CDD2
    shortname: Type.Optional(Type.String()), // "Alibaba Group Holding Limited"
    longname: Type.Optional(Type.String()), // "Alibaba Group Holding Limited"
    index: Type.Literal("quotes"), // "quotes"
    score: YahooNumber, // 1111958.0
    newListingDate: Type.Optional(YahooFinanceDate), // "2021-02-16"
    prevName: Type.Optional(Type.String()),
    nameChangeDate: Type.Optional(YahooFinanceDate),
    sector: Type.Optional(Type.String()), // "Industrials"
    industry: Type.Optional(Type.String()), // "Building Products & Equipment"
    dispSecIndFlag: Type.Optional(Type.Boolean()), // true
  },
  {
    additionalProperties: Type.Any(),
  },
);

const SearchQuoteYahooEquity = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("EQUITY"),
      typeDisp: Type.Literal("Equity"),
    }),
  ],
  {
    title: "SearchQuoteYahooEntity",
  },
);

const SearchQuoteYahooOption = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("OPTION"),
      typeDisp: Type.Literal("Option"),
    }),
  ],
  {
    title: "SearchQuoteYahooOption",
  },
);

const SearchQuoteYahooETF = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("ETF"),
      typeDisp: Type.Literal("ETF"),
    }),
  ],
  {
    title: "SearchQuoteYahooETF",
  },
);

const SearchQuoteYahooFund = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("MUTUALFUND"),
      typeDisp: Type.Literal("Fund"),
    }),
  ],
  {
    title: "SearchQuoteYahooFund",
  },
);

const SearchQuoteYahooIndex = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("INDEX"),
      typeDisp: Type.Literal("Index"),
    }),
  ],
  {
    title: "SearchQuoteYahooIndex",
  },
);

const SearchQuoteYahooCurrency = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("CURRENCY"),
      typeDisp: Type.Literal("Currency"),
    }),
  ],
  {
    title: "SearchQuoteYahooCurrency",
  },
);

const SearchQuoteYahooCryptocurrency = Type.Composite([
  SearchQuoteYahoo,
  Type.Object({
    quoteType: Type.Literal("CRYPTOCURRENCY"),
    typeDisp: Type.Literal("Cryptocurrency"),
  }),
]);

const SearchQuoteYahooFuture = Type.Composite(
  [
    SearchQuoteYahoo,
    Type.Object({
      quoteType: Type.Literal("FUTURE"),
      typeDisp: Type.Union([Type.Literal("Future"), Type.Literal("Futures")]),
    }),
  ],
  {
    title: "SearchQuoteYahooFuture",
  },
);

const SearchQuoteNonYahoo = Type.Object(
  {
    index: Type.String(), // '78ddc07626ff4bbcae663e88514c23a0'
    name: Type.String(), // 'AAPlasma'
    permalink: Type.String(), // 'aaplasma'
    isYahooFinance: Type.Literal(false), // false
  },
  {
    additionalProperties: Type.Any(),
    title: "SearchQuoteNonYahoo",
  },
);

const SearchNewsThumbnailResolution = Type.Object(
  {
    url: Type.String(),
    width: YahooNumber,
    height: YahooNumber,
    tag: Type.String(),
  },
  {
    title: "SearchNewsThumbnailResolution",
  },
);

const SearchNews = Type.Object(
  {
    uuid: Type.String(), // "9aff624a-e84c-35f3-9c23-db39852006dc"
    title: Type.String(), // "Analyst Report: Alibaba Group Holding Limited"
    publisher: Type.String(), // "Morningstar Research"
    link: Type.String(), // "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html"
    providerPublishTime: YahooFinanceDate, // coerced to New Date(1611285342 * 1000)
    type: Type.String(), // "STORY"   TODO "STORY" | ???
    thumbnail: Type.Optional(
      Type.Object({
        resolutions: Type.Array(SearchNewsThumbnailResolution),
      }),
    ),
    relatedTickers: Type.Optional(Type.Array(Type.String())), // [ "AAPL" ]
  },
  {
    additionalProperties: Type.Any(),
    title: "SearchNews",
  },
);

export type SearchResult = StaticDecode<typeof SearchResultSchema>;
const SearchResultSchema = Type.Object(
  {
    explains: Type.Array(Type.Any()),
    count: YahooNumber,
    quotes: Type.Array(
      Type.Union([
        SearchQuoteYahooEquity,
        SearchQuoteYahooOption,
        SearchQuoteYahooETF,
        SearchQuoteYahooFund,
        SearchQuoteYahooIndex,
        SearchQuoteYahooCurrency,
        SearchQuoteYahooCryptocurrency,
        SearchQuoteNonYahoo,
        SearchQuoteYahooFuture,
      ]),
    ),
    news: Type.Array(SearchNews),
    nav: Type.Array(Type.Any()),
    lists: Type.Array(Type.Any()),
    researchReports: Type.Array(Type.Any()),
    totalTime: YahooNumber,
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    // Array<any> until we can find some examples of what it actually looks
    // like (#255).
    screenerFieldResults: Type.Optional(Type.Array(Type.Any())),
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    // Array<any> until we can find some examples of what it actually looks
    // like (#399).
    culturalAssets: Type.Optional(Type.Array(Type.Any())),
    timeTakenForQuotes: YahooNumber, // 26
    timeTakenForNews: YahooNumber, // 419
    timeTakenForAlgowatchlist: YahooNumber, // 700
    timeTakenForPredefinedScreener: YahooNumber, // 400
    timeTakenForCrunchbase: YahooNumber, // 400
    timeTakenForNav: YahooNumber, // 400
    timeTakenForResearchReports: YahooNumber, // 0
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    timeTakenForScreenerField: Type.Optional(YahooNumber),
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    timeTakenForCulturalAssets: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "SearchResults",
  },
);

const SearchOptionsSchema = Type.Object(
  {
    lang: Type.Optional(Type.String()),
    region: Type.Optional(Type.String()),
    quotesCount: Type.Optional(YahooNumber),
    newsCount: Type.Optional(YahooNumber),
    enableFuzzyQuery: Type.Optional(Type.Boolean()),
    quotesQueryId: Type.Optional(Type.String()),
    multiQuoteQueryId: Type.Optional(Type.String()),
    newsQueryId: Type.Optional(Type.String()),
    enableCb: Type.Optional(Type.Boolean()),
    enableNavLinks: Type.Optional(Type.Boolean()),
    enableEnhancedTrivialQuery: Type.Optional(Type.Boolean()),
  },
  {
    title: "SearchOptions",
    additionalProperties: false,
  },
);

export type SearchOptions = StaticDecode<typeof SearchOptionsSchema>;

const queryOptionsDefaults: SearchOptions = {
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
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<SearchResult>;

export default function search(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: SearchOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function search(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: SearchOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "searchTypebox",

    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/search",
      schema: SearchOptionsSchema,
      defaults: queryOptionsDefaults,
      runtime: { q: query },
      overrides: queryOptionsOverrides,
      needsCrumb: false,
    },

    result: {
      schema: SearchResultSchema,
    },

    moduleOptions,
  });
}
