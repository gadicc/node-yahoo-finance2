import autoc from './autoc';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';
import _moduleExec from '../lib/moduleExec';

const yf = {
  _env,
  _fetch,
  _moduleExec,
  autoc
};

describe('autoc', () => {

  it('passes validation', async () => {
    await yf.autoc('AAPL', {}, { devel: "autoc-AAPL.json" })
  });

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.autoc('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

  it('throws on unexpected input', async () => {
    // intentionally return output from "search" API
    // i.e. invalid input for "autoc"
    await expect(yf.autoc('AAPL', {}, { devel: 'search-AAPL.json' }))
      .rejects.toThrow(/Unexpected result/)
  });

});
