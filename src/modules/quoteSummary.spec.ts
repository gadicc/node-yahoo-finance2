import quoteSummary from './quoteSummary';
const { InvalidOptionsError } = require('../lib/errors');

describe('quoteSummary', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => quoteSummary('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
