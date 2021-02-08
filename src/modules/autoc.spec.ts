import autoc from './autoc';
const { InvalidOptionsError } = require('../lib/errors');

import testYf from '../../tests/testYf';

const yf = testYf({ autoc });

describe('autoc', () => {

  // See also common module tests in moduleExec.spec.js

  it('passes validation', async () => {
    await yf.autoc('AAPL', {}, { devel: "autoc-AAPL.json" })
  });

  it('throws on unexpected input', async () => {
    // intentionally return output from "search" API
    // i.e. invalid input for "autoc"
    await expect(yf.autoc('AAPL', {}, { devel: 'search-AAPL.json' }))
      .rejects.toThrow(/Unexpected result/)
  });

});
