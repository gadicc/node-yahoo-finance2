/*
 * To generate the initial file, we took the output of all submodules for
 * 'AAPL', 'OCDO.L', '0700.HK' and '^IXIC' and ran the results through
 * the awesome https://app.quicktype.io/.
 *
 * Manual cleanup afterwards:
 *
 *  1) Spaces: 4 to 2
 *  ~~2) Wrapped in a module~~ <--- undid this after tooling issues.
 *  3) Alphabeticalize QuoteSummaryResult
 *  4) RawNumberObj type to Date|number for coersion
 */

export interface QuoteSummaryResult {
  [key: string]: any;
  assetProfile?: AssetProfile;
  balanceSheetHistory?: BalanceSheetHistory;
  balanceSheetHistoryQuarterly?: BalanceSheetHistory;
  calendarEvents?: CalendarEvents;
  cashflowStatementHistory?: CashflowStatementHistory;
  cashflowStatementHistoryQuarterly?: CashflowStatementHistory;
  defaultKeyStatistics?: DefaultKeyStatistics;
  earnings?: QuoteSummaryEarnings;
  earningsHistory?: EarningsHistory;
  earningsTrend?: EarningsTrend;
  financialData?: FinancialData;
  fundOwnership?: Ownership;
  fundPerformance?: FundPerformance;
  fundProfile?: FundProfile;
  incomeStatementHistory?: IncomeStatementHistory;
  incomeStatementHistoryQuarterly?: IncomeStatementHistory;
  indexTrend?: IndexTrend;
  industryTrend?: Trend;
  insiderHolders?: Holders;
  insiderTransactions?: InsiderTransactions;
  institutionOwnership?: Ownership;
  majorDirectHolders?: Holders;
  majorHoldersBreakdown?: MajorHoldersBreakdown;
  netSharePurchaseActivity?: NetSharePurchaseActivity;
  price?: Price;
  quoteType?: QuoteType;
  recommendationTrend?: RecommendationTrend;
  secFilings?: SECFilings;
  sectorTrend?: Trend;
  summaryDetail?: SummaryDetail;
  summaryProfile?: SummaryProfile;
  topHoldings?: TopHoldings;
  upgradeDowngradeHistory?: UpgradeDowngradeHistory;
}

export interface AssetProfile {
  [key: string]: any;
  maxAge: number;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  fax?: string;
  website?: string;
  industry?: string;
  industryDisp?: string;
  industryKey?: string;
  industrySymbol?: string;
  sector?: string;
  sectorDisp?: string;
  sectorKey?: string;
  longBusinessSummary?: string;
  fullTimeEmployees?: number;
  companyOfficers: CompanyOfficer[];
  auditRisk?: number;
  boardRisk?: number;
  compensationRisk?: number;
  shareHolderRightsRisk?: number;
  overallRisk?: number;
  governanceEpochDate?: Date;
  compensationAsOfEpochDate?: Date;
  name?: string; // 'Bitcoin';
  startDate?: Date; // new Date('2013-04-28')
  description?: string; // 'Bitcoin (BTC) is a cryptocurrency...'
  twitter?: string; // in e.g. "ADA-USD" (#418)
}

export interface CompanyOfficer {
  [key: string]: any;
  maxAge: number;
  name: string;
  age?: number;
  title: string;
  yearBorn?: number;
  fiscalYear?: number;
  totalPay?: number;
  exercisedValue?: number;
  unexercisedValue?: number;
}

export interface BalanceSheetHistory {
  [key: string]: any;
  balanceSheetStatements: BalanceSheetStatement[];
  maxAge: number;
}

export interface BalanceSheetStatement {
  [key: string]: any;
  maxAge: number;
  endDate: Date;
  cash?: number;
  shortTermInvestments?: number;
  netReceivables?: number;
  inventory?: number;
  otherCurrentAssets?: number;
  totalCurrentAssets?: number;
  longTermInvestments?: number;
  propertyPlantEquipment?: number;
  otherAssets?: number;
  totalAssets?: number;
  accountsPayable?: number;
  shortLongTermDebt?: number;
  otherCurrentLiab?: number;
  longTermDebt?: number;
  otherLiab?: number;
  totalCurrentLiabilities?: number;
  totalLiab?: number;
  commonStock?: number;
  retainedEarnings?: number;
  treasuryStock?: number;
  otherStockholderEquity?: number;
  totalStockholderEquity?: number;
  netTangibleAssets?: number;
  goodWill?: number;
  intangibleAssets?: number;
  deferredLongTermAssetCharges?: number;
  deferredLongTermLiab?: number;
  minorityInterest?: number | null;
  capitalSurplus?: number;
}

export interface CalendarEvents {
  [key: string]: any;
  maxAge: number;
  earnings: CalendarEventsEarnings;
  exDividendDate?: Date;
  dividendDate?: Date;
}

export interface CalendarEventsEarnings {
  [key: string]: any;
  earningsDate: Date[];
  earningsAverage?: number;
  earningsLow?: number;
  earningsHigh?: number;
  revenueAverage?: number;
  revenueLow?: number;
  revenueHigh?: number;
}

export interface CashflowStatementHistory {
  [key: string]: any;
  cashflowStatements: CashflowStatement[];
  maxAge: number;
}

export interface CashflowStatement {
  [key: string]: any;
  maxAge: number;
  endDate: Date;
  netIncome: number;
  depreciation?: number;
  changeToNetincome?: number;
  changeToAccountReceivables?: number;
  changeToLiabilities?: number;
  changeToInventory?: number;
  changeToOperatingActivities?: number;
  totalCashFromOperatingActivities?: number;
  capitalExpenditures?: number;
  investments?: number;
  otherCashflowsFromInvestingActivities?: number;
  totalCashflowsFromInvestingActivities?: number;
  dividendsPaid?: number;
  netBorrowings?: number;
  otherCashflowsFromFinancingActivities?: number;
  totalCashFromFinancingActivities?: number;
  changeInCash?: number;
  repurchaseOfStock?: number;
  issuanceOfStock?: number;
  effectOfExchangeRate?: number;
}

export interface DefaultKeyStatistics {
  [key: string]: any;
  maxAge: number;
  priceHint: number;
  enterpriseValue?: number;
  forwardPE?: number;
  profitMargins?: number;
  floatShares?: number;
  sharesOutstanding?: number;
  sharesShort?: number;
  sharesShortPriorMonth?: Date;
  sharesShortPreviousMonthDate?: Date;
  dateShortInterest?: Date;
  sharesPercentSharesOut?: number;
  heldPercentInsiders?: number;
  heldPercentInstitutions?: number;
  shortRatio?: number;
  shortPercentOfFloat?: number;
  beta?: number;
  impliedSharesOutstanding?: number;
  category: null | string;
  bookValue?: number;
  priceToBook?: number;
  fundFamily: null | string;
  legalType: null | string;
  lastFiscalYearEnd?: Date;
  nextFiscalYearEnd?: Date;
  mostRecentQuarter?: Date;
  earningsQuarterlyGrowth?: number;
  netIncomeToCommon?: number;
  trailingEps?: number;
  forwardEps?: number;
  pegRatio?: number;
  lastSplitFactor: null | string;
  lastSplitDate?: number;
  enterpriseToRevenue?: number;
  enterpriseToEbitda?: number;
  "52WeekChange"?: number;
  SandP52WeekChange?: number;
  lastDividendValue?: number;
  lastDividendDate?: Date;
  ytdReturn?: number;
  beta3Year?: number;
  totalAssets?: number;
  yield?: number;
  fundInceptionDate?: Date;
  threeYearAverageReturn?: number;
  fiveYearAverageReturn?: number;
  morningStarOverallRating?: number;
  morningStarRiskRating?: number;
  annualReportExpenseRatio?: number;
  lastCapGain?: number;
  annualHoldingsTurnover?: number;
}

export interface QuoteSummaryEarnings {
  [key: string]: any;
  maxAge: number;
  earningsChart: EarningsChart;
  financialsChart: FinancialsChart;
  financialCurrency?: string;
}

export interface EarningsChart {
  [key: string]: any;
  quarterly: EarningsChartQuarterly[];
  currentQuarterEstimate?: number;
  currentQuarterEstimateDate?: string;
  currentQuarterEstimateYear?: number;
  earningsDate: Date[];
}

export interface EarningsChartQuarterly {
  [key: string]: any;
  date: string;
  actual: number;
  estimate: number;
}

export interface FinancialsChart {
  [key: string]: any;
  yearly: Yearly[];
  quarterly: FinancialsChartQuarterly[];
}

export interface FinancialsChartQuarterly {
  [key: string]: any;
  date: string;
  revenue: number;
  earnings: number;
}

export interface Yearly {
  [key: string]: any;
  date: number;
  revenue: number;
  earnings: number;
}

export interface EarningsHistory {
  [key: string]: any;
  history: EarningsHistoryHistory[];
  maxAge: number;
}

export interface EarningsHistoryHistory {
  [key: string]: any;
  maxAge: number;
  epsActual: number | null;
  epsEstimate: number | null;
  epsDifference: number | null;
  surprisePercent: number | null;
  quarter: Date | null;
  period: string;
}

export interface EarningsTrend {
  [key: string]: any;
  trend: EarningsTrendTrend[];
  maxAge: number;
}

export interface EarningsTrendTrend {
  [key: string]: any;
  maxAge: number;
  period: string;
  endDate: Date | null;
  growth: number | null;
  earningsEstimate: EarningsEstimate;
  revenueEstimate: RevenueEstimate;
  epsTrend: EpsTrend;
  epsRevisions: EpsRevisions;
}

export interface EarningsEstimate {
  [key: string]: any;
  avg: number | null;
  low: number | null;
  high: number | null;
  yearAgoEps: number | null;
  numberOfAnalysts: number | null;
  growth: number | null;
}

export interface EpsRevisions {
  [key: string]: any;
  upLast7days: number | null;
  upLast30days: number | null;
  downLast30days: number | null;
  downLast90days: number | null;
}

export interface EpsTrend {
  [key: string]: any;
  current: number | null;
  "7daysAgo": number | null;
  "30daysAgo": number | null;
  "60daysAgo": number | null;
  "90daysAgo": number | null;
}

export interface RevenueEstimate {
  [key: string]: any;
  avg: number | null;
  low: number | null;
  high: number | null;
  numberOfAnalysts: number | null;
  yearAgoRevenue: number | null;
  growth: number | null;
}

export interface FinancialData {
  [key: string]: any;
  maxAge: number;
  currentPrice?: number;
  targetHighPrice?: number;
  targetLowPrice?: number;
  targetMeanPrice?: number;
  targetMedianPrice?: number;
  recommendationMean?: number;
  recommendationKey: string;
  numberOfAnalystOpinions?: number;
  totalCash?: number;
  totalCashPerShare?: number;
  ebitda?: number;
  totalDebt?: number;
  quickRatio?: number;
  currentRatio?: number;
  totalRevenue?: number;
  debtToEquity?: number;
  revenuePerShare?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  grossProfits?: number;
  freeCashflow?: number;
  operatingCashflow?: number;
  earningsGrowth?: number;
  revenueGrowth?: number;
  grossMargins?: number;
  ebitdaMargins?: number;
  operatingMargins?: number;
  profitMargins?: number;
  financialCurrency: string | null;
}

export interface Ownership {
  [key: string]: any;
  maxAge: number;
  ownershipList: OwnershipList[];
}

export interface OwnershipList {
  [key: string]: any;
  maxAge: number;
  reportDate: Date;
  organization: string;
  pctHeld: number;
  position: number;
  value: number;
  pctChange?: number;
}

export interface FundPerformance {
  [key: string]: any;
  maxAge: number;
  loadAdjustedReturns?: PeriodRange;
  rankInCategory?: PeriodRange;
  performanceOverview: FundPerformancePerformanceOverview;
  performanceOverviewCat: FundPerformancePerformanceOverviewCat;
  trailingReturns: FundPerformanceTrailingReturns;
  trailingReturnsNav: FundPerformanceTrailingReturns;
  trailingReturnsCat: FundPerformanceTrailingReturns;
  annualTotalReturns: FundPerformanceReturns;
  pastQuarterlyReturns: FundPerformanceReturns;
  riskOverviewStatistics: FundPerformanceRiskOverviewStats;
  riskOverviewStatisticsCat: FundPerformanceRiskOverviewStatsCat;
}

export interface PeriodRange {
  [key: string]: any;
  asOfDate?: Date;
  ytd?: number;
  oneMonth?: number;
  threeMonth?: number;
  oneYear?: number;
  threeYear?: number;
  fiveYear?: number;
  tenYear?: number;
}

export interface FundPerformanceTrailingReturns extends PeriodRange {
  [key: string]: any;
  lastBullMkt?: number;
  lastBearMkt?: number;
}

export interface FundPerformancePerformanceOverview {
  [key: string]: any;
  asOfDate?: Date;
  ytdReturnPct?: number;
  oneYearTotalReturn?: number;
  threeYearTotalReturn?: number;
  fiveYrAvgReturnPct?: number;
  morningStarReturnRating?: number;
  numYearsUp?: number;
  numYearsDown?: number;
  bestOneYrTotalReturn?: number;
  worstOneYrTotalReturn?: number;
  bestThreeYrTotalReturn?: number;
  worstThreeYrTotalReturn?: number;
}

export interface FundPerformancePerformanceOverviewCat {
  [key: string]: any;
  ytdReturnPct?: number;
  fiveYrAvgReturnPct?: number;
}

export interface FundPerformanceReturns {
  [key: string]: any;
  returns: FundPerformanceReturnsRow[];
  returnsCat?: FundPerformanceReturnsRow[];
}

export interface FundPerformanceReturnsRow {
  [key: string]: any;
  year: number; // coerce to number from string "2020"
  annualValue?: number;
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
}

export interface FundPerformanceRiskOverviewStats {
  [key: string]: any;
  riskStatistics: FundPerformanceRiskOverviewStatsRow[];
  riskRating?: number;
}

export interface FundPerformanceRiskOverviewStatsCat {
  [key: string]: any;
  riskStatisticsCat: FundPerformanceRiskOverviewStatsRow[];
}

export interface FundPerformanceRiskOverviewStatsRow {
  [key: string]: any;
  year: string; // "5y" | "3y" | "10y" | anything else?
  alpha: number; // 7.76
  beta: number; // 1.04
  meanAnnualReturn: number; // 2.05
  rSquared: number; // 84.03
  stdDev?: number; // 17.12
  sharpeRatio: number; // 1.37
  treynorRatio: number; // 23.61
}

export interface FundProfile {
  [key: string]: any;
  maxAge: number;
  styleBoxUrl?: null | string;
  family: null | string;
  categoryName: null | string;
  legalType: null | string;
  managementInfo?: FundProfileManagementInfo;
  feesExpensesInvestment?: FundProfileFeesExpensesInvestment;
  feesExpensesInvestmentCat?: FundProfileFeesExpensesInvestmentCat;
  brokerages?: FundProfileBrokerage[];
  initInvestment?: number;
  initIraInvestment?: number;
  initAipInvestment?: number;
  subseqInvestment?: number;
  subseqIraInvestment?: number;
  subseqAipInvestment?: number;
}

export interface FundProfileManagementInfo {
  [key: string]: any;
  managerName: null | string;
  managerBio: null | string;
  startdate?: Date;
}

export interface FundProfileFeesExpensesInvestment {
  [key: string]: any;
  annualHoldingsTurnover?: number;
  annualReportExpenseRatio?: number;
  grossExpRatio?: number;
  netExpRatio?: number;
  projectionValues: object;
  totalNetAssets?: number;
}

export interface FundProfileFeesExpensesInvestmentCat
  extends Omit<FundProfileFeesExpensesInvestment, "projectionValues"> {
  [key: string]: any;
  projectionValuesCat: object;
}

export interface FundProfileBrokerage {}

export interface IncomeStatementHistory {
  [key: string]: any;
  incomeStatementHistory: IncomeStatementHistoryElement[];
  maxAge: number;
}

export interface IncomeStatementHistoryElement {
  [key: string]: any;
  maxAge: number;
  endDate: Date;
  totalRevenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchDevelopment: number | null;
  sellingGeneralAdministrative: number | null;
  nonRecurring: number | null;
  otherOperatingExpenses: number | null;
  totalOperatingExpenses: number;
  operatingIncome: number | null; // Example of null in EREGL.IS (#517)
  totalOtherIncomeExpenseNet: number | null; // null since Since Feb 22 (#734)
  ebit: number;
  interestExpense: number | null;
  incomeBeforeTax: number | null;
  incomeTaxExpense: number;
  minorityInterest: number | null;
  netIncomeFromContinuingOps: number | null;
  discontinuedOperations: number | null;
  extraordinaryItems: number | null;
  effectOfAccountingCharges: number | null;
  otherItems: number | null;
  netIncome: number;
  netIncomeApplicableToCommonShares: number | null;
}

export interface IndexTrend {
  [key: string]: any;
  maxAge: number;
  symbol: string;
  peRatio: number;
  pegRatio: number;
  estimates: Estimate[];
}

export interface Estimate {
  [key: string]: any;
  period: string;
  growth?: number;
}

export interface Trend {
  [key: string]: any;
  maxAge: number;
  symbol: null;
  estimates: any[];
}

export interface Holders {
  [key: string]: any;
  holders: Holder[];
  maxAge: number;
}

export interface Holder {
  [key: string]: any;
  maxAge: number;
  name: string;
  relation: Relation | string;
  url: string;
  transactionDescription: string;
  latestTransDate: Date;
  positionDirect?: number;
  positionDirectDate?: Date;
  positionIndirect?: number;
  positionIndirectDate?: Date;
  positionSummaryDate?: Date;
}

export enum Relation {
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

export interface InsiderTransactions {
  [key: string]: any;
  transactions: Transaction[];
  maxAge: number;
}

export interface Transaction {
  [key: string]: any;
  maxAge: number;
  shares: number;
  filerUrl: string;
  transactionText: string;
  filerName: string;
  filerRelation: Relation | string;
  moneyText: string;
  startDate: Date;
  ownership: OwnershipEnum | string;
  value?: number;
}

export enum OwnershipEnum {
  D = "D",
  I = "I",
}

export interface MajorHoldersBreakdown {
  [key: string]: any;
  maxAge: number;
  insidersPercentHeld?: number;
  institutionsPercentHeld?: number;
  institutionsFloatPercentHeld?: number;
  institutionsCount?: number;
}
export interface NetSharePurchaseActivity {
  [key: string]: any;
  maxAge: number;
  period: string;
  buyInfoCount: number;
  buyInfoShares: number;
  buyPercentInsiderShares?: number;
  sellInfoCount: number;
  sellInfoShares?: number;
  sellPercentInsiderShares?: number;
  netInfoCount: number;
  netInfoShares: number;
  netPercentInsiderShares?: number;
  totalInsiderShares: number;
}

/*
 * Dates are usually epoch numbers, but including other modules can change
 * result to include an ISODate.
 */
export interface Price {
  [key: string]: any;
  averageDailyVolume10Day?: number;
  averageDailyVolume3Month?: number;
  exchange?: string;
  exchangeName?: string;
  exchangeDataDelayedBy?: number;
  maxAge: number;
  postMarketChangePercent?: number;
  postMarketChange?: number;
  postMarketTime?: Date;
  postMarketPrice?: number;
  postMarketSource?: string;
  preMarketChangePercent?: number;
  preMarketChange?: number;
  preMarketTime?: Date;
  preMarketPrice?: number;
  preMarketSource?: string;
  priceHint: number;
  regularMarketChangePercent?: number;
  regularMarketChange?: number;
  regularMarketTime?: Date;
  regularMarketPrice?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  regularMarketPreviousClose?: number;
  regularMarketSource?: string;
  regularMarketOpen?: number;

  quoteSourceName?: string;
  quoteType: string;

  symbol: string;
  underlyingSymbol: null | string; // "GCM22.CMX" (from GC=F future)
  shortName: null | string;
  longName: null | string;

  lastMarket: null | string;
  marketState?: string;
  marketCap?: number;

  // Crypto only?  Is Price actually Quote?  TODO after
  currency?: string;
  currencySymbol?: string;
  fromCurrency: string | null;
  toCurrency?: string | null;
  volume24Hr?: number;
  volumeAllCurrencies?: number;
  circulatingSupply?: number;

  // futures
  expireDate?: Date; // 1656374400,
  openInterest?: number; // 444411,
}

export interface QuoteType {
  [key: string]: any;
  exchange: string;
  quoteType: string;
  symbol: string;
  underlyingSymbol: string;
  shortName: null | string;
  longName: null | string;
  firstTradeDateEpochUtc: null | Date;
  timeZoneFullName: string;
  timeZoneShortName: string;
  uuid: string;
  messageBoardId?: null | string;
  gmtOffSetMilliseconds: number;
  maxAge: number;
}

export interface RecommendationTrend {
  [key: string]: any;
  trend: RecommendationTrendTrend[];
  maxAge: number;
}

export interface RecommendationTrendTrend {
  [key: string]: any;
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

export interface SECFilings {
  [key: string]: any;
  filings: Filing[];
  maxAge: number;
}

export interface Filing {
  [key: string]: any;
  date: string; // TODO: check the format
  epochDate: Date;
  type: FilingType;
  title: string;
  edgarUrl: string;
  maxAge: number;
  url?: string;
  exhibits?: { type: string; url: string; downloadUrl?: string }[];
}

// May consider switching this to string, as we keep finding more and more.
type FilingType =
  | "10-K"
  | "10-Q"
  | "8-K"
  | "8-K/A"
  | "10-K/A"
  | "10-Q/A"
  | "SD"
  | "PX14A6G"
  | "SC 13G/A"
  | "DEFA14A"
  | "25-NSE"
  | "S-8 POS"
  | "6-K"
  | "F-3ASR"
  | "SC 13D/A"
  | "20-F"
  | "425"
  | "SC14D9C"
  | "SC 13G"
  | "S-8"
  | "DEF 14A"
  | "F-10";

export interface SummaryDetail {
  [key: string]: any;
  maxAge: number;
  priceHint: number;
  previousClose?: number; // missing in e.g. "APS.AX"
  open?: number;
  dayLow?: number;
  dayHigh?: number;
  regularMarketPreviousClose?: number; // missing in e.g. "APS.AX"
  regularMarketOpen?: number;
  regularMarketDayLow?: number;
  regularMarketDayHigh?: number;
  regularMarketVolume?: number;
  dividendRate?: number;
  dividendYield?: number;
  exDividendDate?: Date;
  payoutRatio?: number;
  fiveYearAvgDividendYield?: number;
  beta?: number;
  trailingPE?: number;
  forwardPE?: number;
  volume?: number;
  averageVolume?: number;
  averageVolume10days?: number;
  averageDailyVolume10Day?: number;
  bid?: number;
  ask?: number;
  bidSize?: number;
  askSize?: number;
  marketCap?: number;
  fiftyDayAverage?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  twoHundredDayAverage?: number;
  priceToSalesTrailing12Months?: number;
  trailingAnnualDividendRate?: number;
  trailingAnnualDividendYield?: number;
  currency: string;
  algorithm: null;
  tradeable: boolean;
  yield?: number;
  totalAssets?: number;
  navPrice?: number;
  ytdReturn?: number;

  // crypto only (optional, or null in other types)
  // TODO: how does Price / SummaryDetail compare? common base?
  fromCurrency: string | null; // 'BTC'
  toCurrency?: string | null; // 'USD-X'
  lastMarket: string | null; // 'CoinMarketCap'
  volume24Hr?: number; // 62650314752
  volumeAllCurrencies?: number; // 62650314752
  circulatingSupply?: number; // 18638932
  startDate?: Date; // new Date(1367107200 * 1000)
  coinMarketCapLink?: string | null; // "https://coinmarketcap.com/currencies/cardano"

  // futures
  expireDate?: Date; // 1656374400,
  openInterest?: number; // 444411,
}

export interface SummaryProfile {
  [key: string]: any;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  fax?: string;
  website?: string;
  industry?: string;
  industryDisp?: string;
  sector?: string;
  sectorDisp?: string;
  longBusinessSummary?: string;
  fullTimeEmployees?: number;
  companyOfficers: any[];
  maxAge: number;
  twitter?: string; // in e.g. "ADA-USD" (#418)

  // seems like for cryptocurency only
  // TODO: how does this relate to Quote type.  Common base?
  name?: string; // 'Bitcoin'
  startDate?: Date; // new Date('2013-04-28')
  description?: string; // 'Bitcoin (BTC) is a cryptocurrency...'
}

export interface TopHoldings {
  [key: string]: any;
  maxAge: number;
  stockPosition?: number;
  bondPosition?: number;
  holdings: TopHoldingsHolding[];
  equityHoldings: TopHoldingsEquityHoldings;
  bondHoldings: object;
  bondRatings: TopHoldingsBondRating[];
  sectorWeightings: TopHoldingsSectorWeighting[];
  cashPosition?: number;
  otherPosition?: number;
  preferredPosition?: number;
  convertiblePosition?: number;
}

export interface TopHoldingsHolding {
  [key: string]: any;
  symbol: string;
  holdingName: string;
  holdingPercent: number;
}

export interface TopHoldingsEquityHoldings {
  [key: string]: any;
  medianMarketCap?: number;
  medianMarketCapCat?: number;
  priceToBook: number;
  priceToBookCat?: number;
  priceToCashflow: number;
  priceToCashflowCat?: number;
  priceToEarnings: number;
  priceToEarningsCat?: number;
  priceToSales: number;
  priceToSalesCat?: number;
  threeYearEarningsGrowth?: number;
  threeYearEarningsGrowthCat?: number;
}

export interface TopHoldingsBondRating {
  [key: string]: any;
  a?: number;
  aa?: number;
  aaa?: number;
  other?: number;
  b?: number;
  bb?: number;
  bbb?: number;
  below_b?: number;
  us_government?: number;
}

export interface TopHoldingsSectorWeighting {
  [key: string]: any;
  realestate?: number;
  consumer_cyclical?: number;
  basic_materials?: number;
  consumer_defensive?: number;
  technology?: number;
  communication_services?: number;
  financial_services?: number;
  utilities?: number;
  industrials?: number;
  energy?: number;
  healthcare?: number;
}

export interface UpgradeDowngradeHistory {
  [key: string]: any;
  history: UpgradeDowngradeHistoryHistory[];
  maxAge: number;
}

export interface UpgradeDowngradeHistoryHistory {
  [key: string]: any;
  epochGradeDate: Date;
  firm: string;
  toGrade: Grade;
  fromGrade?: Grade;
  action: Action;
}

export enum Action {
  Down = "down",
  Init = "init",
  Main = "main",
  Reit = "reit",
  Up = "up",
}

export enum Grade {
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
  OVerweight = "OVerweight", // Not a typo, how it was returned from API
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
