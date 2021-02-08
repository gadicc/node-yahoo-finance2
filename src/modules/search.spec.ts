import search from './search';

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

  it('successfully figure out symbol for Evolution Gaming Group', async () => {
    const response = await yf.search('Apple', {}, { devel: 'search-Evolution Gaming Group.json'});

    const onlyQuotesWithQuoteTypeEquity = response.quotes.filter(
      (searchQuote) => {
        if ('quoteType' in searchQuote && searchQuote.quoteType === 'EQUITY') {
          return true;
        } else {
          return false;
        }
      },
    );

    let symbol;
    if (
      'quoteType' in onlyQuotesWithQuoteTypeEquity[0] &&
      'symbol' in onlyQuotesWithQuoteTypeEquity[0]
    ) {
      symbol = onlyQuotesWithQuoteTypeEquity[0].symbol;
    } else {
      throw new Error(`The quote we found din't have a symbol`);
    }

    expect(symbol).toBe('AAPL');

  });

});
