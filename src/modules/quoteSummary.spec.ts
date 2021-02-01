import quoteSummary from './quoteSummary';
const { InvalidOptionsError } = require('../lib/errors');

describe('quoteSummary', () => {

  describe('quoteSummary', () => {

    it('throws InvalidOptions on invalid options', async () => {
      const rwo = (options:any) => quoteSummary('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
    });

  });

  describe('modules', () => {

    describe('assetProfile', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-assetProfile-AAPL.json';
        await quoteSummary('AAPL', { modules:['assetProfile'] }, { devel });
      });

    });

    describe('balanceSheetHistory', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-balanceSheetHistory-AAPL.json';
        await quoteSummary('AAPL', { modules:['balanceSheetHistory'] }, { devel });
      });

    });

    describe('balanceSheetHistoryQuarterly', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-balanceSheetHistoryQuarterly-AAPL.json';
        await quoteSummary('AAPL', { modules:['balanceSheetHistoryQuarterly'] }, { devel });
      });

    });

    describe('calendarEvents', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-calendarEvents-AAPL.json';
        await quoteSummary('AAPL', { modules:['calendarEvents'] }, { devel });
      });

    });

    describe('cashflowStatementHistory', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-cashflowStatementHistory-AAPL.json';
        await quoteSummary('AAPL', { modules:['cashflowStatementHistory'] }, { devel });
      });

    });

    describe('cashflowStatementHistoryQuarterly', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-cashflowStatementHistoryQuarterly-AAPL.json';
        await quoteSummary('AAPL', { modules:['cashflowStatementHistoryQuarterly'] }, { devel });
      });

    });

    describe('defaultKeyStatistics', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-defaultKeyStatistics-AAPL.json';
        await quoteSummary('AAPL', { modules:['defaultKeyStatistics'] }, { devel });
      });

    });

    describe('earnings', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-earnings-AAPL.json';
        await quoteSummary('AAPL', { modules:['earnings'] }, { devel });
      });

    });

    describe('earningsHistory', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-earningsHistory-AAPL.json';
        await quoteSummary('AAPL', { modules:['earningsHistory'] }, { devel });
      });

    });

    describe('earningsTrend', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-earningsTrend-AAPL.json';
        await quoteSummary('AAPL', { modules:['earningsTrend'] }, { devel });
      });

    });

    describe('financialData', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-financialData-AAPL.json';
        await quoteSummary('AAPL', { modules:['financialData'] }, { devel });
      });

    });

    describe('fundOwnership', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-fundOwnership-AAPL.json';
        await quoteSummary('AAPL', { modules:['fundOwnership'] }, { devel });
      });

    });

    describe('incomeStatementHistory', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-incomeStatementHistory-AAPL.json';
        await quoteSummary('AAPL', { modules:['incomeStatementHistory'] }, { devel });
      });

    });

    describe('incomeStatementHistoryQuarterly', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-incomeStatementHistoryQuarterly-AAPL.json';
        await quoteSummary('AAPL', { modules:['incomeStatementHistoryQuarterly'] }, { devel });
      });

    });

    describe('indexTrend', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-indexTrend-AAPL.json';
        await quoteSummary('AAPL', { modules:['indexTrend'] }, { devel });
      });

    });

    describe('industryTrend', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-industryTrend-AAPL.json';
        await quoteSummary('AAPL', { modules:['industryTrend'] }, { devel });
      });

    });

    describe('insiderHolders', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-insiderHolders-AAPL.json';
        await quoteSummary('AAPL', { modules:['insiderHolders'] }, { devel });
      });

    });

    describe('insiderTransactions', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-insiderTransactions-AAPL.json';
        await quoteSummary('AAPL', { modules:['insiderTransactions'] }, { devel });
      });

    });

    describe('institutionOwnership', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-institutionOwnership-AAPL.json';
        await quoteSummary('AAPL', { modules:['institutionOwnership'] }, { devel });
      });

    });

    describe('majorDirectHolders', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-majorDirectHolders-AAPL.json';
        await quoteSummary('AAPL', { modules:['majorDirectHolders'] }, { devel });
      });

    });

    describe('majorHoldersBreakdown', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-majorHoldersBreakdown-AAPL.json';
        await quoteSummary('AAPL', { modules:['majorHoldersBreakdown'] }, { devel });
      });

    });

    describe('netSharePurchaseActivity', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-netSharePurchaseActivity-AAPL.json';
        await quoteSummary('AAPL', { modules:['netSharePurchaseActivity'] }, { devel });
      });

    });

    describe('price', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-price-AAPL.json';
        await quoteSummary('AAPL', { modules:['price'] }, { devel });
      });

    });

    describe('quoteType', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-quoteType-AAPL.json';
        await quoteSummary('AAPL', { modules:['quoteType'] }, { devel });
      });

    });

    describe('recommendationTrend', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-recommendationTrend-AAPL.json';
        await quoteSummary('AAPL', { modules:['recommendationTrend'] }, { devel });
      });

    });

    describe('secFilings', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-secFilings-AAPL.json';
        await quoteSummary('AAPL', { modules:['secFilings'] }, { devel });
      });

    });

    describe('summaryDetail', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-summaryDetail-AAPL.json';
        await quoteSummary('AAPL', { modules:['summaryDetail'] }, { devel });
      });

    });

    describe('summaryProfile', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-summaryProfile-AAPL.json';
        await quoteSummary('AAPL', { modules:['summaryProfile'] }, { devel });
      });

    });

    describe('upgradeDowngradeHistory', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-upgradeDowngradeHistory-AAPL.json';
        await quoteSummary('AAPL', { modules:['upgradeDowngradeHistory'] }, { devel });
      });

    });

  });

});
