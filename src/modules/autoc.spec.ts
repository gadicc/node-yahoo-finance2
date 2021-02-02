import autoc from './autoc';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';

const yf = {
  _env,
  _fetch,
  autoc
};

describe('autoc', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.autoc('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
