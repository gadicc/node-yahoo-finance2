import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

import Timeseries_Keys from "../lib/timeseries.json" with { type: "json" };
import { getTypedDefinitions } from "../lib/validate/index.ts";

// @yf-schema: see the docs on how this file is automatically updated.
import schema from "./fundamentalsTimeSeries.schema.json" with { type: "json" };
const definitions = getTypedDefinitions(schema);

export type FundamentalsTimeSeries_Period = "3M" | "12M";
export const FundamentalsTimeSeries_Types = ["quarterly", "annual", "trailing"];

export const FundamentalsTimeSeries_Modules = [
  "financials",
  "balance-sheet",
  "cash-flow",
  "all",
];

export interface FundamentalsTimeSeriesFinancialsResult {
  date: Date;
  TYPE: "FINANCIALS";
  periodType: FundamentalsTimeSeries_Period;
  totalRevenue?: number;
  operatingRevenue?: number;
  costOfRevenue?: number;
  grossProfit?: number;
  sellingGeneralAndAdministration?: number;
  sellingAndMarketingExpense?: number;
  generalAndAdministrativeExpense?: number;
  otherGandA?: number;
  researchAndDevelopment?: number;
  depreciationAmortizationDepletionIncomeStatement?: number;
  depletionIncomeStatement?: number;
  depreciationAndAmortizationInIncomeStatement?: number;
  amortization?: number;
  amortizationOfIntangiblesIncomeStatement?: number;
  depreciationIncomeStatement?: number;
  otherOperatingExpenses?: number;
  operatingExpense?: number;
  operatingIncome?: number;
  interestExpenseNonOperating?: number;
  interestIncomeNonOperating?: number;
  totalOtherFinanceCost?: number;
  netNonOperatingInterestIncomeExpense?: number;
  writeOff?: number;
  specialIncomeCharges?: number;
  gainOnSaleOfPPE?: number;
  gainOnSaleOfBusiness?: number;
  gainOnSaleOfSecurity?: number;
  otherSpecialCharges?: number;
  otherIncomeExpense?: number;
  otherNonOperatingIncomeExpenses?: number;
  totalExpenses?: number;
  pretaxIncome?: number;
  taxProvision?: number;
  netIncomeContinuousOperations?: number;
  netIncomeIncludingNoncontrollingInterests?: number;
  minorityInterests?: number;
  netIncomeFromTaxLossCarryforward?: number;
  netIncomeExtraordinary?: number;
  netIncomeDiscontinuousOperations?: number;
  preferredStockDividends?: number;
  otherunderPreferredStockDividend?: number;
  netIncomeCommonStockholders?: number;
  netIncome?: number;
  basicAverageShares?: number;
  dilutedAverageShares?: number;
  dividendPerShare?: number;
  reportedNormalizedBasicEPS?: number;
  continuingAndDiscontinuedBasicEPS?: number;
  basicEPSOtherGainsLosses?: number;
  taxLossCarryforwardBasicEPS?: number;
  normalizedBasicEPS?: number;
  basicEPS?: number;
  basicAccountingChange?: number;
  basicExtraordinary?: number;
  basicDiscontinuousOperations?: number;
  basicContinuousOperations?: number;
  reportedNormalizedDilutedEPS?: number;
  continuingAndDiscontinuedDilutedEPS?: number;
  taxLossCarryforwardDilutedEPS?: number;
  averageDilutionEarnings?: number;
  normalizedDilutedEPS?: number;
  dilutedEPS?: number;
  dilutedAccountingChange?: number;
  dilutedExtraordinary?: number;
  dilutedContinuousOperations?: number;
  dilutedDiscontinuousOperations?: number;
  dilutedNIAvailtoComStockholders?: number;
  dilutedEPSOtherGainsLosses?: number;
  totalOperatingIncomeAsReported?: number;
  netIncomeFromContinuingAndDiscontinuedOperation?: number;
  normalizedIncome?: number;
  netInterestIncome?: number;
  EBIT?: number;
  EBITDA?: number;
  reconciledCostOfRevenue?: number;
  reconciledDepreciation?: number;
  netIncomeFromContinuingOperationNetMinorityInterest?: number;
  totalUnusualItemsExcludingGoodwill?: number;
  totalUnusualItems?: number;
  normalizedEBITDA?: number;
  taxRateForCalcs?: number;
  taxEffectOfUnusualItems?: number;
  rentExpenseSupplemental?: number;
  earningsFromEquityInterestNetOfTax?: number;
  impairmentOfCapitalAssets?: number;
  restructuringAndMergernAcquisition?: number;
  securitiesAmortization?: number;
  earningsFromEquityInterest?: number;
  otherTaxes?: number;
  provisionForDoubtfulAccounts?: number;
  insuranceAndClaims?: number;
  rentAndLandingFees?: number;
  salariesAndWages?: number;
  exciseTaxes?: number;
  interestExpense?: number;
  interestIncome?: number;
  totalMoneyMarketInvestments?: number;
  interestIncomeAfterProvisionForLoanLoss?: number;
  otherThanPreferredStockDividend?: number;
  lossonExtinguishmentofDebt?: number;
  incomefromAssociatesandOtherParticipatingInterests?: number;
  nonInterestExpense?: number;
  otherNonInterestExpense?: number;
  professionalExpenseAndContractServicesExpense?: number;
  occupancyAndEquipment?: number;
  equipment?: number;
  netOccupancyExpense?: number;
  creditLossesProvision?: number;
  nonInterestIncome?: number;
  otherNonInterestIncome?: number;
  gainLossonSaleofAssets?: number;
  gainonSaleofInvestmentProperty?: number;
  gainonSaleofLoans?: number;
  foreignExchangeTradingGains?: number;
  tradingGainLoss?: number;
  investmentBankingProfit?: number;
  dividendIncome?: number;
  feesAndCommissions?: number;
  feesandCommissionExpense?: number;
  feesandCommissionIncome?: number;
  otherCustomerServices?: number;
  creditCard?: number;
  securitiesActivities?: number;
  trustFeesbyCommissions?: number;
  serviceChargeOnDepositorAccounts?: number;
  totalPremiumsEarned?: number;
  otherInterestExpense?: number;
  interestExpenseForFederalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell?:
    number;
  interestExpenseForLongTermDebtAndCapitalSecurities?: number;
  interestExpenseForShortTermDebt?: number;
  interestExpenseForDeposit?: number;
  otherInterestIncome?: number;
  interestIncomeFromFederalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell?:
    number;
  interestIncomeFromDeposits?: number;
  interestIncomeFromSecurities?: number;
  interestIncomeFromLoansAndLease?: number;
  interestIncomeFromLeases?: number;
  interestIncomeFromLoans?: number;
  depreciationDepreciationIncomeStatement?: number;
  operationAndMaintenance?: number;
  otherCostofRevenue?: number;
  explorationDevelopmentAndMineralPropertyLeaseExpenses?: number;
}

export interface FundamentalsTimeSeriesBalanceSheetResult {
  date: Date;
  TYPE: "BALANCE_SHEET";
  periodType: FundamentalsTimeSeries_Period;
  netDebt?: number;
  treasurySharesNumber?: number;
  preferredSharesNumber?: number;
  ordinarySharesNumber?: number;
  shareIssued?: number;
  totalDebt?: number;
  tangibleBookValue?: number;
  investedCapital?: number;
  workingCapital?: number;
  netTangibleAssets?: number;
  capitalLeaseObligations?: number;
  commonStockEquity?: number;
  preferredStockEquity?: number;
  totalCapitalization?: number;
  totalEquityGrossMinorityInterest?: number;
  minorityInterest?: number;
  stockholdersEquity?: number;
  otherEquityInterest?: number;
  gainsLossesNotAffectingRetainedEarnings?: number;
  otherEquityAdjustments?: number;
  fixedAssetsRevaluationReserve?: number;
  foreignCurrencyTranslationAdjustments?: number;
  minimumPensionLiabilities?: number;
  unrealizedGainLoss?: number;
  treasuryStock?: number;
  retainedEarnings?: number;
  additionalPaidInCapital?: number;
  capitalStock?: number;
  otherCapitalStock?: number;
  commonStock?: number;
  preferredStock?: number;
  totalPartnershipCapital?: number;
  generalPartnershipCapital?: number;
  limitedPartnershipCapital?: number;
  totalLiabilitiesNetMinorityInterest?: number;
  totalNonCurrentLiabilitiesNetMinorityInterest?: number;
  otherNonCurrentLiabilities?: number;
  liabilitiesHeldforSaleNonCurrent?: number;
  restrictedCommonStock?: number;
  preferredSecuritiesOutsideStockEquity?: number;
  derivativeProductLiabilities?: number;
  employeeBenefits?: number;
  nonCurrentPensionAndOtherPostretirementBenefitPlans?: number;
  nonCurrentAccruedExpenses?: number;
  duetoRelatedPartiesNonCurrent?: number;
  tradeandOtherPayablesNonCurrent?: number;
  nonCurrentDeferredLiabilities?: number;
  nonCurrentDeferredRevenue?: number;
  nonCurrentDeferredTaxesLiabilities?: number;
  longTermDebtAndCapitalLeaseObligation?: number;
  longTermCapitalLeaseObligation?: number;
  longTermDebt?: number;
  longTermProvisions?: number;
  currentLiabilities?: number;
  otherCurrentLiabilities?: number;
  currentDeferredLiabilities?: number;
  currentDeferredRevenue?: number;
  currentDeferredTaxesLiabilities?: number;
  currentDebtAndCapitalLeaseObligation?: number;
  currentCapitalLeaseObligation?: number;
  currentDebt?: number;
  otherCurrentBorrowings?: number;
  lineOfCredit?: number;
  commercialPaper?: number;
  currentNotesPayable?: number;
  pensionandOtherPostRetirementBenefitPlansCurrent?: number;
  currentProvisions?: number;
  payablesAndAccruedExpenses?: number;
  currentAccruedExpenses?: number;
  interestPayable?: number;
  payables?: number;
  otherPayable?: number;
  duetoRelatedPartiesCurrent?: number;
  dividendsPayable?: number;
  totalTaxPayable?: number;
  incomeTaxPayable?: number;
  accountsPayable?: number;
  totalAssets?: number;
  totalNonCurrentAssets?: number;
  otherNonCurrentAssets?: number;
  definedPensionBenefit?: number;
  nonCurrentPrepaidAssets?: number;
  nonCurrentDeferredAssets?: number;
  nonCurrentDeferredTaxesAssets?: number;
  duefromRelatedPartiesNonCurrent?: number;
  nonCurrentNoteReceivables?: number;
  nonCurrentAccountsReceivable?: number;
  financialAssets?: number;
  investmentsAndAdvances?: number;
  otherInvestments?: number;
  investmentinFinancialAssets?: number;
  heldToMaturitySecurities?: number;
  availableForSaleSecurities?: number;
  financialAssetsDesignatedasFairValueThroughProfitorLossTotal?: number;
  tradingSecurities?: number;
  longTermEquityInvestment?: number;
  investmentsinJointVenturesatCost?: number;
  investmentsInOtherVenturesUnderEquityMethod?: number;
  investmentsinAssociatesatCost?: number;
  investmentsinSubsidiariesatCost?: number;
  investmentProperties?: number;
  goodwillAndOtherIntangibleAssets?: number;
  otherIntangibleAssets?: number;
  goodwill?: number;
  netPPE?: number;
  accumulatedDepreciation?: number;
  grossPPE?: number;
  leases?: number;
  constructionInProgress?: number;
  otherProperties?: number;
  machineryFurnitureEquipment?: number;
  buildingsAndImprovements?: number;
  landAndImprovements?: number;
  properties?: number;
  currentAssets?: number;
  otherCurrentAssets?: number;
  hedgingAssetsCurrent?: number;
  assetsHeldForSaleCurrent?: number;
  currentDeferredAssets?: number;
  currentDeferredTaxesAssets?: number;
  restrictedCash?: number;
  prepaidAssets?: number;
  inventory?: number;
  inventoriesAdjustmentsAllowances?: number;
  otherInventories?: number;
  finishedGoods?: number;
  workInProcess?: number;
  rawMaterials?: number;
  receivables?: number;
  receivablesAdjustmentsAllowances?: number;
  otherReceivables?: number;
  duefromRelatedPartiesCurrent?: number;
  taxesReceivable?: number;
  accruedInterestReceivable?: number;
  notesReceivable?: number;
  loansReceivable?: number;
  accountsReceivable?: number;
  allowanceForDoubtfulAccountsReceivable?: number;
  grossAccountsReceivable?: number;
  cashCashEquivalentsAndShortTermInvestments?: number;
  otherShortTermInvestments?: number;
  cashAndCashEquivalents?: number;
  cashEquivalents?: number;
  cashFinancial?: number;
  otherLiabilities?: number;
  liabilitiesOfDiscontinuedOperations?: number;
  subordinatedLiabilities?: number;
  advanceFromFederalHomeLoanBanks?: number;
  tradingLiabilities?: number;
  duetoRelatedParties?: number;
  securitiesLoaned?: number;
  federalFundsPurchasedAndSecuritiesSoldUnderAgreementToRepurchase?: number;
  financialInstrumentsSoldUnderAgreementsToRepurchase?: number;
  federalFundsPurchased?: number;
  totalDeposits?: number;
  nonInterestBearingDeposits?: number;
  interestBearingDepositsLiabilities?: number;
  customerAccounts?: number;
  depositsbyBank?: number;
  otherAssets?: number;
  assetsHeldForSale?: number;
  deferredAssets?: number;
  deferredTaxAssets?: number;
  dueFromRelatedParties?: number;
  allowanceForNotesReceivable?: number;
  grossNotesReceivable?: number;
  netLoan?: number;
  unearnedIncome?: number;
  allowanceForLoansAndLeaseLosses?: number;
  grossLoan?: number;
  otherLoanAssets?: number;
  mortgageLoan?: number;
  consumerLoan?: number;
  commercialLoan?: number;
  loansHeldForSale?: number;
  derivativeAssets?: number;
  securitiesAndInvestments?: number;
  bankOwnedLifeInsurance?: number;
  otherRealEstateOwned?: number;
  foreclosedAssets?: number;
  customerAcceptances?: number;
  federalHomeLoanBankStock?: number;
  securityBorrowed?: number;
  cashCashEquivalentsAndFederalFundsSold?: number;
  moneyMarketInvestments?: number;
  federalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell?: number;
  securityAgreeToBeResell?: number;
  federalFundsSold?: number;
  restrictedCashAndInvestments?: number;
  restrictedInvestments?: number;
  restrictedCashAndCashEquivalents?: number;
  interestBearingDepositsAssets?: number;
  cashAndDueFromBanks?: number;
  bankIndebtedness?: number;
  mineralProperties?: number;
  netPPEPurchaseAndSale?: number;
  purchaseOfInvestment?: number;
  investingCashFlow?: number;
  grossProfit?: number;
  cashFlowFromContinuingOperatingActivities?: number;
  endCashPosition?: number;
  netIncomeCommonStockholders?: number;
  changeInAccountPayable?: number;
  otherNonCashItems?: number;
  cashDividendsPaid?: number;
  dilutedAverageShares?: number;
  repurchaseOfCapitalStock?: number;
  EBITDA?: number;
  stockBasedCompensation?: number;
  commonStockDividendPaid?: number;
  changeInPayable?: number;
  costOfRevenue?: number;
  operatingExpense?: number;
  changeInInventory?: number;
  normalizedIncome?: number;
  netIncomeIncludingNoncontrollingInterests?: number;
  netIncomeFromContinuingOperationNetMinorityInterest?: number;
  reconciledCostOfRevenue?: number;
  otherIncomeExpense?: number;
  netInvestmentPurchaseAndSale?: number;
  purchaseOfPPE?: number;
  taxProvision?: number;
  pretaxIncome?: number;
  researchAndDevelopment?: number;
  longTermDebtPayments?: number;
  changeInReceivables?: number;
  dilutedEPS?: number;
  netIssuancePaymentsOfDebt?: number;
  netShortTermDebtIssuance?: number;
  depreciationAndAmortization?: number;
  cashFlowFromContinuingInvestingActivities?: number;
  beginningCashPosition?: number;
  changesInCash?: number;
  financingCashFlow?: number;
  changeInOtherCurrentLiabilities?: number;
  changeInWorkingCapital?: number;
  operatingIncome?: number;
  totalRevenue?: number;
  netIncomeFromContinuingAndDiscontinuedOperation?: number;
  operatingRevenue?: number;
  changeInPayablesAndAccruedExpense?: number;
  netCommonStockIssuance?: number;
  commonStockPayments?: number;
  EBIT?: number;
  netOtherInvestingChanges?: number;
  basicEPS?: number;
  shortTermDebtPayments?: number;
  sellingGeneralAndAdministration?: number;
  netIncomeContinuousOperations?: number;
  repaymentOfDebt?: number;
  totalOperatingIncomeAsReported?: number;
  normalizedEBITDA?: number;
  capitalExpenditure?: number;
  cashFlowFromContinuingFinancingActivities?: number;
  netIncome?: number;
  netOtherFinancingCharges?: number;
  basicAverageShares?: number;
  netLongTermDebtIssuance?: number;
  depreciationAmortizationDepletion?: number;
  operatingCashFlow?: number;
  dilutedNIAvailtoComStockholders?: number;
  netIncomeFromContinuingOperations?: number;
  taxRateForCalcs?: number;
  freeCashFlow?: number;
  otherNonOperatingIncomeExpenses?: number;
  changesInAccountReceivables?: number;
  totalExpenses?: number;
  changeInOtherCurrentAssets?: number;
  reconciledDepreciation?: number;
  incomeTaxPaidSupplementalData?: number;
  saleOfInvestment?: number;
  interestPaidSupplementalData?: number;
  deferredTax?: number;
  changeInOtherWorkingCapital?: number;
  interestIncomeNonOperating?: number;
  issuanceOfDebt?: number;
  purchaseOfBusiness?: number;
  longTermDebtIssuance?: number;
  interestIncome?: number;
  netInterestIncome?: number;
  deferredIncomeTax?: number;
  interestExpense?: number;
  netNonOperatingInterestIncomeExpense?: number;
  interestExpenseNonOperating?: number;
  netBusinessPurchaseAndSale?: number;
}

export interface FundamentalsTimeSeriesCashFlowResult {
  date: Date;
  TYPE: "CASH_FLOW";
  periodType: FundamentalsTimeSeries_Period;
  freeCashFlow?: number;
  foreignSales?: number;
  domesticSales?: number;
  adjustedGeographySegmentData?: number;
  repurchaseOfCapitalStock?: number;
  repaymentOfDebt?: number;
  issuanceOfDebt?: number;
  issuanceOfCapitalStock?: number;
  capitalExpenditure?: number;
  interestPaidSupplementalData?: number;
  incomeTaxPaidSupplementalData?: number;
  endCashPosition?: number;
  otherCashAdjustmentOutsideChangeinCash?: number;
  beginningCashPosition?: number;
  effectOfExchangeRateChanges?: number;
  changesInCash?: number;
  otherCashAdjustmentInsideChangeinCash?: number;
  cashFlowFromDiscontinuedOperation?: number;
  financingCashFlow?: number;
  cashFromDiscontinuedFinancingActivities?: number;
  cashFlowFromContinuingFinancingActivities?: number;
  netOtherFinancingCharges?: number;
  interestPaidCFF?: number;
  proceedsFromStockOptionExercised?: number;
  cashDividendsPaid?: number;
  preferredStockDividendPaid?: number;
  commonStockDividendPaid?: number;
  netPreferredStockIssuance?: number;
  preferredStockPayments?: number;
  preferredStockIssuance?: number;
  netCommonStockIssuance?: number;
  commonStockPayments?: number;
  commonStockIssuance?: number;
  netIssuancePaymentsOfDebt?: number;
  netShortTermDebtIssuance?: number;
  shortTermDebtPayments?: number;
  shortTermDebtIssuance?: number;
  netLongTermDebtIssuance?: number;
  longTermDebtPayments?: number;
  longTermDebtIssuance?: number;
  investingCashFlow?: number;
  cashFromDiscontinuedInvestingActivities?: number;
  cashFlowFromContinuingInvestingActivities?: number;
  netOtherInvestingChanges?: number;
  interestReceivedCFI?: number;
  dividendsReceivedCFI?: number;
  netInvestmentPurchaseAndSale?: number;
  saleOfInvestment?: number;
  purchaseOfInvestment?: number;
  netInvestmentPropertiesPurchaseAndSale?: number;
  saleOfInvestmentProperties?: number;
  purchaseOfInvestmentProperties?: number;
  netBusinessPurchaseAndSale?: number;
  saleOfBusiness?: number;
  purchaseOfBusiness?: number;
  netIntangiblesPurchaseAndSale?: number;
  saleOfIntangibles?: number;
  purchaseOfIntangibles?: number;
  netPPEPurchaseAndSale?: number;
  saleOfPPE?: number;
  purchaseOfPPE?: number;
  capitalExpenditureReported?: number;
  operatingCashFlow?: number;
  cashFromDiscontinuedOperatingActivities?: number;
  cashFlowFromContinuingOperatingActivities?: number;
  taxesRefundPaid?: number;
  interestReceivedCFO?: number;
  interestPaidCFO?: number;
  dividendReceivedCFO?: number;
  dividendPaidCFO?: number;
  changeInWorkingCapital?: number;
  changeInOtherWorkingCapital?: number;
  changeInOtherCurrentLiabilities?: number;
  changeInOtherCurrentAssets?: number;
  changeInPayablesAndAccruedExpense?: number;
  changeInAccruedExpense?: number;
  changeInInterestPayable?: number;
  changeInPayable?: number;
  changeInDividendPayable?: number;
  changeInAccountPayable?: number;
  changeInTaxPayable?: number;
  changeInIncomeTaxPayable?: number;
  changeInPrepaidAssets?: number;
  changeInInventory?: number;
  changeInReceivables?: number;
  changesInAccountReceivables?: number;
  otherNonCashItems?: number;
  excessTaxBenefitFromStockBasedCompensation?: number;
  stockBasedCompensation?: number;
  unrealizedGainLossOnInvestmentSecurities?: number;
  provisionandWriteOffofAssets?: number;
  assetImpairmentCharge?: number;
  amortizationOfSecurities?: number;
  deferredTax?: number;
  deferredIncomeTax?: number;
  depletion?: number;
  depreciationAndAmortization?: number;
  amortizationCashFlow?: number;
  amortizationOfIntangibles?: number;
  depreciation?: number;
  operatingGainsLosses?: number;
  pensionAndEmployeeBenefitExpense?: number;
  earningsLossesFromEquityInvestments?: number;
  gainLossOnInvestmentSecurities?: number;
  netForeignCurrencyExchangeGainLoss?: number;
  gainLossOnSaleOfPPE?: number;
  gainLossOnSaleOfBusiness?: number;
  netIncomeFromContinuingOperations?: number;
  cashFlowsfromusedinOperatingActivitiesDirect?: number;
  taxesRefundPaidDirect?: number;
  interestReceivedDirect?: number;
  interestPaidDirect?: number;
  dividendsReceivedDirect?: number;
  dividendsPaidDirect?: number;
  classesofCashPayments?: number;
  otherCashPaymentsfromOperatingActivities?: number;
  paymentsonBehalfofEmployees?: number;
  paymentstoSuppliersforGoodsandServices?: number;
  classesofCashReceiptsfromOperatingActivities?: number;
  otherCashReceiptsfromOperatingActivities?: number;
  receiptsfromGovernmentGrants?: number;
  receiptsfromCustomers?: number;
  increaseDecreaseInDeposit?: number;
  changeInFederalFundsAndSecuritiesSoldForRepurchase?: number;
  netProceedsPaymentForLoan?: number;
  paymentForLoans?: number;
  proceedsFromLoans?: number;
  proceedsPaymentInInterestBearingDepositsInBank?: number;
  increaseinInterestBearingDepositsinBank?: number;
  decreaseinInterestBearingDepositsinBank?: number;
  proceedsPaymentFederalFundsSoldAndSecuritiesPurchasedUnderAgreementToResell?:
    number;
  changeInLoans?: number;
  changeInDeferredCharges?: number;
  provisionForLoanLeaseAndOtherLosses?: number;
  amortizationOfFinancingCostsAndDiscounts?: number;
  depreciationAmortizationDepletion?: number;
  realizedGainLossOnSaleOfLoansAndLease?: number;
  allTaxesPaid?: number;
  interestandCommissionPaid?: number;
  cashPaymentsforLoans?: number;
  cashPaymentsforDepositsbyBanksandCustomers?: number;
  cashReceiptsfromFeesandCommissions?: number;
  cashReceiptsfromSecuritiesRelatedActivities?: number;
  cashReceiptsfromLoans?: number;
  cashReceiptsfromDepositsbyBanksandCustomers?: number;
  cashReceiptsfromTaxRefunds?: number;
  AmortizationAmortizationCashFlow?: number;
}

export type FundamentalsTimeSeriesResult =
  | FundamentalsTimeSeriesBalanceSheetResult
  | FundamentalsTimeSeriesCashFlowResult
  | FundamentalsTimeSeriesFinancialsResult;

export type FundamentalsTimeSeriesResults = Array<FundamentalsTimeSeriesResult>;

export interface FundamentalsTimeSeriesOptions {
  period1: Date | number | string;
  period2?: Date | number | string;
  type?: string;
  merge?: boolean; // This returns a completely different format that will break the transformer
  padTimeSeries?: boolean; // Not exactly sure what this does, assume it pads p1 and p2???
  lang?: string;
  region?: string;
  module: string;
}

const queryOptionsDefaults: Omit<
  FundamentalsTimeSeriesOptions,
  "period1" | "module"
> = {
  merge: false,
  padTimeSeries: true,
  lang: "en-US",
  region: "US",
  type: "quarterly",
};

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<FundamentalsTimeSeriesResult[]>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
  // deno-lint-ignore no-explicit-any
): Promise<any>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptions,
  // deno-lint-ignore no-explicit-any
): Promise<any> {
  return this._moduleExec({
    moduleName: "options",

    query: {
      assertSymbol: symbol,
      url:
        `https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${symbol}`,
      needsCrumb: false,
      definitions,
      schemaKey: "#/definitions/FundamentalsTimeSeriesOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith: processQuery,
    },

    result: {
      definitions,
      schemaKey: "#/definitions/FundamentalsTimeSeriesResults",
      // deno-lint-ignore no-explicit-any
      transformWith(response: any) {
        if (!response || !response.timeseries) {
          throw new Error(`Unexpected result: ${JSON.stringify(response)}`);
        }

        return processResponse(response);
      },
    },

    moduleOptions,
  });
}

/**
 * Transform the input options into query parameters.
 * The options module defines which keys that are used in the query.
 * The keys are joined together into the query parameter type and
 * pre-fixed with the options type (e.g. annualTotalRevenue).
 * @param queryOptions Input query options.
 * @returns Query parameters.
 */
export const processQuery = function (
  queryOptions: FundamentalsTimeSeriesOptions,
): Partial<FundamentalsTimeSeriesOptions> {
  // Convert dates
  if (!queryOptions.period2) queryOptions.period2 = new Date();
  const dates = ["period1", "period2"] as const;

  for (const fieldName of dates) {
    const value = queryOptions[fieldName];
    if (value instanceof Date) {
      queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
    } else if (typeof value === "string") {
      const timestamp = new Date(value as string).getTime();

      if (isNaN(timestamp)) {
        throw new Error(
          "yahooFinance.fundamentalsTimeSeries() option '" +
            fieldName +
            "' invalid date provided: '" +
            value +
            "'",
        );
      }

      queryOptions[fieldName] = Math.floor(timestamp / 1000);
    }
  }

  // Validate query parameters.
  if (queryOptions.period1 === queryOptions.period2) {
    throw new Error(
      "yahooFinance.fundamentalsTimeSeries() options `period1` and `period2` " +
        "cannot share the same value.",
    );
  } else if (!FundamentalsTimeSeries_Types.includes(queryOptions.type || "")) {
    throw new Error(
      "yahooFinance.fundamentalsTimeSeries() option type invalid.",
    );
  } else if (
    !FundamentalsTimeSeries_Modules.includes(queryOptions.module || "")
  ) {
    throw new Error(
      "yahooFinance.fundamentalsTimeSeries() option module invalid.",
    );
  }

  // Join the keys for the module into query types.
  const keys = Object.entries(Timeseries_Keys).reduce(
    (previous: Array<string>, [module, keys]) => {
      if (queryOptions.module == "all") {
        return previous.concat(keys);
      } else if (module == queryOptions.module) {
        return previous.concat(keys);
      } else return previous;
    },
    [] as Array<string>,
  );
  const queryType = queryOptions.type + keys.join(`,${queryOptions.type}`);

  return {
    period1: queryOptions.period1,
    period2: queryOptions.period2,
    type: queryType,
  };
};

/**
 * Transforms the time-series into an array with reported values per period.
 * Each object represents a period and its properties are the data points.
 * Financial statement content variates and keys are skipped when empty.
 * The query keys include the option type  (e.g. annualTotalRevenue).
 * In the response the type is removed (e.g. totalRevenue) for
 * easier mapping by the client.
 * @param response Query response.
 * @returns Formatted response.
 */
// deno-lint-ignore no-explicit-any
export const processResponse = function (response: any): any {
  // deno-lint-ignore no-explicit-any
  const keyedByTimestamp: Record<string, any> = {};
  const replace = new RegExp(FundamentalsTimeSeries_Types.join("|"));

  for (let ct = 0; ct < response.timeseries.result.length; ct++) {
    let periodType = "UNKNOWN";
    const result = response.timeseries.result[ct];
    if (!result.timestamp || !result.timestamp.length) {
      continue;
    }
    for (let ct = 0; ct < result.timestamp.length; ct++) {
      const timestamp = result.timestamp[ct];
      const dataKey = Object.keys(result)[2];

      if (!keyedByTimestamp[timestamp]) {
        keyedByTimestamp[timestamp] = { date: timestamp };
      }
      if (
        !result[dataKey][ct] ||
        !result[dataKey][ct].reportedValue ||
        !result[dataKey][ct].reportedValue.raw
      ) {
        continue;
      }

      const short = dataKey.replace(replace, "");
      const key = short == short.toUpperCase()
        ? short
        : short[0].toLowerCase() + short.slice(1);
      keyedByTimestamp[timestamp][key] = result[dataKey][ct].reportedValue.raw;

      const thisPeriodType = result[dataKey][ct].periodType;
      if (thisPeriodType) {
        if (periodType !== "UNKNOWN" && periodType !== thisPeriodType) {
          throw new Error(
            "periodType mismatch - please report " + periodType + " " +
              thisPeriodType,
          );
        }
        periodType = thisPeriodType;
        keyedByTimestamp[timestamp].periodType = periodType;
      } else {
        console.log("missing periodType", keyedByTimestamp[timestamp]);
      }
    }
  }

  return Object.keys(keyedByTimestamp).map((k) => {
    // Let's such make validation errors a bit easier to understand
    let TYPE = "UNKNOWN - please report this issue";
    if (keyedByTimestamp[k].netDebt) {
      TYPE = "BALANCE_SHEET";
    } else if (keyedByTimestamp[k].issuanceOfDebt) {
      TYPE = "CASH_FLOW";
    } else if (keyedByTimestamp[k].netIncome) {
      TYPE = "FINANCIALS";
    }

    return {
      TYPE,
      ...keyedByTimestamp[k],
    };
  });
};
