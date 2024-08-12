import { Type } from "@sinclair/typebox";
import {
  NullableYahooFinanceDate,
  NullableYahooNumber,
  YahooFinanceDate,
  YahooNumber,
} from "../lib/yahooFinanceTypes.js";

/*
 * To generate the initial file, we took the output of all submodules for
 * 'AAPL', 'OCDO.L', '0700.HK' and '^IXIC' and ran the results through
 * the awesome https://app.quicktype.io/
 * and then the smashing https://sinclairzx81.github.io/typebox-workbench
 *
 * Manual cleanup afterwards:
 *
 *  1) Spaces: 4 to 2
 *  ~~2) Wrapped in a module~~ <--- undid this after tooling issues.
 *  3) Alphabeticalize QuoteSummaryResult
 */

enum EnumGrade {
  Accumulate = "Accumulate",
  Add = "Add",
  Average = "Average",
  BelowAverage = "Below Average",
  Buy = "Buy",
  ConvictionBuy = "Conviction Buy",
  Empty = "",
  EqualWeight = "Equal-Weight",
  FairValue = "Fair Value",
  GradeEqualWeight = "Equal-weight",
  GradeLongTermBuy = "Long-term Buy",
  Hold = "Hold",
  LongTermBuy = "Long-Term Buy",
  MarketOutperform = "Market Outperform",
  MarketPerform = "Market Perform",
  Mixed = "Mixed",
  Negative = "Negative",
  Neutral = "Neutral",
  InLine = "In-Line",
  Outperform = "Outperform",
  Overweight = "Overweight",
  PeerPerform = "Peer Perform",
  Perform = "Perform",
  Positive = "Positive",
  Reduce = "Reduce",
  SectorOutperform = "Sector Outperform",
  SectorPerform = "Sector Perform",
  SectorWeight = "Sector Weight",
  Sell = "Sell",
  StrongBuy = "Strong Buy",
  TopPick = "Top Pick",
  Underperform = "Underperform",
  Underperformer = "Underperformer",
  Underweight = "Underweight",
  Trim = "Trim",
  AboveAverage = "Above Average",
  Inline = "In-line",
  Outperformer = "Outperformer",
  OVerweight = "OVerweight",
  Cautious = "Cautious",
  MarketWeight = "Market Weight",
  SectorUnderperform = "Sector Underperform",
  MarketUnderperform = "Market Underperform",
  Peerperform = "Peer perform",
  GraduallyAccumulate = "Gradually Accumulate",
  ActionListBuy = "Action List Buy",
  Performer = "Performer",
  SectorPerformer = "Sector Performer",
  SpeculativeBuy = "Speculative Buy",
  StrongSell = "Strong Sell",
  SpeculativeHold = "Speculative Hold",
  NotRated = "Not Rated",
  HoldNeutral = "Hold Neutral",
  Developing = "Developing",
  buy = "buy",
  HOld = "HOld", // Not a typo, how it was returned from API
  TradingSell = "Trading Sell",
  Tender = "Tender",
  marketperform = "market perform",
  BUy = "BUy", // Not a typo, how it was returned from API
}

enum Action {
  Down = "down",
  Init = "init",
  Main = "main",
  Reit = "reit",
  Up = "up",
}

const Grade = Type.Enum(EnumGrade, { title: "QuoteSummaryEnumGrade" });
const ActionSchema = Type.Enum(Action, { title: "QuoteSummaryAction" });

const UpgradeDowngradeHistoryHistory = Type.Object(
  {
    epochGradeDate: YahooFinanceDate,
    firm: Type.String(),
    toGrade: Grade,
    fromGrade: Type.Optional(Grade),
    action: ActionSchema,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistoryHistory",
  }
);

const UpgradeDowngradeHistory = Type.Object(
  {
    history: Type.Array(UpgradeDowngradeHistoryHistory),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistory",
  }
);

const TopHoldingsSectorWeighting = Type.Object(
  {
    realestate: Type.Optional(YahooNumber),
    consumer_cyclical: Type.Optional(YahooNumber),
    basic_materials: Type.Optional(YahooNumber),
    consumer_defensive: Type.Optional(YahooNumber),
    technology: Type.Optional(YahooNumber),
    communication_services: Type.Optional(YahooNumber),
    financial_services: Type.Optional(YahooNumber),
    utilities: Type.Optional(YahooNumber),
    industrials: Type.Optional(YahooNumber),
    energy: Type.Optional(YahooNumber),
    healthcare: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsSectorWeighting",
  }
);

const TopHoldingsBondRating = Type.Object(
  {
    a: Type.Optional(YahooNumber),
    aa: Type.Optional(YahooNumber),
    aaa: Type.Optional(YahooNumber),
    other: Type.Optional(YahooNumber),
    b: Type.Optional(YahooNumber),
    bb: Type.Optional(YahooNumber),
    bbb: Type.Optional(YahooNumber),
    below_b: Type.Optional(YahooNumber),
    us_government: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsBondRating",
  }
);

const TopHoldingsEquityHoldings = Type.Object(
  {
    medianMarketCap: Type.Optional(YahooNumber),
    medianMarketCapCat: Type.Optional(YahooNumber),
    priceToBook: YahooNumber,
    priceToBookCat: Type.Optional(YahooNumber),
    priceToCashflow: YahooNumber,
    priceToCashflowCat: Type.Optional(YahooNumber),
    priceToEarnings: YahooNumber,
    priceToEarningsCat: Type.Optional(YahooNumber),
    priceToSales: YahooNumber,
    priceToSalesCat: Type.Optional(YahooNumber),
    threeYearEarningsGrowth: Type.Optional(YahooNumber),
    threeYearEarningsGrowthCat: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsEquityHoldings",
  }
);

const TopHoldingsHolding = Type.Object(
  {
    symbol: Type.String(),
    holdingName: Type.String(),
    holdingPercent: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsHolding",
  }
);

const TopHoldings = Type.Object(
  {
    maxAge: YahooNumber,
    stockPosition: Type.Optional(YahooNumber),
    bondPosition: Type.Optional(YahooNumber),
    holdings: Type.Array(TopHoldingsHolding),
    equityHoldings: TopHoldingsEquityHoldings,
    bondHoldings: Type.Object({}),
    bondRatings: Type.Array(TopHoldingsBondRating),
    sectorWeightings: Type.Array(TopHoldingsSectorWeighting),
    cashPosition: Type.Optional(YahooNumber),
    otherPosition: Type.Optional(YahooNumber),
    preferredPosition: Type.Optional(YahooNumber),
    convertiblePosition: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldings",
  }
);

const SummaryProfile = Type.Object(
  {
    address1: Type.Optional(Type.String()),
    address2: Type.Optional(Type.String()),
    address3: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    zip: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    fax: Type.Optional(Type.String()),
    website: Type.Optional(Type.String()),
    industry: Type.Optional(Type.String()),
    industryDisp: Type.Optional(Type.String()),
    sector: Type.Optional(Type.String()),
    sectorDisp: Type.Optional(Type.String()),
    longBusinessSummary: Type.Optional(Type.String()),
    fullTimeEmployees: Type.Optional(YahooNumber),
    companyOfficers: Type.Array(Type.Any()),
    maxAge: YahooNumber,
    twitter: Type.Optional(Type.String()), // in e.g. "ADA-USD" (#418)

    // seems like for cryptocurency only
    // TODO: how does this relate to Quote type.  Common base?

    name: Type.Optional(Type.String()), // 'Bitcoin'
    startDate: Type.Optional(YahooFinanceDate), // new Date('2013-04-28')
    description: Type.Optional(Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySummaryProfile",
  }
);

const SummaryDetail = Type.Object(
  {
    maxAge: YahooNumber,
    priceHint: YahooNumber,
    previousClose: Type.Optional(YahooNumber), // missing in e.g. "APS.AX"
    open: Type.Optional(YahooNumber),
    dayLow: Type.Optional(YahooNumber),
    dayHigh: Type.Optional(YahooNumber),
    regularMarketPreviousClose: Type.Optional(YahooNumber), // missing in e.g. "APS.AX"
    regularMarketOpen: Type.Optional(YahooNumber),
    regularMarketDayLow: Type.Optional(YahooNumber),
    regularMarketDayHigh: Type.Optional(YahooNumber),
    regularMarketVolume: Type.Optional(YahooNumber),
    dividendRate: Type.Optional(YahooNumber),
    dividendYield: Type.Optional(YahooNumber),
    exDividendDate: Type.Optional(YahooFinanceDate),
    payoutRatio: Type.Optional(YahooNumber),
    fiveYearAvgDividendYield: Type.Optional(YahooNumber),
    beta: Type.Optional(YahooNumber),
    trailingPE: Type.Optional(YahooNumber),
    forwardPE: Type.Optional(YahooNumber),
    volume: Type.Optional(YahooNumber),
    averageVolume: Type.Optional(YahooNumber),
    averageVolume10days: Type.Optional(YahooNumber),
    averageDailyVolume10Day: Type.Optional(YahooNumber),
    bid: Type.Optional(YahooNumber),
    ask: Type.Optional(YahooNumber),
    bidSize: Type.Optional(YahooNumber),
    askSize: Type.Optional(YahooNumber),
    marketCap: Type.Optional(YahooNumber),
    fiftyDayAverage: Type.Optional(YahooNumber),
    fiftyTwoWeekLow: Type.Optional(YahooNumber),
    fiftyTwoWeekHigh: Type.Optional(YahooNumber),
    twoHundredDayAverage: Type.Optional(YahooNumber),
    priceToSalesTrailing12Months: Type.Optional(YahooNumber),
    trailingAnnualDividendRate: Type.Optional(YahooNumber),
    trailingAnnualDividendYield: Type.Optional(YahooNumber),
    currency: Type.String(),
    algorithm: Type.Null(),
    tradeable: Type.Boolean(),
    yield: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    navPrice: Type.Optional(YahooNumber),
    ytdReturn: Type.Optional(YahooNumber),

    // crypto only (optional, or null in other types)
    // TODO: how does Price / SummaryDetail compare? common base?

    fromCurrency: Type.Union([Type.String(), Type.Null()]), // 'BTC'
    toCurrency: Type.Optional(Type.Union([Type.String(), Type.Null()])), // 'USD-X'
    lastMarket: Type.Union([Type.String(), Type.Null()]), // 'CoinMarketCap'
    volume24Hr: Type.Optional(YahooNumber), // 62650314752
    volumeAllCurrencies: Type.Optional(YahooNumber), // 62650314752
    circulatingSupply: Type.Optional(YahooNumber), // 18638932
    startDate: Type.Optional(YahooFinanceDate), // new Date(1367107200 * 1000)
    coinMarketCapLink: Type.Optional(Type.Union([Type.String(), Type.Null()])), // "https://coinmarketcap.com/currencies/cardano"

    // futures
    expireDate: Type.Optional(YahooFinanceDate), // 1656374400,
    openInterest: Type.Optional(YahooNumber), // 444411,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySummaryDetail",
  }
);

// May consider switching this to string, as we keep finding more and more.
const FilingType = Type.Union(
  [
    Type.Literal("10-K"),
    Type.Literal("10-Q"),
    Type.Literal("8-K"),
    Type.Literal("8-K/A"),
    Type.Literal("10-K/A"),
    Type.Literal("10-Q/A"),
    Type.Literal("SD"),
    Type.Literal("PX14A6G"),
    Type.Literal("SC 13G/A"),
    Type.Literal("DEFA14A"),
    Type.Literal("25-NSE"),
    Type.Literal("S-8 POS"),
    Type.Literal("6-K"),
    Type.Literal("F-3ASR"),
    Type.Literal("SC 13D/A"),
    Type.Literal("20-F"),
    Type.Literal("425"),
    Type.Literal("SC14D9C"),
    Type.Literal("SC 13G"),
    Type.Literal("S-8"),
    Type.Literal("DEF 14A"),
    Type.Literal("F-10"),
  ],
  {
    title: "QuoteSummaryFilingType",
  }
);

const Filing = Type.Object(
  {
    date: Type.String(),
    epochDate: YahooFinanceDate,
    type: FilingType,
    title: Type.String(),
    edgarUrl: Type.String(),
    maxAge: YahooNumber,
    url: Type.Optional(Type.String()),
    exhibits: Type.Optional(
      Type.Array(
        Type.Object({
          type: Type.String(),
          url: Type.String(),
          downloadUrl: Type.Optional(Type.String()),
        })
      )
    ),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFiling",
  }
);

const SECFilings = Type.Object(
  {
    filings: Type.Array(Filing),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySECFilings",
  }
);

const RecommendationTrendTrend = Type.Object(
  {
    period: Type.String(),
    strongBuy: YahooNumber,
    buy: YahooNumber,
    hold: YahooNumber,
    sell: YahooNumber,
    strongSell: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRecommendationTrendTrend",
  }
);

const RecommendationTrend = Type.Object(
  {
    trend: Type.Array(RecommendationTrendTrend),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRecommendationTrend",
  }
);

const QuoteType = Type.Object(
  {
    exchange: Type.String(),
    quoteType: Type.String(),
    symbol: Type.String(),
    underlyingSymbol: Type.String(),
    shortName: Type.Union([Type.Null(), Type.String()]),
    longName: Type.Union([Type.Null(), Type.String()]),
    firstTradeDateEpochUtc: NullableYahooFinanceDate,
    timeZoneFullName: Type.String(),
    timeZoneShortName: Type.String(),
    uuid: Type.String(),
    messageBoardId: Type.Optional(Type.Union([Type.Null(), Type.String()])),
    gmtOffSetMilliseconds: YahooNumber,
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryQuoteType",
  }
);

const Price = Type.Object(
  {
    averageDailyVolume10Day: Type.Optional(YahooNumber),
    averageDailyVolume3Month: Type.Optional(YahooNumber),
    exchange: Type.Optional(Type.String()),
    exchangeName: Type.Optional(Type.String()),
    exchangeDataDelayedBy: Type.Optional(YahooNumber),
    maxAge: YahooNumber,
    postMarketChangePercent: Type.Optional(YahooNumber),
    postMarketChange: Type.Optional(YahooNumber),
    postMarketTime: Type.Optional(YahooFinanceDate),
    postMarketPrice: Type.Optional(YahooNumber),
    postMarketSource: Type.Optional(Type.String()),
    preMarketChangePercent: Type.Optional(YahooNumber),
    preMarketChange: Type.Optional(YahooNumber),
    preMarketTime: Type.Optional(YahooFinanceDate),
    preMarketPrice: Type.Optional(YahooNumber),
    preMarketSource: Type.Optional(Type.String()),
    priceHint: YahooNumber,
    regularMarketChangePercent: Type.Optional(YahooNumber),
    regularMarketChange: Type.Optional(YahooNumber),
    regularMarketTime: Type.Optional(YahooFinanceDate),
    regularMarketPrice: Type.Optional(YahooNumber),
    regularMarketDayHigh: Type.Optional(YahooNumber),
    regularMarketDayLow: Type.Optional(YahooNumber),
    regularMarketVolume: Type.Optional(YahooNumber),
    regularMarketPreviousClose: Type.Optional(YahooNumber),
    regularMarketSource: Type.Optional(Type.String()),
    regularMarketOpen: Type.Optional(YahooNumber),
    quoteSourceName: Type.Optional(Type.String()),
    quoteType: Type.String(),
    symbol: Type.String(),
    underlyingSymbol: Type.Union([Type.Null(), Type.String()]),
    shortName: Type.Union([Type.Null(), Type.String()]),
    longName: Type.Union([Type.Null(), Type.String()]),
    lastMarket: Type.Union([Type.Null(), Type.String()]),
    marketState: Type.Optional(Type.String()),
    marketCap: Type.Optional(YahooNumber),
    currency: Type.Optional(Type.String()),
    currencySymbol: Type.Optional(Type.String()),
    fromCurrency: Type.Union([Type.String(), Type.Null()]),
    toCurrency: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    volume24Hr: Type.Optional(YahooNumber),
    volumeAllCurrencies: Type.Optional(YahooNumber),
    circulatingSupply: Type.Optional(YahooNumber),
    expireDate: Type.Optional(YahooFinanceDate),
    openInterest: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryPrice",
  }
);

const NetSharePurchaseActivity = Type.Object(
  {
    maxAge: YahooNumber,
    period: Type.String(),
    buyInfoCount: YahooNumber,
    buyInfoShares: YahooNumber,
    buyPercentInsiderShares: Type.Optional(YahooNumber),
    sellInfoCount: YahooNumber,
    sellInfoShares: Type.Optional(YahooNumber),
    sellPercentInsiderShares: Type.Optional(YahooNumber),
    netInfoCount: YahooNumber,
    netInfoShares: YahooNumber,
    netPercentInsiderShares: Type.Optional(YahooNumber),
    totalInsiderShares: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryNetSharePurchaseActivity",
  }
);

const MajorHoldersBreakdown = Type.Object(
  {
    maxAge: YahooNumber,
    insidersPercentHeld: Type.Optional(YahooNumber),
    institutionsPercentHeld: Type.Optional(YahooNumber),
    institutionsFloatPercentHeld: Type.Optional(YahooNumber),
    institutionsCount: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryMajorHoldersBreakdown",
  }
);

enum EnumOwnership {
  D = "D",
  I = "I",
}

enum EnumRelation {
  ChairmanOfTheBoard = "Chairman of the Board",
  ChiefExecutiveOfficer = "Chief Executive Officer",
  ChiefFinancialOfficer = "Chief Financial Officer",
  ChiefOperatingOfficer = "Chief Operating Officer",
  ChiefTechnologyOfficer = "Chief Technology Officer",
  Director = "Director",
  DirectorIndependent = "Director (Independent)",
  Empty = "",
  GeneralCounsel = "General Counsel",
  IndependentNonExecutiveDirector = "Independent Non-Executive Director",
  Officer = "Officer",
  President = "President",
}

const Relation = Type.Enum(EnumRelation, { title: "QuoteSummaryRelation" });

const OwnershipSchema = Type.Enum(EnumOwnership, {
  title: "QuoteSummaryOwnership",
});

const Transaction = Type.Object(
  {
    maxAge: YahooNumber,
    shares: YahooNumber,
    filerUrl: Type.String(),
    transactionText: Type.String(),
    filerName: Type.String(),
    filerRelation: Type.Union([Relation, Type.String()]),
    moneyText: Type.String(),
    startDate: YahooFinanceDate,
    ownership: Type.Union([OwnershipSchema, Type.String()]),
    value: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTransaction",
  }
);

const InsiderTransactions = Type.Object(
  {
    transactions: Type.Array(Transaction),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryInsiderTransactions",
  }
);

const Holder = Type.Object(
  {
    maxAge: YahooNumber,
    name: Type.String(),
    relation: Type.Union([Relation, Type.String()]),
    url: Type.String(),
    transactionDescription: Type.String(),
    latestTransDate: YahooFinanceDate,
    positionDirect: Type.Optional(YahooNumber),
    positionDirectDate: Type.Optional(YahooFinanceDate),
    positionIndirect: Type.Optional(YahooNumber),
    positionIndirectDate: Type.Optional(YahooFinanceDate),
    positionSummaryDate: Type.Optional(YahooFinanceDate),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryHolder",
  }
);

const Holders = Type.Object(
  {
    holders: Type.Array(Holder),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryHolders",
  }
);

const Trend = Type.Object(
  {
    maxAge: YahooNumber,
    symbol: Type.Null(),
    estimates: Type.Array(Type.Any()),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTrend",
  }
);

const Estimate = Type.Object(
  {
    period: Type.String(),
    growth: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEstimate",
  }
);

const IndexTrend = Type.Object(
  {
    maxAge: YahooNumber,
    symbol: Type.String(),
    peRatio: YahooNumber,
    pegRatio: YahooNumber,
    estimates: Type.Array(Estimate),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIndexTrend",
  }
);

const IncomeStatementHistoryElement = Type.Object(
  {
    maxAge: NullableYahooNumber,
    endDate: YahooFinanceDate,
    totalRevenue: NullableYahooNumber,
    costOfRevenue: NullableYahooNumber,
    grossProfit: NullableYahooNumber,
    researchDevelopment: NullableYahooNumber,
    sellingGeneralAdministrative: NullableYahooNumber,
    nonRecurring: NullableYahooNumber,
    otherOperatingExpenses: NullableYahooNumber,
    totalOperatingExpenses: NullableYahooNumber,
    operatingIncome: NullableYahooNumber,
    totalOtherIncomeExpenseNet: NullableYahooNumber,
    ebit: NullableYahooNumber,
    interestExpense: NullableYahooNumber,
    incomeBeforeTax: NullableYahooNumber,
    incomeTaxExpense: NullableYahooNumber,
    minorityInterest: NullableYahooNumber,
    netIncomeFromContinuingOps: NullableYahooNumber,
    discontinuedOperations: NullableYahooNumber,
    extraordinaryItems: NullableYahooNumber,
    effectOfAccountingCharges: NullableYahooNumber,
    otherItems: NullableYahooNumber,
    netIncome: NullableYahooNumber,
    netIncomeApplicableToCommonShares: NullableYahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIncomeStatementHistoryElement",
  }
);

const IncomeStatementHistory = Type.Object(
  {
    incomeStatementHistory: Type.Array(IncomeStatementHistoryElement),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIncomeStatementHistory",
  }
);

const FundProfileBrokerage = Type.Object(
  {},
  {
    title: "QuoteSummaryFundProfileBrokerage",
  }
);

const FundProfileFeesExpensesInvestment = Type.Object(
  {
    annualHoldingsTurnover: Type.Optional(YahooNumber),
    annualReportExpenseRatio: Type.Optional(YahooNumber),
    grossExpRatio: Type.Optional(YahooNumber),
    netExpRatio: Type.Optional(YahooNumber),
    projectionValues: Type.Object({}),
    totalNetAssets: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfileFeesExpensesInvestment",
  }
);

const FundProfileFeesExpensesInvestmentCat = Type.Composite(
  [
    Type.Omit(FundProfileFeesExpensesInvestment, ["projectionValues"]),
    Type.Object({
      projectionValuesCat: Type.Object({}),
    }),
  ],
  {
    title: "QuoteSummaryFundProfileFeesExpensesInvestmentCat",
    additionalProperties: Type.Any(),
  }
);

const FundProfileManagementInfo = Type.Object(
  {
    managerName: Type.Union([Type.Null(), Type.String()]),
    managerBio: Type.Union([Type.Null(), Type.String()]),
    startdate: Type.Optional(YahooFinanceDate),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfileManagementInfo",
  }
);

const FundProfile = Type.Object(
  {
    maxAge: YahooNumber,
    styleBoxUrl: Type.Optional(Type.Union([Type.Null(), Type.String()])),
    family: Type.Union([Type.Null(), Type.String()]),
    categoryName: Type.Union([Type.Null(), Type.String()]),
    legalType: Type.Union([Type.Null(), Type.String()]),
    managementInfo: Type.Optional(FundProfileManagementInfo),
    feesExpensesInvestment: Type.Optional(FundProfileFeesExpensesInvestment),
    feesExpensesInvestmentCat: Type.Optional(
      FundProfileFeesExpensesInvestmentCat
    ),
    brokerages: Type.Optional(Type.Array(FundProfileBrokerage)),
    initInvestment: Type.Optional(YahooNumber),
    initIraInvestment: Type.Optional(YahooNumber),
    initAipInvestment: Type.Optional(YahooNumber),
    subseqInvestment: Type.Optional(YahooNumber),
    subseqIraInvestment: Type.Optional(YahooNumber),
    subseqAipInvestment: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfile",
  }
);

const FundPerformanceRiskOverviewStatsRow = Type.Object(
  {
    year: Type.String(), // "5y" | "3y" | "10y" | anything else?
    alpha: YahooNumber, // 7.76
    beta: YahooNumber, // 1.04
    meanAnnualReturn: YahooNumber, // 2.05
    rSquared: YahooNumber, // 84.03
    stdDev: Type.Optional(YahooNumber), // 17.12
    sharpeRatio: YahooNumber, // 1.37
    treynorRatio: YahooNumber, // 23.61
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsRow",
  }
);

const FundPerformanceRiskOverviewStatsCat = Type.Object(
  {
    riskStatisticsCat: Type.Array(FundPerformanceRiskOverviewStatsRow),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsCat",
  }
);

const FundPerformanceRiskOverviewStats = Type.Object(
  {
    riskStatistics: Type.Array(FundPerformanceRiskOverviewStatsRow),
    riskRating: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStats",
  }
);

const FundPerformanceReturnsRow = Type.Object(
  {
    year: YahooFinanceDate,
    annualValue: Type.Optional(YahooNumber),
    q1: Type.Optional(YahooNumber),
    q2: Type.Optional(YahooNumber),
    q3: Type.Optional(YahooNumber),
    q4: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceReturnsRow",
  }
);

const FundPerformanceReturns = Type.Object(
  {
    returns: Type.Array(FundPerformanceReturnsRow),
    returnsCat: Type.Optional(Type.Array(FundPerformanceReturnsRow)),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceReturns",
  }
);

const FundPerformancePerformanceOverviewCat = Type.Object(
  {
    ytdReturnPct: Type.Optional(YahooNumber),
    fiveYrAvgReturnPct: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverviewCat",
  }
);

const FundPerformancePerformanceOverview = Type.Object(
  {
    asOfDate: Type.Optional(YahooFinanceDate),
    ytdReturnPct: Type.Optional(YahooNumber),
    oneYearTotalReturn: Type.Optional(YahooNumber),
    threeYearTotalReturn: Type.Optional(YahooNumber),
    fiveYrAvgReturnPct: Type.Optional(YahooNumber),
    morningStarReturnRating: Type.Optional(YahooNumber),
    numYearsUp: Type.Optional(YahooNumber),
    numYearsDown: Type.Optional(YahooNumber),
    bestOneYrTotalReturn: Type.Optional(YahooNumber),
    worstOneYrTotalReturn: Type.Optional(YahooNumber),
    bestThreeYrTotalReturn: Type.Optional(YahooNumber),
    worstThreeYrTotalReturn: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverview",
  }
);

const PeriodRange = Type.Object(
  {
    asOfDate: Type.Optional(YahooFinanceDate),
    ytd: Type.Optional(YahooNumber),
    oneMonth: Type.Optional(YahooNumber),
    threeMonth: Type.Optional(YahooNumber),
    oneYear: Type.Optional(YahooNumber),
    threeYear: Type.Optional(YahooNumber),
    fiveYear: Type.Optional(YahooNumber),
    tenYear: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryPeriodRange",
  }
);

const FundPerformanceTrailingReturns = Type.Composite(
  [
    PeriodRange,
    Type.Object(
      {
        lastBullMkt: Type.Optional(YahooNumber),
        lastBearMkt: Type.Optional(YahooNumber),
      },
      {
        additionalProperties: Type.Any(),
      }
    ),
  ],
  {
    title: "QuoteSummaryFundPerformanceTrailingReturns",
  }
);

const FundPerformance = Type.Object(
  {
    maxAge: YahooNumber,
    loadAdjustedReturns: Type.Optional(PeriodRange),
    rankInCategory: Type.Optional(PeriodRange),
    performanceOverview: FundPerformancePerformanceOverview,
    performanceOverviewCat: FundPerformancePerformanceOverviewCat,
    trailingReturns: FundPerformanceTrailingReturns,
    trailingReturnsNav: FundPerformanceTrailingReturns,
    trailingReturnsCat: FundPerformanceTrailingReturns,
    annualTotalReturns: FundPerformanceReturns,
    pastQuarterlyReturns: FundPerformanceReturns,
    riskOverviewStatistics: FundPerformanceRiskOverviewStats,
    riskOverviewStatisticsCat: FundPerformanceRiskOverviewStatsCat,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformance",
  }
);

const OwnershipList = Type.Object(
  {
    maxAge: YahooNumber,
    reportDate: YahooFinanceDate,
    organization: Type.String(),
    pctHeld: YahooNumber,
    position: YahooNumber,
    value: YahooNumber,
    pctChange: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryOwnershipList",
  }
);

const Ownership = Type.Object(
  {
    maxAge: YahooNumber,
    ownershipList: Type.Array(OwnershipList),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryOwnership",
  }
);

const FinancialData = Type.Object(
  {
    maxAge: YahooNumber,
    currentPrice: Type.Optional(YahooNumber),
    targetHighPrice: Type.Optional(YahooNumber),
    targetLowPrice: Type.Optional(YahooNumber),
    targetMeanPrice: Type.Optional(YahooNumber),
    targetMedianPrice: Type.Optional(YahooNumber),
    recommendationMean: Type.Optional(YahooNumber),
    recommendationKey: Type.String(),
    numberOfAnalystOpinions: Type.Optional(YahooNumber),
    totalCash: Type.Optional(YahooNumber),
    totalCashPerShare: Type.Optional(YahooNumber),
    ebitda: Type.Optional(YahooNumber),
    totalDebt: Type.Optional(YahooNumber),
    quickRatio: Type.Optional(YahooNumber),
    currentRatio: Type.Optional(YahooNumber),
    totalRevenue: Type.Optional(YahooNumber),
    debtToEquity: Type.Optional(YahooNumber),
    revenuePerShare: Type.Optional(YahooNumber),
    returnOnAssets: Type.Optional(YahooNumber),
    returnOnEquity: Type.Optional(YahooNumber),
    grossProfits: Type.Optional(YahooNumber),
    freeCashflow: Type.Optional(YahooNumber),
    operatingCashflow: Type.Optional(YahooNumber),
    earningsGrowth: Type.Optional(YahooNumber),
    revenueGrowth: Type.Optional(YahooNumber),
    grossMargins: Type.Optional(YahooNumber),
    ebitdaMargins: Type.Optional(YahooNumber),
    operatingMargins: Type.Optional(YahooNumber),
    profitMargins: Type.Optional(YahooNumber),
    financialCurrency: Type.Union([Type.String(), Type.Null()]),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialData",
  }
);

const RevenueEstimate = Type.Object(
  {
    avg: NullableYahooNumber,
    low: NullableYahooNumber,
    high: NullableYahooNumber,
    numberOfAnalysts: NullableYahooNumber,
    yearAgoRevenue: NullableYahooNumber,
    growth: NullableYahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRevenueEstimate",
  }
);

const EpsTrend = Type.Object(
  {
    current: NullableYahooNumber,
    "7daysAgo": NullableYahooNumber,
    "30daysAgo": NullableYahooNumber,
    "60daysAgo": NullableYahooNumber,
    "90daysAgo": NullableYahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEpsTrend",
  }
);

const EpsRevisions = Type.Object(
  {
    upLast7days: NullableYahooNumber,
    upLast30days: NullableYahooNumber,
    downLast30days: NullableYahooNumber,
    downLast90days: NullableYahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEpsRevisions",
  }
);

const EarningsEstimate = Type.Object(
  {
    avg: NullableYahooNumber,
    low: NullableYahooNumber,
    high: NullableYahooNumber,
    yearAgoEps: NullableYahooNumber,
    numberOfAnalysts: NullableYahooNumber,
    growth: NullableYahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsEstimate",
  }
);

const EarningsTrendTrend = Type.Object(
  {
    maxAge: YahooNumber,
    period: Type.String(),
    endDate: NullableYahooFinanceDate,
    growth: NullableYahooNumber,
    earningsEstimate: EarningsEstimate,
    revenueEstimate: RevenueEstimate,
    epsTrend: EpsTrend,
    epsRevisions: EpsRevisions,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsTrendTrend",
  }
);

const EarningsTrend = Type.Object(
  {
    trend: Type.Array(EarningsTrendTrend),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsTrend",
  }
);

const EarningsHistoryHistory = Type.Object(
  {
    maxAge: YahooNumber,
    epsActual: NullableYahooNumber,
    epsEstimate: NullableYahooNumber,
    epsDifference: NullableYahooNumber,
    surprisePercent: NullableYahooNumber,
    quarter: NullableYahooFinanceDate,
    period: Type.String(),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsHistoryHistory",
  }
);

const EarningsHistory = Type.Object(
  {
    history: Type.Array(EarningsHistoryHistory),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsHistory",
  }
);

const Yearly = Type.Object(
  {
    date: YahooNumber,
    revenue: YahooNumber,
    earnings: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryYearly",
  }
);

const FinancialsChartQuarterly = Type.Object(
  {
    date: Type.String(),
    revenue: YahooNumber,
    earnings: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialsChartQuarterly",
  }
);

const FinancialsChart = Type.Object(
  {
    yearly: Type.Array(Yearly),
    quarterly: Type.Array(FinancialsChartQuarterly),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialsChart",
  }
);

const EarningsChartQuarterly = Type.Object(
  {
    date: Type.String(),
    actual: YahooNumber,
    estimate: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsChartQuarterly",
  }
);

const EarningsChart = Type.Object(
  {
    quarterly: Type.Array(EarningsChartQuarterly),
    currentQuarterEstimate: Type.Optional(YahooNumber),
    currentQuarterEstimateDate: Type.Optional(Type.String()),
    currentQuarterEstimateYear: Type.Optional(YahooNumber),
    earningsDate: Type.Array(YahooFinanceDate),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsChart",
  }
);

const QuoteSummaryEarnings = Type.Object(
  {
    maxAge: YahooNumber,
    earningsChart: EarningsChart,
    financialsChart: FinancialsChart,
    financialCurrency: Type.Optional(Type.String()),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarnings",
  }
);

const DefaultKeyStatistics = Type.Object(
  {
    maxAge: YahooNumber,
    priceHint: YahooNumber,
    enterpriseValue: Type.Optional(YahooNumber),
    forwardPE: Type.Optional(YahooNumber),
    profitMargins: Type.Optional(YahooNumber),
    floatShares: Type.Optional(YahooNumber),
    sharesOutstanding: Type.Optional(YahooNumber),
    sharesShort: Type.Optional(YahooNumber),
    sharesShortPriorMonth: Type.Optional(YahooFinanceDate),
    sharesShortPreviousMonthDate: Type.Optional(YahooFinanceDate),
    dateShortInterest: Type.Optional(YahooNumber),
    sharesPercentSharesOut: Type.Optional(YahooNumber),
    heldPercentInsiders: Type.Optional(YahooNumber),
    heldPercentInstitutions: Type.Optional(YahooNumber),
    shortRatio: Type.Optional(YahooNumber),
    shortPercentOfFloat: Type.Optional(YahooNumber),
    beta: Type.Optional(YahooNumber),
    impliedSharesOutstanding: Type.Optional(YahooNumber),
    category: Type.Union([Type.Null(), Type.String()]),
    bookValue: Type.Optional(YahooNumber),
    priceToBook: Type.Optional(YahooNumber),
    fundFamily: Type.Union([Type.Null(), Type.String()]),
    legalType: Type.Union([Type.Null(), Type.String()]),
    lastFiscalYearEnd: Type.Optional(YahooFinanceDate),
    nextFiscalYearEnd: Type.Optional(YahooFinanceDate),
    mostRecentQuarter: Type.Optional(YahooFinanceDate),
    earningsQuarterlyGrowth: Type.Optional(YahooNumber),
    netIncomeToCommon: Type.Optional(YahooNumber),
    trailingEps: Type.Optional(YahooNumber),
    forwardEps: Type.Optional(YahooNumber),
    pegRatio: Type.Optional(YahooNumber),
    lastSplitFactor: Type.Union([Type.Null(), Type.String()]),
    lastSplitDate: Type.Optional(YahooNumber),
    enterpriseToRevenue: Type.Optional(YahooNumber),
    enterpriseToEbitda: Type.Optional(YahooNumber),
    "52WeekChange": Type.Optional(YahooNumber),
    SandP52WeekChange: Type.Optional(YahooNumber),
    lastDividendValue: Type.Optional(YahooNumber),
    lastDividendDate: Type.Optional(YahooFinanceDate),
    ytdReturn: Type.Optional(YahooNumber),
    beta3Year: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    yield: Type.Optional(YahooNumber),
    fundInceptionDate: Type.Optional(YahooFinanceDate),
    threeYearAverageReturn: Type.Optional(YahooNumber),
    fiveYearAverageReturn: Type.Optional(YahooNumber),
    morningStarOverallRating: Type.Optional(YahooNumber),
    morningStarRiskRating: Type.Optional(YahooNumber),
    annualReportExpenseRatio: Type.Optional(YahooNumber),
    lastCapGain: Type.Optional(YahooNumber),
    annualHoldingsTurnover: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryDefaultKeyStatistics",
  }
);

const CashflowStatement = Type.Object(
  {
    maxAge: YahooNumber,
    endDate: YahooFinanceDate,
    netIncome: YahooNumber,
    depreciation: Type.Optional(YahooNumber),
    changeToNetincome: Type.Optional(YahooNumber),
    changeToAccountReceivables: Type.Optional(YahooNumber),
    changeToLiabilities: Type.Optional(YahooNumber),
    changeToInventory: Type.Optional(YahooNumber),
    changeToOperatingActivities: Type.Optional(YahooNumber),
    totalCashFromOperatingActivities: Type.Optional(YahooNumber),
    capitalExpenditures: Type.Optional(YahooNumber),
    investments: Type.Optional(YahooNumber),
    otherCashflowsFromInvestingActivities: Type.Optional(YahooNumber),
    totalCashflowsFromInvestingActivities: Type.Optional(YahooNumber),
    dividendsPaid: Type.Optional(YahooNumber),
    netBorrowings: Type.Optional(YahooNumber),
    otherCashflowsFromFinancingActivities: Type.Optional(YahooNumber),
    totalCashFromFinancingActivities: Type.Optional(YahooNumber),
    changeInCash: Type.Optional(YahooNumber),
    repurchaseOfStock: Type.Optional(YahooNumber),
    issuanceOfStock: Type.Optional(YahooNumber),
    effectOfExchangeRate: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCashflowStatement",
  }
);
const CashflowStatementHistory = Type.Object(
  {
    cashflowStatements: Type.Array(CashflowStatement),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCashflowStatementHistory",
  }
);

const CalendarEventsEarnings = Type.Object(
  {
    earningsDate: Type.Array(YahooFinanceDate),
    earningsAverage: Type.Optional(YahooNumber),
    earningsLow: Type.Optional(YahooNumber),
    earningsHigh: Type.Optional(YahooNumber),
    revenueAverage: Type.Optional(YahooNumber),
    revenueLow: Type.Optional(YahooNumber),
    revenueHigh: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSumamryCalendarEventsEarnings",
  }
);

const CalendarEvents = Type.Object(
  {
    maxAge: YahooNumber,
    earnings: CalendarEventsEarnings,
    exDividendDate: Type.Optional(YahooFinanceDate),
    dividendDate: Type.Optional(YahooFinanceDate),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCalendarEvents",
  }
);

const BalanceSheetStatement = Type.Object(
  {
    maxAge: YahooNumber,
    endDate: YahooFinanceDate,
    cash: Type.Optional(YahooNumber),
    shortTermInvestments: Type.Optional(YahooNumber),
    netReceivables: Type.Optional(YahooNumber),
    inventory: Type.Optional(YahooNumber),
    otherCurrentAssets: Type.Optional(YahooNumber),
    totalCurrentAssets: Type.Optional(YahooNumber),
    longTermInvestments: Type.Optional(YahooNumber),
    propertyPlantEquipment: Type.Optional(YahooNumber),
    otherAssets: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    accountsPayable: Type.Optional(YahooNumber),
    shortLongTermDebt: Type.Optional(YahooNumber),
    otherCurrentLiab: Type.Optional(YahooNumber),
    longTermDebt: Type.Optional(YahooNumber),
    otherLiab: Type.Optional(YahooNumber),
    totalCurrentLiabilities: Type.Optional(YahooNumber),
    totalLiab: Type.Optional(YahooNumber),
    commonStock: Type.Optional(YahooNumber),
    retainedEarnings: Type.Optional(YahooNumber),
    treasuryStock: Type.Optional(YahooNumber),
    otherStockholderEquity: Type.Optional(YahooNumber),
    totalStockholderEquity: Type.Optional(YahooNumber),
    netTangibleAssets: Type.Optional(YahooNumber),
    goodWill: Type.Optional(YahooNumber),
    intangibleAssets: Type.Optional(YahooNumber),
    deferredLongTermAssetCharges: Type.Optional(YahooNumber),
    deferredLongTermLiab: Type.Optional(YahooNumber),
    minorityInterest: Type.Optional(NullableYahooNumber),
    capitalSurplus: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryBalanceSheetStatement",
  }
);

const BalanceSheetHistory = Type.Object(
  {
    balanceSheetStatements: Type.Array(BalanceSheetStatement),
    maxAge: YahooNumber,
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryBalanceSheetHistory",
  }
);

const CompanyOfficer = Type.Object(
  {
    maxAge: YahooNumber,
    name: Type.String(),
    age: Type.Optional(YahooNumber),
    title: Type.String(),
    yearBorn: Type.Optional(YahooNumber),
    fiscalYear: Type.Optional(YahooNumber),
    totalPay: Type.Optional(YahooNumber),
    exercisedValue: Type.Optional(YahooNumber),
    unexercisedValue: Type.Optional(YahooNumber),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCompanyOfficer",
  }
);

const AssetProfile = Type.Object(
  {
    maxAge: YahooNumber,
    address1: Type.Optional(Type.String()),
    address2: Type.Optional(Type.String()),
    address3: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    zip: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    fax: Type.Optional(Type.String()),
    website: Type.Optional(Type.String()),
    industry: Type.Optional(Type.String()),
    industryDisp: Type.Optional(Type.String()),
    industryKey: Type.Optional(Type.String()),
    industrySymbol: Type.Optional(Type.String()),
    sector: Type.Optional(Type.String()),
    sectorDisp: Type.Optional(Type.String()),
    sectorKey: Type.Optional(Type.String()),
    longBusinessSummary: Type.Optional(Type.String()),
    fullTimeEmployees: Type.Optional(YahooNumber),
    companyOfficers: Type.Array(CompanyOfficer),
    auditRisk: Type.Optional(YahooNumber),
    boardRisk: Type.Optional(YahooNumber),
    compensationRisk: Type.Optional(YahooNumber),
    shareHolderRightsRisk: Type.Optional(YahooNumber),
    overallRisk: Type.Optional(YahooNumber),
    governanceEpochDate: Type.Optional(YahooFinanceDate),
    compensationAsOfEpochDate: Type.Optional(YahooFinanceDate),

    name: Type.Optional(Type.String()), // 'Bitcoin';
    startDate: Type.Optional(YahooFinanceDate), // new Date('2013-04-28')
    description: Type.Optional(Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
    twitter: Type.Optional(Type.String()), // in e.g. "ADA-USD" (#418)
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryAssetProfile",
  }
);

export const QuoteSummaryResult = Type.Object(
  {
    assetProfile: Type.Optional(AssetProfile),
    balanceSheetHistory: Type.Optional(BalanceSheetHistory),
    balanceSheetHistoryQuarterly: Type.Optional(BalanceSheetHistory),
    calendarEvents: Type.Optional(CalendarEvents),
    cashflowStatementHistory: Type.Optional(CashflowStatementHistory),
    cashflowStatementHistoryQuarterly: Type.Optional(CashflowStatementHistory),
    defaultKeyStatistics: Type.Optional(DefaultKeyStatistics),
    earnings: Type.Optional(QuoteSummaryEarnings),
    earningsHistory: Type.Optional(EarningsHistory),
    earningsTrend: Type.Optional(EarningsTrend),
    financialData: Type.Optional(FinancialData),
    fundOwnership: Type.Optional(Ownership),
    fundPerformance: Type.Optional(FundPerformance),
    fundProfile: Type.Optional(FundProfile),
    institutionOwnership: Type.Optional(Ownership),
    majorDirectHolders: Type.Optional(Holders),
    majorHoldersBreakdown: Type.Optional(MajorHoldersBreakdown),
    netSharePurchaseActivity: Type.Optional(NetSharePurchaseActivity),
    price: Type.Optional(Price),
    quoteType: Type.Optional(QuoteType),
    recommendationTrend: Type.Optional(RecommendationTrend),
    secFilings: Type.Optional(SECFilings),
    sectorTrend: Type.Optional(Trend),
    summaryDetail: Type.Optional(SummaryDetail),
    summaryProfile: Type.Optional(SummaryProfile),
    topHoldings: Type.Optional(TopHoldings),
    upgradeDowngradeHistory: Type.Optional(UpgradeDowngradeHistory),
  },
  {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryResult",
  }
);
