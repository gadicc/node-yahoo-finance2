import historical from './historical';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';

const yf = {
  _env,
  _fetch,
  historical
};

describe('historical', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => yf.historical('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
