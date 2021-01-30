import search from './search';
const { InvalidOptionsError } = require('../lib/errors');

describe('search', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => search('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
