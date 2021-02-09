import recommendationsBySymbol from './recommendationsBySymbol';
import { testSymbols } from '../../tests/symbols';

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';
import _moduleExec from '../lib/moduleExec';

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true }},
  _moduleExec,
  recommendationsBySymbol
};

describe('recommendationsBySymbol', () => {

  // make sure it passes validation for some symbols
  testSymbols.forEach((symbol) => {
    it(`passes validation for symbol: ${symbol}`, async () => {
      const devel = `recommendationsBySymbol-${symbol}.json`;
      await yf.recommendationsBySymbol(symbol, {}, { devel });
    });
  });

  // make sure it passes validation for multiple symbols
  it(`passes validation for multiple symbols ("AAPL" and "BMW.DE")`, async () => {
    const devel = `recommendationsBySymbol-AAPL-BMW.DE.json`;
    await yf.recommendationsBySymbol(['AAPL', 'BMW.DE'], {}, { devel });
  });

});
