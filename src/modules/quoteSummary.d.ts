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
 *  4) RawNumberObj type, and transforms: result, resultJson.
 */

export interface QuoteSummaryResultJson {
  assetProfile?:                      AssetProfileJson;
  balanceSheetHistory?:               BalanceSheetHistory;
  balanceSheetHistoryQuarterly?:      BalanceSheetHistory;
  calendarEvents?:                    CalendarEvents;
  cashflowStatementHistory?:          CashflowStatementHistory;
  cashflowStatementHistoryQuarterly?: CashflowStatementHistory;
  defaultKeyStatistics?:              DefaultKeyStatistics;
  earnings?:                          QuoteSummaryEarnings;
  earningsHistory?:                   EarningsHistory;
  earningsTrend?:                     EarningsTrendJson;
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
  secFilings?:                        SECFilingsJson;
  sectorTrend?:                       Trend;
  summaryDetail?:                     SummaryDetailJson;
  summaryProfile?:                    SummaryProfile;
  upgradeDowngradeHistory?:           UpgradeDowngradeHistory;
}

export interface QuoteSummaryResult extends Omit<QuoteSummaryResultJson,
"assetProfile"|"earningsTrend"|"price"|"secFilings"|"summaryDetail">  {
  assetProfile?:                      AssetProfileJson;
  earningsTrend?:                     EarningsTrend;
  price:                              Price;
  secFilings?:                        SECFilings;
  summaryDetail:                      SummaryDetail;
}

export interface AssetProfileJson {
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
  companyOfficers:            CompanyOfficerJson[];
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
export interface AssetProfile extends Omit<AssetProfileJson,
"governanceEpochDate"|"compensationAsOfEpochDate"|"companyOfficers"> {
  governanceEpochDate:        Date;
  compensationAsOfEpochDate?: Date;
  companyOfficers:            CompanyOfficer[];
}

export interface CompanyOfficerJson {
  maxAge:            number;
  name:              string;
  age?:              number;
  title:             string;
  yearBorn?:         number;
  fiscalYear?:       number;
  totalPay?:         RawNumberObj;
  exercisedValue?:   RawNumberObj;
  unexercisedValue?: RawNumberObj;
}
export interface CompanyOfficer extends Omit<CompanyOfficerJson,"totalPay"|"exercisedValue"|"unexercisedValue"> {
  totalPay?:         number|null;
  exercisedValue?:   number|null;
  unexercisedValue?: number|null;
}

export interface BalanceSheetHistory {
  balanceSheetStatements: BalanceSheetStatement[];
  maxAge:                 number;
}

export interface BalanceSheetStatement {
  maxAge:                        number;
  endDate:                       RawNumberObj;
  cash:                          RawNumberObj;
  shortTermInvestments?:         RawNumberObj;
  netReceivables:                RawNumberObj;
  inventory:                     RawNumberObj;
  otherCurrentAssets:            RawNumberObj;
  totalCurrentAssets:            RawNumberObj;
  longTermInvestments:           RawNumberObj;
  propertyPlantEquipment:        RawNumberObj;
  otherAssets:                   RawNumberObj;
  totalAssets:                   RawNumberObj;
  accountsPayable:               RawNumberObj;
  shortLongTermDebt?:            RawNumberObj;
  otherCurrentLiab:              RawNumberObj;
  longTermDebt:                  RawNumberObj;
  otherLiab:                     RawNumberObj;
  totalCurrentLiabilities:       RawNumberObj;
  totalLiab:                     RawNumberObj;
  commonStock?:                  RawNumberObj;
  retainedEarnings:              RawNumberObj;
  treasuryStock:                 RawNumberObj;
  otherStockholderEquity:        RawNumberObj;
  totalStockholderEquity:        RawNumberObj;
  netTangibleAssets:             RawNumberObj;
  goodWill?:                     RawNumberObj;
  intangibleAssets?:             RawNumberObj;
  deferredLongTermAssetCharges?: RawNumberObj;
  deferredLongTermLiab?:         RawNumberObj;
  minorityInterest?:             RawNumberObj;
  capitalSurplus?:               RawNumberObj;
}

export interface RawNumberObj {
  raw?:     number;
  fmt?:     null | string;
  longFmt?: string;
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
  endDate:                               RawNumberObj;
  netIncome:                             RawNumberObj;
  depreciation:                          RawNumberObj;
  changeToNetincome:                     RawNumberObj;
  changeToAccountReceivables?:           RawNumberObj;
  changeToLiabilities:                   RawNumberObj;
  changeToInventory?:                    RawNumberObj;
  changeToOperatingActivities?:          RawNumberObj;
  totalCashFromOperatingActivities:      RawNumberObj;
  capitalExpenditures:                   RawNumberObj;
  investments?:                          RawNumberObj;
  otherCashflowsFromInvestingActivities: RawNumberObj;
  totalCashflowsFromInvestingActivities: RawNumberObj;
  dividendsPaid?:                        RawNumberObj;
  netBorrowings:                         RawNumberObj;
  otherCashflowsFromFinancingActivities: RawNumberObj;
  totalCashFromFinancingActivities:      RawNumberObj;
  changeInCash:                          RawNumberObj;
  repurchaseOfStock?:                    RawNumberObj;
  issuanceOfStock?:                      RawNumberObj;
  effectOfExchangeRate?:                 RawNumberObj;
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
  epsActual:       RawNumberObj;
  epsEstimate:     RawNumberObj;
  epsDifference:   RawNumberObj;
  surprisePercent: RawNumberObj;
  quarter:         RawNumberObj;
  period:          string;
}

export interface EarningsTrendJson {
  trend:  EarningsTrendTrendJson[];
  maxAge: number;
}
export interface EarningsTrend extends Omit<EarningsTrendJson,"trend"> {
  trend:  EarningsTrendTrend[];
  maxAge: number;
}

export interface EarningsTrendTrendJson {
  maxAge:           number;
  period:           string;
  endDate:          string | null;
  growth:           RawNumberObj;
  earningsEstimate: EarningsEstimate;
  revenueEstimate:  RevenueEstimate;
  epsTrend:         EpsTrend;
  epsRevisions:     EpsRevisions;
}
export interface EarningsTrendTrend extends Omit<EarningsTrendTrendJson,"endDate"> {
  endDate:          Date;
}

export interface EarningsEstimate {
  avg:              RawNumberObj;
  low:              RawNumberObj;
  high:             RawNumberObj;
  yearAgoEps:       RawNumberObj;
  numberOfAnalysts: RawNumberObj;
  growth:           RawNumberObj;
}

export interface EpsRevisions {
  upLast7days:    RawNumberObj;
  upLast30days:   RawNumberObj;
  downLast30days: RawNumberObj;
  downLast90days: DiscontinuedOperations;
}

export interface DiscontinuedOperations {
}

export interface EpsTrend {
  current:     RawNumberObj;
  "7daysAgo":  RawNumberObj;
  "30daysAgo": RawNumberObj;
  "60daysAgo": RawNumberObj;
  "90daysAgo": RawNumberObj;
}

export interface RevenueEstimate {
  avg:              RawNumberObj;
  low:              RawNumberObj;
  high:             RawNumberObj;
  numberOfAnalysts: RawNumberObj;
  yearAgoRevenue:   RawNumberObj;
  growth:           RawNumberObj;
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
  reportDate:   RawNumberObj;
  organization: string;
  pctHeld:      RawNumberObj;
  position:     RawNumberObj;
  value:        RawNumberObj;
}

export interface IncomeStatementHistory {
  incomeStatementHistory: IncomeStatementHistoryElement[];
  maxAge:                 number;
}

export interface IncomeStatementHistoryElement {
  maxAge:                            number;
  endDate:                           RawNumberObj;
  totalRevenue:                      RawNumberObj;
  costOfRevenue:                     RawNumberObj;
  grossProfit:                       RawNumberObj;
  researchDevelopment:               RawNumberObj;
  sellingGeneralAdministrative:      RawNumberObj;
  nonRecurring:                      DiscontinuedOperations;
  otherOperatingExpenses:            RawNumberObj;
  totalOperatingExpenses:            RawNumberObj;
  operatingIncome:                   RawNumberObj;
  totalOtherIncomeExpenseNet:        RawNumberObj;
  ebit:                              RawNumberObj;
  interestExpense:                   RawNumberObj;
  incomeBeforeTax:                   RawNumberObj;
  incomeTaxExpense:                  RawNumberObj;
  minorityInterest:                  RawNumberObj;
  netIncomeFromContinuingOps:        RawNumberObj;
  discontinuedOperations:            DiscontinuedOperations;
  extraordinaryItems:                DiscontinuedOperations;
  effectOfAccountingCharges:         DiscontinuedOperations;
  otherItems:                        DiscontinuedOperations;
  netIncome:                         RawNumberObj;
  netIncomeApplicableToCommonShares: RawNumberObj;
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
  latestTransDate:        RawNumberObj;
  positionDirect?:        RawNumberObj;
  positionDirectDate?:    RawNumberObj;
  positionIndirect?:      RawNumberObj;
  positionIndirectDate?:  RawNumberObj;
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
  shares:          RawNumberObj;
  filerUrl:        string;
  transactionText: string;
  filerName:       string;
  filerRelation:   Relation;
  moneyText:       string;
  startDate:       RawNumberObj;
  ownership:       OwnershipEnum;
  value?:          RawNumberObj;
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

export interface SECFilingsJson {
  filings: FilingJson[];
  maxAge:  number;
}
export interface SECFilings extends Omit<SECFilingsJson,"filings"> {
  filings: Filing[];
  maxAge:  number;
}

export interface FilingJson {
  date:      string;
  epochDate: number;
  type:      Type;
  title:     string;
  edgarUrl:  string;
  maxAge:    number;
}
export interface Filing extends Omit<FilingJson,"date"|"epochDate"> {
//  date:      Date;
//  epochDate: number;
  date:       String; // TODO
  epochDate:  Date;
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
