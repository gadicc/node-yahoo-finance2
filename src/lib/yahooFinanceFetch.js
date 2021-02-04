const errors = require('./errors');
const pkg = require('../../package.json');

const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

async function yahooFinanceFetch(urlBase, params={}, fetchOptionsOverrides={}, func='json') {
  if (!this._env)
    throw new errors.NoEnvironmentError("yahooFinanceFetch called without this._env set");

  const { URLSearchParams, fetch } = this._env;

  const urlSearchParams = new URLSearchParams(params);
  const url = urlBase + '?' + urlSearchParams.toString();

  const fetchFunc = fetchOptionsOverrides.devel
    ? require('./fetchDevel')
    : fetch;

  const fetchOptions = {
    "User-Agent": userAgent,
    ...fetchOptionsOverrides
  };

  // used in moduleExec.ts
  if (func === 'csv')
    func = 'text';

  const res = await fetchFunc(url, fetchOptions);
  const result = await res[func]();

  /*
    {
      finance: {  // or quoteSummary, or any other single key
        result: null,
        error: {
          code: 'Bad Request',
          description: 'Missing required query parameter=q'
        }
      }
    }
   */
  if (func==='json') {
    const keys = Object.keys(result);
    if (keys.length === 1) {
      const errorObj = result[keys[0]].error;
      if (errorObj) {
        const errorName = errorObj.code.replace(/ /g, '') + 'Error';
        const ErrorClass = errors[errorName] || Error;
        throw new ErrorClass(errorObj.description);
      }
    }
  }

  // We do this last as it generally contains less information (e.g. no desc).
  if (!res.ok) {
    console.error(url);
    const error = new errors.HTTPError(res.statusText);
    error.code = res.status;
    throw error;
  }

  return result;
}

module.exports = yahooFinanceFetch;
