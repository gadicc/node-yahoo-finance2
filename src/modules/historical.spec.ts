import historical from './historical';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';
import _moduleExec from '../lib/moduleExec';

const yf = {
  _env,
  _fetch,
  _moduleExec,
  historical
};

describe('historical', () => {

  it('passes validation', async () => {
    const result = await yf.historical('AAPL', {
      period1: "2020-01-01",
      period2: "2020-01-03",
    }, { devel: "historical-AAPL-2020-01-01-to-2020-01-03.json"});
  });

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.historical('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
