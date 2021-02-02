const _yahooFinanceFetch = require('./yahooFinanceFetch');
const errors = require('./errors');

const _env = require('../env-node').default;

describe('yahooFinanceFetch', () => {

  const yahooFinanceFetch = _yahooFinanceFetch.bind({ _env });

  it('catches errors', () => {
    const url = 'https://query2.finance.yahoo.com/v1/finance/search';

    return expect(
      yahooFinanceFetch(url, {}, { devel: 'search-noOpts' })
    ).rejects.toBeInstanceOf(errors.BadRequestError);
  });

});
