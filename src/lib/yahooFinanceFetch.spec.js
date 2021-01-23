const yahooFinanceFetch = require('./yahooFinanceFetch');
const errors = require('./errors');

describe('yahooFinanceFetch', () => {

  it('catches errors', () => {
    const url = 'https://query2.finance.yahoo.com/v1/finance/search';

    return expect(
      yahooFinanceFetch(url, {}, { devel: 'search-noOpts' })
    ).rejects.toBeInstanceOf(errors.BadRequestError);
  });

});
