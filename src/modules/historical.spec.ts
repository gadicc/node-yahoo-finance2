import historical from './historical';
const { InvalidOptionsError } = require('../lib/errors');

describe('historical', () => {

  it('throws InvalidOptions on invalid options', async () => {
    const rwo = (options:any) => historical('symbol', options);
    await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
  });

});
