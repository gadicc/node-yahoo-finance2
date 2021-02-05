import search from './search';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';
import _moduleExec from '../lib/moduleExec';

const yf = {
  _env,
  _fetch,
  _moduleExec,
  search
};

const testSearches = [
  "AAPL", // NMS (Nasdaq)
  "OCDO.L", // LSE
  "BABA", // NYSE
  "Evolution Gaming Group", // STO
  "Bayerische Motoren Werke AG", // GER
];

describe('search', () => {

  // validate different searches
  testSearches.forEach((search) => {
    it(`passed validation for search: ${search}`, async () => {
      const devel = `search-${search}.json`;
      await yf.search(search, {}, { devel });
    });
  });

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.search('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

  it('throws on unexpected input', async () => {
    await expect(yf.search('AAPL', {}, { devel: 'search-fakeBadResult.json' }))
      .rejects.toThrow(/Failed Yahoo Schema/)
  });

  it('does not throw on unexpected input if called with {validateResult: false}', async () => {
    await expect(yf.search('AAPL', {}, {
      devel: 'search-fakeBadResult.json',
      validateResult: false
    })).resolves.toBeDefined();
  });

});
