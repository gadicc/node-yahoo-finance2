import search from './search';
const { InvalidOptionsError } = require('../lib/errors');

import _env from '../env-node';
import _fetch from '../lib/yahooFinanceFetch';
import _moduleExec from '../lib/moduleExec';

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true }},
  _moduleExec,
  search
};

const testSearches = [
  "AAPL", // NMS (Nasdaq)
  "OCDO.L", // LSE
  "BABA", // NYSE
  "Evolution Gaming Group", // STO
  "Bayerische Motoren Werke AG", // GER
];

describe('search', () => {

  // See also common module tests in moduleExec.spec.js

  // validate different searches
  testSearches.forEach((search) => {
    it(`passed validation for search: ${search}`, async () => {
      const devel = `search-${search}.json`;
      await yf.search(search, {}, { devel });
    });
  });

});
