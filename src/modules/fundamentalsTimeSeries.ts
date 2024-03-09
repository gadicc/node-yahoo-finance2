import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

export const FundamentalsTimeSeries_Types: Record<string, any> = {
  quarterly: "quarterlyTreasurySharesNumber,quarterlyPreferredSharesNumber,quarterlyOrdinarySharesNumber,quarterlyShareIssued,quarterlyNetDebt,quarterlyTotalDebt,quarterlyTangibleBookValue,quarterlyInvestedCapital,quarterlyWorkingCapital,quarterlyNetTangibleAssets,quarterlyCapitalLeaseObligations,quarterlyCommonStockEquity,quarterlyPreferredStockEquity,quarterlyTotalCapitalization,quarterlyTotalEquityGrossMinorityInterest,quarterlyMinorityInterest,quarterlyStockholdersEquity,quarterlyOtherEquityInterest,quarterlyGainsLossesNotAffectingRetainedEarnings,quarterlyOtherEquityAdjustments,quarterlyFixedAssetsRevaluationReserve,quarterlyForeignCurrencyTranslationAdjustments,quarterlyMinimumPensionLiabilities,quarterlyUnrealizedGainLoss,quarterlyTreasuryStock,quarterlyRetainedEarnings,quarterlyAdditionalPaidInCapital,quarterlyCapitalStock,quarterlyOtherCapitalStock,quarterlyCommonStock,quarterlyPreferredStock,quarterlyTotalPartnershipCapital,quarterlyGeneralPartnershipCapital,quarterlyLimitedPartnershipCapital,quarterlyTotalLiabilitiesNetMinorityInterest,quarterlyTotalNonCurrentLiabilitiesNetMinorityInterest,quarterlyOtherNonCurrentLiabilities,quarterlyLiabilitiesHeldforSaleNonCurrent,quarterlyRestrictedCommonStock,quarterlyPreferredSecuritiesOutsideStockEquity,quarterlyDerivativeProductLiabilities,quarterlyEmployeeBenefits,quarterlyNonCurrentPensionAndOtherPostretirementBenefitPlans,quarterlyNonCurrentAccruedExpenses,quarterlyDuetoRelatedPartiesNonCurrent,quarterlyTradeandOtherPayablesNonCurrent,quarterlyNonCurrentDeferredLiabilities,quarterlyNonCurrentDeferredRevenue,quarterlyNonCurrentDeferredTaxesLiabilities,quarterlyLongTermDebtAndCapitalLeaseObligation,quarterlyLongTermCapitalLeaseObligation,quarterlyLongTermDebt,quarterlyLongTermProvisions,quarterlyCurrentLiabilities,quarterlyOtherCurrentLiabilities,quarterlyCurrentDeferredLiabilities,quarterlyCurrentDeferredRevenue,quarterlyCurrentDeferredTaxesLiabilities,quarterlyCurrentDebtAndCapitalLeaseObligation,quarterlyCurrentCapitalLeaseObligation,quarterlyCurrentDebt,quarterlyOtherCurrentBorrowings,quarterlyLineOfCredit,quarterlyCommercialPaper,quarterlyCurrentNotesPayable,quarterlyPensionandOtherPostRetirementBenefitPlansCurrent,quarterlyCurrentProvisions,quarterlyPayablesAndAccruedExpenses,quarterlyCurrentAccruedExpenses,quarterlyInterestPayable,quarterlyPayables,quarterlyOtherPayable,quarterlyDuetoRelatedPartiesCurrent,quarterlyDividendsPayable,quarterlyTotalTaxPayable,quarterlyIncomeTaxPayable,quarterlyAccountsPayable,quarterlyTotalAssets,quarterlyTotalNonCurrentAssets,quarterlyOtherNonCurrentAssets,quarterlyDefinedPensionBenefit,quarterlyNonCurrentPrepaidAssets,quarterlyNonCurrentDeferredAssets,quarterlyNonCurrentDeferredTaxesAssets,quarterlyDuefromRelatedPartiesNonCurrent,quarterlyNonCurrentNoteReceivables,quarterlyNonCurrentAccountsReceivable,quarterlyFinancialAssets,quarterlyInvestmentsAndAdvances,quarterlyOtherInvestments,quarterlyInvestmentinFinancialAssets,quarterlyHeldToMaturitySecurities,quarterlyAvailableForSaleSecurities,quarterlyFinancialAssetsDesignatedasFairValueThroughProfitorLossTotal,quarterlyTradingSecurities,quarterlyLongTermEquityInvestment,quarterlyInvestmentsinJointVenturesatCost,quarterlyInvestmentsInOtherVenturesUnderEquityMethod,quarterlyInvestmentsinAssociatesatCost,quarterlyInvestmentsinSubsidiariesatCost,quarterlyInvestmentProperties,quarterlyGoodwillAndOtherIntangibleAssets,quarterlyOtherIntangibleAssets,quarterlyGoodwill,quarterlyNetPPE,quarterlyAccumulatedDepreciation,quarterlyGrossPPE,quarterlyLeases,quarterlyConstructionInProgress,quarterlyOtherProperties,quarterlyMachineryFurnitureEquipment,quarterlyBuildingsAndImprovements,quarterlyLandAndImprovements,quarterlyProperties,quarterlyCurrentAssets,quarterlyOtherCurrentAssets,quarterlyHedgingAssetsCurrent,quarterlyAssetsHeldForSaleCurrent,quarterlyCurrentDeferredAssets,quarterlyCurrentDeferredTaxesAssets,quarterlyRestrictedCash,quarterlyPrepaidAssets,quarterlyInventory,quarterlyInventoriesAdjustmentsAllowances,quarterlyOtherInventories,quarterlyFinishedGoods,quarterlyWorkInProcess,quarterlyRawMaterials,quarterlyReceivables,quarterlyReceivablesAdjustmentsAllowances,quarterlyOtherReceivables,quarterlyDuefromRelatedPartiesCurrent,quarterlyTaxesReceivable,quarterlyAccruedInterestReceivable,quarterlyNotesReceivable,quarterlyLoansReceivable,quarterlyAccountsReceivable,quarterlyAllowanceForDoubtfulAccountsReceivable,quarterlyGrossAccountsReceivable,quarterlyCashCashEquivalentsAndShortTermInvestments,quarterlyOtherShortTermInvestments,quarterlyCashAndCashEquivalents,quarterlyCashEquivalents,quarterlyCashFinancial",
  annual: "annualTaxEffectOfUnusualItems,trailingTaxEffectOfUnusualItems,annualTaxRateForCalcs,trailingTaxRateForCalcs,annualNormalizedEBITDA,trailingNormalizedEBITDA,annualNormalizedDilutedEPS,trailingNormalizedDilutedEPS,annualNormalizedBasicEPS,trailingNormalizedBasicEPS,annualTotalUnusualItems,trailingTotalUnusualItems,annualTotalUnusualItemsExcludingGoodwill,trailingTotalUnusualItemsExcludingGoodwill,annualNetIncomeFromContinuingOperationNetMinorityInterest,trailingNetIncomeFromContinuingOperationNetMinorityInterest,annualReconciledDepreciation,trailingReconciledDepreciation,annualReconciledCostOfRevenue,trailingReconciledCostOfRevenue,annualEBITDA,trailingEBITDA,annualEBIT,trailingEBIT,annualNetInterestIncome,trailingNetInterestIncome,annualInterestExpense,trailingInterestExpense,annualInterestIncome,trailingInterestIncome,annualContinuingAndDiscontinuedDilutedEPS,trailingContinuingAndDiscontinuedDilutedEPS,annualContinuingAndDiscontinuedBasicEPS,trailingContinuingAndDiscontinuedBasicEPS,annualNormalizedIncome,trailingNormalizedIncome,annualNetIncomeFromContinuingAndDiscontinuedOperation,trailingNetIncomeFromContinuingAndDiscontinuedOperation,annualTotalExpenses,trailingTotalExpenses,annualRentExpenseSupplemental,trailingRentExpenseSupplemental,annualReportedNormalizedDilutedEPS,trailingReportedNormalizedDilutedEPS,annualReportedNormalizedBasicEPS,trailingReportedNormalizedBasicEPS,annualTotalOperatingIncomeAsReported,trailingTotalOperatingIncomeAsReported,annualDividendPerShare,trailingDividendPerShare,annualDilutedAverageShares,trailingDilutedAverageShares,annualBasicAverageShares,trailingBasicAverageShares,annualDilutedEPS,trailingDilutedEPS,annualDilutedEPSOtherGainsLosses,trailingDilutedEPSOtherGainsLosses,annualTaxLossCarryforwardDilutedEPS,trailingTaxLossCarryforwardDilutedEPS,annualDilutedAccountingChange,trailingDilutedAccountingChange,annualDilutedExtraordinary,trailingDilutedExtraordinary,annualDilutedDiscontinuousOperations,trailingDilutedDiscontinuousOperations,annualDilutedContinuousOperations,trailingDilutedContinuousOperations,annualBasicEPS,trailingBasicEPS,annualBasicEPSOtherGainsLosses,trailingBasicEPSOtherGainsLosses,annualTaxLossCarryforwardBasicEPS,trailingTaxLossCarryforwardBasicEPS,annualBasicAccountingChange,trailingBasicAccountingChange,annualBasicExtraordinary,trailingBasicExtraordinary,annualBasicDiscontinuousOperations,trailingBasicDiscontinuousOperations,annualBasicContinuousOperations,trailingBasicContinuousOperations,annualDilutedNIAvailtoComStockholders,trailingDilutedNIAvailtoComStockholders,annualAverageDilutionEarnings,trailingAverageDilutionEarnings,annualNetIncomeCommonStockholders,trailingNetIncomeCommonStockholders,annualOtherunderPreferredStockDividend,trailingOtherunderPreferredStockDividend,annualPreferredStockDividends,trailingPreferredStockDividends,annualNetIncome,trailingNetIncome,annualMinorityInterests,trailingMinorityInterests,annualNetIncomeIncludingNoncontrollingInterests,trailingNetIncomeIncludingNoncontrollingInterests,annualNetIncomeFromTaxLossCarryforward,trailingNetIncomeFromTaxLossCarryforward,annualNetIncomeExtraordinary,trailingNetIncomeExtraordinary,annualNetIncomeDiscontinuousOperations,trailingNetIncomeDiscontinuousOperations,annualNetIncomeContinuousOperations,trailingNetIncomeContinuousOperations,annualEarningsFromEquityInterestNetOfTax,trailingEarningsFromEquityInterestNetOfTax,annualTaxProvision,trailingTaxProvision,annualPretaxIncome,trailingPretaxIncome,annualOtherIncomeExpense,trailingOtherIncomeExpense,annualOtherNonOperatingIncomeExpenses,trailingOtherNonOperatingIncomeExpenses,annualSpecialIncomeCharges,trailingSpecialIncomeCharges,annualGainOnSaleOfPPE,trailingGainOnSaleOfPPE,annualGainOnSaleOfBusiness,trailingGainOnSaleOfBusiness,annualOtherSpecialCharges,trailingOtherSpecialCharges,annualWriteOff,trailingWriteOff,annualImpairmentOfCapitalAssets,trailingImpairmentOfCapitalAssets,annualRestructuringAndMergernAcquisition,trailingRestructuringAndMergernAcquisition,annualSecuritiesAmortization,trailingSecuritiesAmortization,annualEarningsFromEquityInterest,trailingEarningsFromEquityInterest,annualGainOnSaleOfSecurity,trailingGainOnSaleOfSecurity,annualNetNonOperatingInterestIncomeExpense,trailingNetNonOperatingInterestIncomeExpense,annualTotalOtherFinanceCost,trailingTotalOtherFinanceCost,annualInterestExpenseNonOperating,trailingInterestExpenseNonOperating,annualInterestIncomeNonOperating,trailingInterestIncomeNonOperating,annualOperatingIncome,trailingOperatingIncome,annualOperatingExpense,trailingOperatingExpense,annualOtherOperatingExpenses,trailingOtherOperatingExpenses,annualOtherTaxes,trailingOtherTaxes,annualProvisionForDoubtfulAccounts,trailingProvisionForDoubtfulAccounts,annualDepreciationAmortizationDepletionIncomeStatement,trailingDepreciationAmortizationDepletionIncomeStatement,annualDepletionIncomeStatement,trailingDepletionIncomeStatement,annualDepreciationAndAmortizationInIncomeStatement,trailingDepreciationAndAmortizationInIncomeStatement,annualAmortization,trailingAmortization,annualAmortizationOfIntangiblesIncomeStatement,trailingAmortizationOfIntangiblesIncomeStatement,annualDepreciationIncomeStatement,trailingDepreciationIncomeStatement,annualResearchAndDevelopment,trailingResearchAndDevelopment,annualSellingGeneralAndAdministration,trailingSellingGeneralAndAdministration,annualSellingAndMarketingExpense,trailingSellingAndMarketingExpense,annualGeneralAndAdministrativeExpense,trailingGeneralAndAdministrativeExpense,annualOtherGandA,trailingOtherGandA,annualInsuranceAndClaims,trailingInsuranceAndClaims,annualRentAndLandingFees,trailingRentAndLandingFees,annualSalariesAndWages,trailingSalariesAndWages,annualGrossProfit,trailingGrossProfit,annualCostOfRevenue,trailingCostOfRevenue,annualTotalRevenue,trailingTotalRevenue,annualExciseTaxes,trailingExciseTaxes,annualOperatingRevenue,trailingOperatingRevenue"
};

export type FundamentalsTimeSeriesResults = Array<FundamentalsTimeSeriesResult>;

export interface FundamentalsTimeSeriesResult {
  [key: string]: any;
  date: Date;
}

export interface FundamentalsTimeSeriesOptions {
  period1: Date | number | string;
  period2?: Date | number | string;
  type?: string;
  merge?: boolean; // This returns a completely different format that will break the transformer
  padTimeSeries?: boolean; // Not exactly sure what this does, assume it pads p1 and p2???
  lang?: string;
  region?: string;
}

const queryOptionsDefaults: Omit<FundamentalsTimeSeriesOptions, "period1"> = {
  merge: false,
  padTimeSeries: true,
  lang: "en-US",
  region: "US",
  type: "quarterly"
};

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<FundamentalsTimeSeriesResult>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function fundamentalsTimeSeries(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: FundamentalsTimeSeriesOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "options",

    query: {
      assertSymbol: symbol,
      url: `https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${symbol}`,
      needsCrumb: false,
      schemaKey: "#/definitions/FundamentalsTimeSeriesOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions: FundamentalsTimeSeriesOptions) {
        // Convert dates
        if (!queryOptions.period2) queryOptions.period2 = new Date();
        const dates = ["period1", "period2"] as const;
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date)
            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
          else if (typeof value === "string") {
            const timestamp = new Date(value as string).getTime();

            if (isNaN(timestamp))
              throw new Error(
                "yahooFinance.historical() option '" +
                  fieldName +
                  "' invalid date provided: '" +
                  value +
                  "'"
              );

            queryOptions[fieldName] = Math.floor(timestamp / 1000);
          }
        }

        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error(
            "yahooFinance.historical() options `period1` and `period2` " +
              "cannot share the same value."
          );
        }

        // Add timeseries types
        if (!FundamentalsTimeSeries_Types[queryOptions.type || '']) {
          throw new Error(
            "yahooFinance.fundamentalsTimeSeries() option type invalid."
          );
        }
        queryOptions.type = FundamentalsTimeSeries_Types[queryOptions.type || '']

        return queryOptions;
      },
    },

    result: {
      schemaKey: "#/definitions/FundamentalsTimeSeriesResults",
      transformWith(response: any) {
        if (!response.timeseries)
          throw new Error("Unexpected result: " + JSON.stringify(response));
        if (response.timeseries.error)
          throw new Error("Error: " + JSON.stringify(response.timeseries.error));

        const keyedByTimestamp: Record<string, any> = {}
        for (let ct = 0; ct < response.timeseries.result.length; ct++) {
          const result = response.timeseries.result[ct];
          if (!result.timestamp || !result.timestamp.length) {continue;}
          for (let ct = 0; ct < result.timestamp.length; ct++) {
            const timestamp = result.timestamp[ct];
            const dataKey = Object.keys(result)[2]

            if (!keyedByTimestamp[timestamp]) {keyedByTimestamp[timestamp] = {date: timestamp}}
            if (!result[dataKey][ct] || !result[dataKey][ct].reportedValue || !result[dataKey][ct].reportedValue.raw) {continue;}
            keyedByTimestamp[timestamp][dataKey] = result[dataKey][ct].reportedValue.raw
          }
        }

        return Object.keys(keyedByTimestamp).map(k => keyedByTimestamp[k])
      },
    },

    moduleOptions,
  });
}
