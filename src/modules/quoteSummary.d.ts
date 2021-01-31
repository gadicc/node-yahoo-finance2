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
 */

export interface QuoteSummaryResultJson {
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
  price?:                             PriceJson;
  quoteType?:                         QuoteType;
  recommendationTrend?:               RecommendationTrend;
  secFilings?:                        SECFilings;
  sectorTrend?:                       Trend;
  summaryDetail?:                     SummaryDetailJson;
  summaryProfile?:                    SummaryProfile;
  upgradeDowngradeHistory?:           UpgradeDowngradeHistory;
}

export interface QuoteSummaryResult extends Omit<QuoteSummaryResultJson,"price"|
"summaryDetail">  {
  price:                              Price;
  summaryDetail:                      SummaryDetail;
}

export interface AssetProfile {
  address1:                   string;
  city:                       string;
  state?:                     string;
  zip:                        string;
  country:                    string;
  phone:                      string;
  website:                    string;
  industry:                   string;
  sector:                     string;
  longBusinessSummary:        string;
  fullTimeEmployees:          number;
  companyOfficers:            CompanyOfficer[];
  auditRisk:                  number;
  boardRisk:                  number;
  compensationRisk:           number;
  shareHolderRightsRisk:      number;
  overallRisk:                number;
  governanceEpochDate:        number;
  compensationAsOfEpochDate?: number;
  maxAge:                     number;
  address2?:                  string;
  fax?:                       string;
}

export interface CompanyOfficer {
  maxAge:           number;
  name:             string;
  age?:             number;
  title:            string;
  yearBorn?:        number;
  fiscalYear?:      number;
  totalPay?:        ExercisedValue;
  exercisedValue:   ExercisedValue;
  unexercisedValue: ExercisedValue;
}

export interface ExercisedValue {
  raw?:     number;
  fmt?:     null | string;
  longFmt?: string;
}

export interface BalanceSheetHistory {
  balanceSheetStatements: BalanceSheetStatement[];
  maxAge:                 number;
}

export interface BalanceSheetStatement {
  maxAge:                        number;
  endDate:                       DateObj;
  cash:                          ExercisedValue;
  shortTermInvestments?:         ExercisedValue;
  netReceivables:                ExercisedValue;
  inventory:                     ExercisedValue;
  otherCurrentAssets:            ExercisedValue;
  totalCurrentAssets:            ExercisedValue;
  longTermInvestments:           ExercisedValue;
  propertyPlantEquipment:        ExercisedValue;
  otherAssets:                   ExercisedValue;
  totalAssets:                   ExercisedValue;
  accountsPayable:               ExercisedValue;
  shortLongTermDebt?:            ExercisedValue;
  otherCurrentLiab:              ExercisedValue;
  longTermDebt:                  ExercisedValue;
  otherLiab:                     ExercisedValue;
  totalCurrentLiabilities:       ExercisedValue;
  totalLiab:                     ExercisedValue;
  commonStock?:                  ExercisedValue;
  retainedEarnings:              ExercisedValue;
  treasuryStock:                 ExercisedValue;
  otherStockholderEquity:        ExercisedValue;
  totalStockholderEquity:        ExercisedValue;
  netTangibleAssets:             ExercisedValue;
  goodWill?:                     ExercisedValue;
  intangibleAssets?:             ExercisedValue;
  deferredLongTermAssetCharges?: ExercisedValue;
  deferredLongTermLiab?:         ExercisedValue;
  minorityInterest?:             ExercisedValue;
  capitalSurplus?:               ExercisedValue;
}

export interface DateObj {
  raw: number;
  fmt: string;
}

export interface CalendarEvents {
  maxAge:          number;
  earnings:        CalendarEventsEarnings;
  exDividendDate?: number;
  dividendDate?:   number;
}

export interface CalendarEventsEarnings {
  earningsDate:     number[];
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
  endDate:                               DateObj;
  netIncome:                             ExercisedValue;
  depreciation:                          ExercisedValue;
  changeToNetincome:                     ExercisedValue;
  changeToAccountReceivables?:           ExercisedValue;
  changeToLiabilities:                   ExercisedValue;
  changeToInventory?:                    ExercisedValue;
  changeToOperatingActivities?:          ExercisedValue;
  totalCashFromOperatingActivities:      ExercisedValue;
  capitalExpenditures:                   ExercisedValue;
  investments?:                          ExercisedValue;
  otherCashflowsFromInvestingActivities: ExercisedValue;
  totalCashflowsFromInvestingActivities: ExercisedValue;
  dividendsPaid?:                        ExercisedValue;
  netBorrowings:                         ExercisedValue;
  otherCashflowsFromFinancingActivities: ExercisedValue;
  totalCashFromFinancingActivities:      ExercisedValue;
  changeInCash:                          ExercisedValue;
  repurchaseOfStock?:                    ExercisedValue;
  issuanceOfStock?:                      ExercisedValue;
  effectOfExchangeRate?:                 ExercisedValue;
}

export interface DefaultKeyStatistics {
  maxAge:                        number;
  priceHint:                     number;
  enterpriseValue:               number;
  forwardPE?:                    number;
  profitMargins:                 number;
  floatShares:                   number;
  sharesOutstanding:             number;
  sharesShort?:                  number;
  sharesShortPriorMonth?:        number;
  sharesShortPreviousMonthDate?: number;
  dateShortInterest?:            number;
  sharesPercentSharesOut?:       number;
  heldPercentInsiders:           number;
  heldPercentInstitutions:       number;
  shortRatio?:                   number;
  shortPercentOfFloat?:          number;
  beta:                          number;
  category:                      null;
  bookValue:                     number;
  priceToBook:                   number;
  fundFamily:                    null;
  legalType:                     null;
  lastFiscalYearEnd:             number;
  nextFiscalYearEnd:             number;
  mostRecentQuarter:             number;
  earningsQuarterlyGrowth?:      number;
  netIncomeToCommon?:            number;
  trailingEps:                   number;
  forwardEps?:                   number;
  pegRatio?:                     number;
  lastSplitFactor:               null | string;
  lastSplitDate?:                number;
  enterpriseToRevenue?:          number;
  enterpriseToEbitda?:           number;
  "52WeekChange":                number;
  SandP52WeekChange:             number;
  lastDividendValue?:            number;
  lastDividendDate?:             number;
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
  earningsDate:                number[];
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
  epsActual:       DateObj;
  epsEstimate:     DateObj;
  epsDifference:   DateObj;
  surprisePercent: DateObj;
  quarter:         DateObj;
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
  growth:           DateObj;
  earningsEstimate: EarningsEstimate;
  revenueEstimate:  RevenueEstimate;
  epsTrend:         EpsTrend;
  epsRevisions:     EpsRevisions;
}

export interface EarningsEstimate {
  avg:              DateObj;
  low:              DateObj;
  high:             DateObj;
  yearAgoEps:       DateObj;
  numberOfAnalysts: ExercisedValue;
  growth:           DateObj;
}

export interface EpsRevisions {
  upLast7days:    ExercisedValue;
  upLast30days:   ExercisedValue;
  downLast30days: ExercisedValue;
  downLast90days: DiscontinuedOperations;
}

export interface DiscontinuedOperations {
}

export interface EpsTrend {
  current:     DateObj;
  "7daysAgo":  DateObj;
  "30daysAgo": DateObj;
  "60daysAgo": DateObj;
  "90daysAgo": DateObj;
}

export interface RevenueEstimate {
  avg:              ExercisedValue;
  low:              ExercisedValue;
  high:             ExercisedValue;
  numberOfAnalysts: ExercisedValue;
  yearAgoRevenue:   ExercisedValue;
  growth:           DateObj;
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
  reportDate:   DateObj;
  organization: string;
  pctHeld:      DateObj;
  position:     ExercisedValue;
  value:        ExercisedValue;
}

export interface IncomeStatementHistory {
  incomeStatementHistory: IncomeStatementHistoryElement[];
  maxAge:                 number;
}

export interface IncomeStatementHistoryElement {
  maxAge:                            number;
  endDate:                           DateObj;
  totalRevenue:                      ExercisedValue;
  costOfRevenue:                     ExercisedValue;
  grossProfit:                       ExercisedValue;
  researchDevelopment:               ExercisedValue;
  sellingGeneralAdministrative:      ExercisedValue;
  nonRecurring:                      DiscontinuedOperations;
  otherOperatingExpenses:            ExercisedValue;
  totalOperatingExpenses:            ExercisedValue;
  operatingIncome:                   ExercisedValue;
  totalOtherIncomeExpenseNet:        ExercisedValue;
  ebit:                              ExercisedValue;
  interestExpense:                   ExercisedValue;
  incomeBeforeTax:                   ExercisedValue;
  incomeTaxExpense:                  ExercisedValue;
  minorityInterest:                  ExercisedValue;
  netIncomeFromContinuingOps:        ExercisedValue;
  discontinuedOperations:            DiscontinuedOperations;
  extraordinaryItems:                DiscontinuedOperations;
  effectOfAccountingCharges:         DiscontinuedOperations;
  otherItems:                        DiscontinuedOperations;
  netIncome:                         ExercisedValue;
  netIncomeApplicableToCommonShares: ExercisedValue;
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
  latestTransDate:        DateObj;
  positionDirect?:        ExercisedValue;
  positionDirectDate?:    DateObj;
  positionIndirect?:      ExercisedValue;
  positionIndirectDate?:  DateObj;
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
  shares:          ExercisedValue;
  filerUrl:        string;
  transactionText: string;
  filerName:       string;
  filerRelation:   Relation;
  moneyText:       string;
  startDate:       DateObj;
  ownership:       OwnershipEnum;
  value?:          ExercisedValue;
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
export interface PriceJson {
  maxAge:                     number;
  preMarketSource?:           string;
  preMarketTime?:             number|string;
  postMarketChangePercent?:   number;
  postMarketChange?:          number;
  postMarketTime?:            number|string;
  postMarketPrice?:           number;
  postMarketSource?:          string;
  regularMarketChangePercent: number;
  regularMarketChange:        number;
  regularMarketTime:          number|string;
  priceHint:                  number;
  regularMarketPrice:         number;
  regularMarketDayHigh:       number;
  regularMarketDayLow:        number;
  regularMarketVolume:        number;
  averageDailyVolume10Day?:   number;
  averageDailyVolume3Month?:  number;
  regularMarketPreviousClose: number;
  regularMarketSource:        string;
  regularMarketOpen:          number;
  exchange:                   string;
  exchangeName:               string;
  exchangeDataDelayedBy:      number;
  marketState:                string;
  quoteType:                  string;
  symbol:                     string;
  underlyingSymbol:           null;
  shortName:                  string;
  longName:                   null | string;
  currency:                   string;
  quoteSourceName:            string;
  currencySymbol:             string;
  fromCurrency:               null;
  toCurrency:                 null;
  lastMarket:                 null;
  marketCap?:                 number;
}
export interface Price extends Omit<PriceJson,"postMarketTime"|"regularMarketTime"|"preMarketTime"> {
  preMarketTime?:             Date;
  postMarketTime?:            Date;
  regularMarketTime?:         Date;
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
  messageBoardId:         string;
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
  date:      Date;
  epochDate: number;
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

export interface SummaryDetailJson {
  maxAge:                        number;
  priceHint:                     number;
  previousClose:                 number;
  open:                          number;
  dayLow:                        number;
  dayHigh:                       number;
  regularMarketPreviousClose:    number;
  regularMarketOpen:             number;
  regularMarketDayLow:           number;
  regularMarketDayHigh:          number;
  dividendRate?:                 number;
  dividendYield?:                number;
  exDividendDate?:               number;
  payoutRatio?:                  number;
  fiveYearAvgDividendYield?:     number;
  beta?:                         number;
  trailingPE?:                   number;
  forwardPE?:                    number;
  volume:                        number;
  regularMarketVolume:           number;
  averageVolume:                 number;
  averageVolume10days:           number;
  averageDailyVolume10Day:       number;
  bid:                           number;
  ask:                           number;
  bidSize:                       number;
  askSize:                       number;
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
}
export interface SummaryDetail extends Omit<SummaryDetailJson,"exDividendDate"> {
  exDividendDate?:               Date;
}

export interface SummaryProfile {
  address1:            string;
  city:                string;
  state?:              string;
  zip:                 string;
  country:             string;
  phone:               string;
  website:             string;
  industry:            string;
  sector:              string;
  longBusinessSummary: string;
  fullTimeEmployees:   number;
  companyOfficers:     any[];
  maxAge:              number;
  address2?:           string;
  fax?:                string;
}

export interface UpgradeDowngradeHistory {
  history: UpgradeDowngradeHistoryHistory[];
  maxAge:  number;
}

export interface UpgradeDowngradeHistoryHistory {
  epochGradeDate: number;
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
