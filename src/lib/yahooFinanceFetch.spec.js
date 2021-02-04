const _yahooFinanceFetch = require('./yahooFinanceFetch');
const errors = require('./errors');

const _env = require('../env-node').default;

describe('yahooFinanceFetch', () => {

  const yahooFinanceFetch = _yahooFinanceFetch.bind({ _env });

  it('catches errors', () => {
    const url = 'https://query2.finance.yahoo.com/v1/finance/search';

    return expect(
      yahooFinanceFetch(url, {}, { devel: 'search-noOpts.json' })
    ).rejects.toBeInstanceOf(errors.BadRequestError);
  });

  it('throws if no environmennt set', () => {
    return expect(
      _yahooFinanceFetch("")
    ).rejects.toBeInstanceOf(errors.NoEnvironmentError);
  });

  it('throws HTTPError if !res.ok and no error in json result', () => {
    return expect(
      yahooFinanceFetch(
        "https://query1.finance.yahoo.com/nonExistingURL-CACHED",
        {},
        { devel: 'pageWith404andJson.json'}
      )
    ).rejects.toBeInstanceOf(errors.HTTPError);
  });

  it('throws Error if we receive unknown error from json result', () => {
    return expect(
      yahooFinanceFetch(
        "https://query1.finance.yahoo.com/nonExistingURL-CACHED",
        {},
        { devel: 'pageWithUnknownError.json'}
      )
    ).rejects.toBeInstanceOf(Error);
  });

});
