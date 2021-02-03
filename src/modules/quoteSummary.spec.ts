import quoteSummary, { QuoteSummaryModules } from './quoteSummary';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';

const yf = {
  _env,
  _fetch,
  quoteSummary
};

function itValidates(name: QuoteSummaryModules|"all", skip:Array<string>=[]) {
  const symbols = ['AAPL','OCDO.L'].filter(s => !skip.includes(s));
  const modules = name === 'all' ? 'all' : [name];
  symbols.forEach(symbol => {
    it(`validates ${symbol}`, async () => {
      const devel = `quoteSummary-${name}-${symbol}.json`;
      await yf.quoteSummary(symbol, { modules }, { devel });
    });
  });
}

describe('quoteSummary', () => {

  describe('quoteSummary', () => {

    it('throws InvalidOptions on invalid options', async () => {
      const rwo = (options:any) => yf.quoteSummary('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
    });

  });

  describe('modules', () => {

    describe('assetProfile', () => {

      itValidates("assetProfile");

    });

    describe('balanceSheetHistory', () => {

      itValidates("balanceSheetHistory");

    });

    describe('balanceSheetHistoryQuarterly', () => {

      itValidates("balanceSheetHistoryQuarterly");

    });

    describe('calendarEvents', () => {

      itValidates("calendarEvents");

    });

    describe('cashflowStatementHistory', () => {

      itValidates("cashflowStatementHistory");

    });

    describe('cashflowStatementHistoryQuarterly', () => {

      itValidates("cashflowStatementHistoryQuarterly");

    });

    describe('defaultKeyStatistics', () => {

      itValidates("defaultKeyStatistics");

    });

    describe('earnings', () => {

      itValidates("earnings");

    });

    describe('earningsHistory', () => {

      itValidates("earningsHistory");

    });

    describe('earningsTrend', () => {

      itValidates("earningsTrend");

    });

    describe('financialData', () => {

      itValidates("financialData");

    });

    describe('fundOwnership', () => {

      itValidates("fundOwnership");

    });

    describe('incomeStatementHistory', () => {

      itValidates("incomeStatementHistory");

    });

    describe('incomeStatementHistoryQuarterly', () => {

      itValidates("incomeStatementHistoryQuarterly");

    });

    describe('indexTrend', () => {

      itValidates("indexTrend");

    });

    describe('industryTrend', () => {

      itValidates("industryTrend");

    });

    describe('insiderHolders', () => {

      itValidates("insiderHolders");

    });

    describe('insiderTransactions', () => {

      itValidates("insiderTransactions");

    });

    describe('institutionOwnership', () => {

      itValidates("institutionOwnership");

    });

    describe('majorDirectHolders', () => {

      itValidates("majorDirectHolders");

    });

    describe('majorHoldersBreakdown', () => {

      itValidates("majorHoldersBreakdown");

    });

    describe('netSharePurchaseActivity', () => {

      itValidates("netSharePurchaseActivity");

    });

    describe('price', () => {

      itValidates("price");

    });

    describe('quoteType', () => {

      itValidates("quoteType");

    });

    describe('recommendationTrend', () => {

      itValidates("recommendationTrend");

    });

    describe('secFilings', () => {

      itValidates("secFilings", ['OCDO.L']);

    });

    describe('summaryDetail', () => {

      itValidates("summaryDetail");

    });

    describe('summaryProfile', () => {

      itValidates("summaryProfile");

    });

    describe('upgradeDowngradeHistory', () => {

      itValidates("upgradeDowngradeHistory", ['OCDO.L']);

    });

  }); /* modules */

  describe('all modules at once', () => {

    // Some modules change the output format of other modules!
    // @ts-ignore
    itValidates("all");

  });

});
