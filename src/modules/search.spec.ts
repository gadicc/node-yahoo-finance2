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

describe('search', () => {

  it('passes validation', async () => {
    await yf.search('AAPL', {}, { devel: "search-AAPL.json" });
  });

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.search('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
