import autoc from './autoc';
const { InvalidOptionsError } = require('../lib/errors');

import testYf from '../../tests/testYf';

const yf = testYf({ autoc });

describe('autoc', () => {

  // See also common module tests in moduleExec.spec.js

  it('passes validation', async () => {
    await yf.autoc('AAPL', {}, { devel: "autoc-AAPL.json" })
  });

  if (process.env.FETCH_DEVEL !== "nocache")
  it('throws on unexpected input', async () => {
    await expect(yf.autoc('AAPL', {}, { devel: 'weirdJsonResult.fake.json' }))
      .rejects.toThrow(/Unexpected result/)
  });

});
