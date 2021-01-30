import autoc from './autoc';
const { InvalidOptionsError } = require('../lib/errors');

describe('autoc', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => autoc('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
