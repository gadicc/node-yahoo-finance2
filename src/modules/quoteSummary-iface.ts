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
  assetProfile?:                      AssetProfile;
  balanceSheetHistory?:               BalanceSheetHistory;
  balanceSheetHistoryQuarterly?:      BalanceSheetHistory;
  calendarEvents?:                    CalendarEvents;
  cashflowStatementHistory?:          CashflowStatementHistory;
  cashflowStatementHistoryQuarterly?: CashflowStatementHistory;
  defaultKeyStatistics?:              DefaultKeyStatistics;
  earnings?:                          QuoteSummaryEarnings;
  earningsHistory?:                   EarningsHistory;
  earningsTrend?:                     EarningsTrend;
  financialData?:                     FinancialData;
  fundOwnership?:                     Ownership;
  fundPerformance?:                   FundPerformance;
  fundProfile?:                       FundProfile;
  incomeStatementHistory?:            IncomeStatementHistory;
  incomeStatementHistoryQuarterly?:   IncomeStatementHistory;
  indexTrend?:                        IndexTrend;
  industryTrend?:                     Trend;
  insiderHolders?:                    Holders;
  insiderTransactions?:               InsiderTransactions;
  institutionOwnership?:              Ownership;
  majorDirectHolders?:                Holders;
  majorHoldersBreakdown?:             MajorHoldersBreakdown;
  netSharePurchaseActivity?:          NetSharePurchaseActivity;
  price?:                             Price;
  quoteType?:                         QuoteType;
  recommendationTrend?:               RecommendationTrend;
  secFilings?:                        SECFilings;
  sectorTrend?:                       Trend;
  summaryDetail?:                     SummaryDetail;
  summaryProfile?:                    SummaryProfile;
  topHoldings?:                       TopHoldings;
  upgradeDowngradeHistory?:           UpgradeDowngradeHistory;
}

export interface AssetProfile {
  maxAge:                     number;
  address1?:                  string;
  address2?:                  string;
  address3?:                  string;
  city?:                      string;
  state?:                     string;
  zip?:                       string;
  country?:                   string;
  phone:                      string;
  fax?:                       string;
  website?:                   string;
  industry?:                  string;
  sector?:                    string;
  longBusinessSummary:        string;
  fullTimeEmployees?:         number;
  companyOfficers:            CompanyOfficer[];
  auditRisk?:                 number;
  boardRisk?:                 number;
  compensationRisk?:          number;
  shareHolderRightsRisk?:     number;
  overallRisk?:               number;
  governanceEpochDate?:       Date;
  compensationAsOfEpochDate?: Date;
}

export interface CompanyOfficer {
  maxAge:            number;
  name:              string;
  age?:              number;
  title:             string;
  yearBorn?:         number;
  fiscalYear?:       number;
  totalPay?:         number;
  exercisedValue?:   number;
  unexercisedValue?: number;
}

export interface BalanceSheetHistory {
  balanceSheetStatements: BalanceSheetStatement[];
  maxAge:                 number;
}

export interface BalanceSheetStatement {
  maxAge:                        number;
  endDate:                       Date;
  cash:                          number;
  shortTermInvestments?:         number;
  netReceivables?:               number;
  inventory?:                    number;
  otherCurrentAssets:            number;
  totalCurrentAssets:            number;
  longTermInvestments:           number;
  propertyPlantEquipment:        number;
  otherAssets:                   number;
  totalAssets:                   number;
  accountsPayable?:              number;
  shortLongTermDebt?:            number;
  otherCurrentLiab:              number;
  longTermDebt:                  number;
  otherLiab:                     number;
  totalCurrentLiabilities:       number;
  totalLiab:                     number;
  commonStock?:                  number;
  retainedEarnings?:             number;
  treasuryStock?:                number;
  otherStockholderEquity?:       number;
  totalStockholderEquity:        number;
  netTangibleAssets:             number;
  goodWill?:                     number;
  intangibleAssets?:             number;
  deferredLongTermAssetCharges?: number;
  deferredLongTermLiab?:         number;
  minorityInterest?:             number;
  capitalSurplus?:               number;
}

export interface CalendarEvents {
  maxAge:          number;
  earnings:        CalendarEventsEarnings;
  exDividendDate?: Date;
  dividendDate?:   Date;
}

export interface CalendarEventsEarnings {
  earningsDate:     Date[];
  earningsAverage?: number;
  earningsLow?:     number;
  earningsHigh?:    number;
  revenueAverage?:  number;
  revenueLow?:      number;
  revenueHigh?:     number;
}

export interface CashflowStatementHistory {
  cashflowStatements: CashflowStatement[];
  maxAge:             number;
}

export interface CashflowStatement {
  maxAge:                                number;
  endDate:                               Date;
  netIncome:                             number;
  depreciation:                          number;
  changeToNetincome:                     number;
  changeToAccountReceivables?:           number;
  changeToLiabilities:                   number;
  changeToInventory?:                    number;
  changeToOperatingActivities?:          number;
  totalCashFromOperatingActivities:      number;
  capitalExpenditures:                   number;
  investments?:                          number;
  otherCashflowsFromInvestingActivities: number;
  totalCashflowsFromInvestingActivities: number;
  dividendsPaid?:                        number;
  netBorrowings?:                        number;
  otherCashflowsFromFinancingActivities: number;
  totalCashFromFinancingActivities:      number;
  changeInCash:                          number;
  repurchaseOfStock?:                    number;
  issuanceOfStock?:                      number;
  effectOfExchangeRate?:                 number;
}

export interface DefaultKeyStatistics {
  maxAge:                        number;
  priceHint:                     number;
  enterpriseValue?:              number;
  forwardPE?:                    number;
  profitMargins?:                number;
  floatShares?:                  number;
  sharesOutstanding?:            number;
  sharesShort?:                  number;
  sharesShortPriorMonth?:        number;
  sharesShortPreviousMonthDate?: number;
  dateShortInterest?:            number;
  sharesPercentSharesOut?:       number;
  heldPercentInsiders?:          number;
  heldPercentInstitutions?:      number;
  shortRatio?:                   number;
  shortPercentOfFloat?:          number;
  beta?:                         number;
  category:                      null | string;
  bookValue?:                    number;
  priceToBook?:                  number;
  fundFamily:                    null | string;
  legalType:                     null | string;
  lastFiscalYearEnd?:            number;
  nextFiscalYearEnd?:            number;
  mostRecentQuarter?:            number;
  earningsQuarterlyGrowth?:      number;
  netIncomeToCommon?:            number;
  trailingEps?:                  number;
  forwardEps?:                   number;
  pegRatio?:                     number;
  lastSplitFactor:               null | string;
  lastSplitDate?:                number;
  enterpriseToRevenue?:          number;
  enterpriseToEbitda?:           number;
  "52WeekChange"?:               number;
  SandP52WeekChange?:            number;
  lastDividendValue?:            number;
  lastDividendDate?:             number;
  ytdReturn?:                    number;
  beta3Year?:                    number;
  totalAssets?:                  number;
  yield?:                        number;
  fundInceptionDate?:            Date;
  threeYearAverageReturn?:       number;
  fiveYearAverageReturn?:        number;
  morningStarOverallRating?:     number;
  morningStarRiskRating?:        number;
  annualReportExpenseRatio?:     number;
  lastCapGain?:                  number;
  annualHoldingsTurnover?:       number;
}

export interface QuoteSummaryEarnings {
  maxAge:            number;
  earningsChart:     EarningsChart;
  financialsChart:   FinancialsChart;
  financialCurrency: string;
}

export interface EarningsChart {
  quarterly:                   EarningsChartQuarterly[];
  currentQuarterEstimate?:     number;
  currentQuarterEstimateDate?: string;
  currentQuarterEstimateYear?: number;
  earningsDate:                Date[];
}

export interface EarningsChartQuarterly {
  date:     string;
  actual:   number;
  estimate: number;
}

export interface FinancialsChart {
  yearly:    Yearly[];
  quarterly: FinancialsChartQuarterly[];
}

export interface FinancialsChartQuarterly {
  date:     string;
  revenue:  number;
  earnings: number;
}

export interface Yearly {
  date:     number;
  revenue:  number;
  earnings: number;
}

export interface EarningsHistory {
  history: EarningsHistoryHistory[];
  maxAge:  number;
}

export interface EarningsHistoryHistory {
  maxAge:          number;
  epsActual:       number;
  epsEstimate:     number;
  epsDifference:   number;
  surprisePercent: number;
  quarter:         number;
  period:          string;
}

export interface EarningsTrend {
  trend:  EarningsTrendTrend[];
  maxAge: number;
}

export interface EarningsTrendTrend {
  maxAge:           number;
  period:           string;
  endDate:          Date | null;
  growth:           number;
  earningsEstimate: EarningsEstimate;
  revenueEstimate:  RevenueEstimate;
  epsTrend:         EpsTrend;
  epsRevisions:     EpsRevisions;
}

export interface EarningsEstimate {
  avg:              number;
  low:              number;
  high:             number;
  yearAgoEps:       number;
  numberOfAnalysts: number;
  growth:           number;
}

export interface EpsRevisions {
  upLast7days:    number;
  upLast30days:   number;
  downLast30days: number;
  downLast90days: DiscontinuedOperations;
}

export interface DiscontinuedOperations {
}

export interface EpsTrend {
  current:     number;
  "7daysAgo":  number;
  "30daysAgo": number;
  "60daysAgo": number;
  "90daysAgo": number;
}

export interface RevenueEstimate {
  avg:              number;
  low:              number;
  high:             number;
  numberOfAnalysts: number;
  yearAgoRevenue:   number;
  growth:           number;
}

export interface FinancialData {
  maxAge:                  number;
  currentPrice:            number;
  targetHighPrice:         number;
  targetLowPrice:          number;
  targetMeanPrice:         number;
  targetMedianPrice:       number;
  recommendationMean?:     number;
  recommendationKey:       string;
  numberOfAnalystOpinions: number;
  totalCash?:              number;
  totalCashPerShare?:      number;
  ebitda?:                 number;
  totalDebt?:              number;
  quickRatio:              number;
  currentRatio:            number;
  totalRevenue?:           number;
  debtToEquity:            number;
  revenuePerShare?:        number;
  returnOnAssets:          number;
  returnOnEquity:          number;
  grossProfits:            number;
  freeCashflow?:           number;
  operatingCashflow?:      number;
  earningsGrowth?:         number;
  revenueGrowth:           number;
  grossMargins:            number;
  ebitdaMargins:           number;
  operatingMargins:        number;
  profitMargins:           number;
  financialCurrency:       string;
}

export interface Ownership {
  maxAge:        number;
  ownershipList: OwnershipList[];
}

export interface OwnershipList {
  maxAge:       number;
  reportDate:   Date;
  organization: string;
  pctHeld:      number;
  position:     number;
  value:        number;
}

export interface FundPerformance {
  maxAge:                      number;
  loadAdjustedReturns?:        PeriodRange;
  rankInCategory?:             PeriodRange;
  performanceOverview:         FundPerformancePerformanceOverview;
  performanceOverviewCat:      FundPerformancePerformanceOverviewCat;
  trailingReturns:             FundPerformanceTrailingReturns;
  trailingReturnsNav:          FundPerformanceTrailingReturns;
  trailingReturnsCat:          FundPerformanceTrailingReturns;
  annualTotalReturns:          FundPerformanceReturns;
  pastQuarterlyReturns:        FundPerformanceReturns;
  riskOverviewStatistics:      FundPerformanceRiskOverviewStats;
  riskOverviewStatisticsCat:   FundPerformanceRiskOverviewStatsCat;
}

export interface PeriodRange {
  asOfDate?:      Date;
  ytd?:        number;
  oneMonth?:   number;
  threeMonth?: number;
  oneYear?:    number;
  threeYear?:  number;
  fiveYear?:   number;
  tenYear?:    number;
}

export interface FundPerformanceTrailingReturns extends PeriodRange {
  lastBullMkt?:   number;
  lastBearMkt?:   number;
}

export interface FundPerformancePerformanceOverview {
  asOfDate?:                Date;
  ytdReturnPct?:            number;
  oneYearTotalReturn?:      number;
  threeYearTotalReturn?:    number;
  morningStarReturnRating?: number;
  numYearsUp?:              number;
  numYearsDown?:            number;
  bestOneYrTotalReturn?:    number;
  worstOneYrTotalReturn?:   number;
  bestThreeYrTotalReturn?:  number;
  worstThreeYrTotalReturn?: number;
}

export interface FundPerformancePerformanceOverviewCat {
  ytdReturnPct?:       number;
  fiveYrAvgReturnPct?: number;
}

export interface FundPerformanceReturns {
  returns:        FundPerformanceReturnsRow[];
  returnsCat?:    FundPerformanceReturnsRow[];
}

export interface FundPerformanceReturnsRow {
  year:           number; // coerce to number from string "2020"
  annualValue?:   number;
  q1?:            number;
  q2?:            number;
  q3?:            number;
  q4?:            number;
}

export interface FundPerformanceRiskOverviewStats {
  riskStatistics: FundPerformanceRiskOverviewStatsRow[];
  riskRating?:    number;
}

export interface FundPerformanceRiskOverviewStatsCat {
  riskStatisticsCat: FundPerformanceRiskOverviewStatsRow[];
}

export interface FundPerformanceRiskOverviewStatsRow {
  year:             string;   // "5y" | "3y" | "10y" | anything else?
  alpha:            number;   // 7.76
  beta:             number;   // 1.04
  meanAnnualReturn: number;   // 2.05
  rSquared:         number;   // 84.03
  stdDev:           number;   // 17.12
  sharpeRatio:      number;   // 1.37
  treynorRatio:     number;   // 23.61
}

export interface FundProfile {
  maxAge:                     number;
  styleBoxUrl?:               string;
  family:                     string;
  categoryName:               string;
  legalType:                  null | string;
  managementInfo:             FundProfileManagementInfo;
  feesExpensesInvestment?:    FundProfileFeesExpensesInvestment;
  feesExpensesInvestmentCat?: FundProfileFeesExpensesInvestmentCat;
  brokerages:                 FundProfileBrokerage[];
  initInvestment?:            number;
  initIraInvestment?:         number;
  initAipInvestment?:         number;
  subseqInvestment?:          number;
  subseqIraInvestment?:       number;
  subseqAipInvestment?:       number;

}

export interface FundProfileManagementInfo {
  managerName: null | string;
  managerBio:  null | string;
  startdate?:  Date;
}

export interface FundProfileFeesExpensesInvestment {
  annualHoldingsTurnover?:  number;
  annualReportExpenseRatio: number;
  grossExpRatio?:           number;
  netExpRatio?:             number;
  projectionValues:         object;
  totalNetAssets?:          number;
}

export interface FundProfileFeesExpensesInvestmentCat extends
    Omit<FundProfileFeesExpensesInvestment,"projectionValues"> {
  projectionValuesCat:      object;
}

export interface FundProfileBrokerage {
}

export interface IncomeStatementHistory {
  incomeStatementHistory: IncomeStatementHistoryElement[];
  maxAge:                 number;
}

export interface IncomeStatementHistoryElement {
  maxAge:                            number;
  endDate:                           Date;
  totalRevenue:                      number;
  costOfRevenue:                     number;
  grossProfit:                       number;
  researchDevelopment:               number;
  sellingGeneralAdministrative:      number;
  nonRecurring:                      DiscontinuedOperations;
  otherOperatingExpenses:            number;
  totalOperatingExpenses:            number;
  operatingIncome:                   number;
  totalOtherIncomeExpenseNet:        number;
  ebit:                              number;
  interestExpense:                   number;
  incomeBeforeTax:                   number;
  incomeTaxExpense:                  number;
  minorityInterest:                  number;
  netIncomeFromContinuingOps:        number;
  discontinuedOperations:            DiscontinuedOperations;
  extraordinaryItems:                DiscontinuedOperations;
  effectOfAccountingCharges:         DiscontinuedOperations;
  otherItems:                        DiscontinuedOperations;
  netIncome:                         number;
  netIncomeApplicableToCommonShares: number;
}

export interface IndexTrend {
  maxAge:    number;
  symbol:    string;
  peRatio:   number;
  pegRatio:  number;
  estimates: Estimate[];
}

export interface Estimate {
  period:  string;
  growth?: number;
}

export interface Trend {
  maxAge:    number;
  symbol:    null;
  estimates: any[];
}

export interface Holders {
  holders: Holder[];
  maxAge:  number;
}

export interface Holder {
  maxAge:                 number;
  name:                   string;
  relation:               Relation;
  url:                    string;
  transactionDescription: string;
  latestTransDate:        Date;
  positionDirect?:        number;
  positionDirectDate?:    number;
  positionIndirect?:      number;
  positionIndirectDate?:  number;
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
  transactions: Transaction[];
  maxAge:       number;
}

export interface Transaction {
  maxAge:          number;
  shares:          number;
  filerUrl:        string;
  transactionText: string;
  filerName:       string;
  filerRelation:   Relation;
  moneyText:       string;
  startDate:       Date;
  ownership:       OwnershipEnum;
  value?:          number;
}

export enum OwnershipEnum {
  D = "D",
  I = "I",
}

export interface MajorHoldersBreakdown {
  maxAge:                       number;
  insidersPercentHeld:          number;
  institutionsPercentHeld:      number;
  institutionsFloatPercentHeld: number;
  institutionsCount:            number;
}

export interface NetSharePurchaseActivity {
  maxAge:                    number;
  period:                    string;
  buyInfoCount:              number;
  buyInfoShares:             number;
  buyPercentInsiderShares?:  number;
  sellInfoCount:             number;
  sellInfoShares?:           number;
  sellPercentInsiderShares?: number;
  netInfoCount:              number;
  netInfoShares:             number;
  netPercentInsiderShares:   number;
  totalInsiderShares:        number;
}

/*
 * Dates are usually epoch numbers, but including other modules can change
 * result to include an ISODate.
 */
export interface Price {
  averageDailyVolume10Day?:   number;
  averageDailyVolume3Month?:  number;
  exchange:                   string;
  exchangeName:               string;
  exchangeDataDelayedBy:      number;
  maxAge:                     number;
  postMarketChangePercent?:   number;
  postMarketChange?:          number;
  postMarketTime?:            Date;
  postMarketPrice?:           number;
  postMarketSource?:          string;
  preMarketChangePercent?:    number;
  preMarketChange?:           number;
  preMarketTime?:             Date;
  preMarketPrice?:            number;
  preMarketSource?:           string;
  priceHint:                  number;
  regularMarketChangePercent: number;
  regularMarketChange:        number;
  regularMarketTime:          Date;
  regularMarketPrice:         number;
  regularMarketDayHigh?:      number;
  regularMarketDayLow?:       number;
  regularMarketVolume?:       number;
  regularMarketPreviousClose: number;
  regularMarketSource:        string;
  regularMarketOpen?:         number;

  quoteSourceName:            string;
  quoteType:                  string;

  symbol:                     string;
  underlyingSymbol:           null;
  shortName:                  string;
  longName:                   null | string;

  lastMarket:                 null;
  marketState:                string;
  marketCap?:                 number;

  currency:                   string;
  currencySymbol:             string;
  fromCurrency:               string | null;
  toCurrency:                 string | null;
}

export interface QuoteType {
  exchange:               string;
  quoteType:              string;
  symbol:                 string;
  underlyingSymbol:       string;
  shortName:              string;
  longName:               null | string;
  firstTradeDateEpochUtc: number;
  timeZoneFullName:       string;
  timeZoneShortName:      string;
  uuid:                   string;
  messageBoardId:         null | string;
  gmtOffSetMilliseconds:  number;
  maxAge:                 number;
}

export interface RecommendationTrend {
  trend:  RecommendationTrendTrend[];
  maxAge: number;
}

export interface RecommendationTrendTrend {
  period:     string;
  strongBuy:  number;
  buy:        number;
  hold:       number;
  sell:       number;
  strongSell: number;
}

export interface SECFilings {
  filings: Filing[];
  maxAge:  number;
}

export interface Filing {
  date:      string; // TODO
  epochDate: Date;
  type:      Type;
  title:     string;
  edgarUrl:  string;
  maxAge:    number;
}

export enum Type {
  The10K = "10-K",
  The10Q = "10-Q",
  The8K = "8-K",
}

export interface SummaryDetail {
  maxAge:                        number;
  priceHint:                     number;
  previousClose:                 number;
  open?:                         number;
  dayLow?:                       number;
  dayHigh?:                      number;
  regularMarketPreviousClose:    number;
  regularMarketOpen?:            number;
  regularMarketDayLow?:          number;
  regularMarketDayHigh?:         number;
  regularMarketVolume?:          number;
  dividendRate?:                 number;
  dividendYield?:                number;
  exDividendDate?:               Date;
  payoutRatio?:                  number;
  fiveYearAvgDividendYield?:     number;
  beta?:                         number;
  trailingPE?:                   number;
  forwardPE?:                    number;
  volume?:                       number;
  averageVolume:                 number;
  averageVolume10days:           number;
  averageDailyVolume10Day:       number;
  bid?:                          number;
  ask?:                          number;
  bidSize?:                      number;
  askSize?:                      number;
  marketCap?:                    number;
  fiftyTwoWeekLow:               number;
  fiftyTwoWeekHigh:              number;
  priceToSalesTrailing12Months?: number;
  fiftyDayAverage:               number;
  twoHundredDayAverage:          number;
  trailingAnnualDividendRate?:   number;
  trailingAnnualDividendYield?:  number;
  currency:                      string;
  fromCurrency:                  null;
  toCurrency:                    null;
  lastMarket:                    null;
  algorithm:                     null;
  tradeable:                     boolean;
  "yield"?:                      number;
  totalAssets?:                  number;
  navPrice?:                     number;
  ytdReturn?:                    number;
}

export interface SummaryProfile {
  address1?:            string;
  address2?:            string;
  address3?:            string;
  city?:                string;
  state?:               string;
  zip?:                 string;
  country?:             string;
  phone?:               string;
  fax?:                 string;
  website?:             string;
  industry?:            string;
  sector?:              string;
  longBusinessSummary?: string;
  fullTimeEmployees?:   number;
  companyOfficers:      any[];
  maxAge:               number;
}

export interface TopHoldings {
  maxAge:               number;
  stockPosition:        number;
  bondPosition:         number;
  holdings:             TopHoldingsHolding[];
  equityHoldings:       TopHoldingsEquityHoldings;
  bondHoldings:         object;
  bondRatings:          TopHoldingsBondRating[];
  sectorWeightings:     TopHoldingsSectorWeighting[];
  cashPosition?:        number;
  otherPosition?:       number;
  preferredPosition?:   number;
  convertiblePosition?: number;
}

export interface TopHoldingsHolding {
  symbol:              string;
  holdingName:         string;
  holdingPercent:      number;
}

export interface TopHoldingsEquityHoldings {
  medianMarketCap?:            number;
  medianMarketCapCat?:         number;
  priceToBook:                 number;
  priceToBookCat?:             number;
  priceToCashflow:             number;
  priceToCashflowCat?:         number;
  priceToEarnings:             number;
  priceToEarningsCat?:         number;
  priceToSales:                number;
  priceToSalesCat?:            number;
  threeYearEarningsGrowth?:    number;
  threeYearEarningsGrowthCat?: number;
}

export interface TopHoldingsBondRating {
  a?:             number;
  aa?:            number;
  aaa?:           number;
  other?:         number;
  b?:             number;
  bb?:            number;
  bbb?:           number;
  below_b?:       number;
  us_government?: number;
}

export interface TopHoldingsSectorWeighting {
  realestate?:             number;
  consumer_cyclical?:      number;
  basic_materials?:        number;
  consumer_defensive?:     number;
  technology?:             number;
  communication_services?: number;
  financial_services?:     number;
  utilities?:              number;
  industrials?:            number;
  energy?:                 number;
  healthcare?:             number;
}

export interface UpgradeDowngradeHistory {
  history: UpgradeDowngradeHistoryHistory[];
  maxAge:  number;
}

export interface UpgradeDowngradeHistoryHistory {
  epochGradeDate: Date;
  firm:           string;
  toGrade:        Grade;
  fromGrade:      Grade;
  action:         Action;
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
  Buy = "Buy",
  Empty = "",
  EqualWeight = "Equal-Weight",
  GradeEqualWeight = "Equal-weight",
  GradeLongTermBuy = "Long-term Buy",
  Hold = "Hold",
  LongTermBuy = "Long-Term Buy",
  MarketOutperform = "Market Outperform",
  MarketPerform = "Market Perform",
  Negative = "Negative",
  Neutral = "Neutral",
  Outperform = "Outperform",
  Overweight = "Overweight",
  Perform = "Perform",
  Positive = "Positive",
  Reduce = "Reduce",
  SectorOutperform = "Sector Outperform",
  SectorPerform = "Sector Perform",
  SectorWeight = "Sector Weight",
  Sell = "Sell",
  StrongBuy = "Strong Buy",
  Underperform = "Underperform",
  Underweight = "Underweight",
}
