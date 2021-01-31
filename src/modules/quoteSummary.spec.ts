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

    describe('price', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-price-AAPL.json';
        await quoteSummary('AAPL', { modules:['price'] }, { devel });
      });

    });

    describe('summaryDetail', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-summaryDetail-AAPL.json';
        await quoteSummary('AAPL', { modules:['summaryDetail'] }, { devel });
      });

    });

  });

});
