const { URLSearchParams} = require('url');
const nodeFetch = require('node-fetch');

const errors = require('./errors');
const pkg = require('../../package.json');

const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

async function yahooFinanceFetch(urlBase, params={}, fetchOptionsOverrides={}, func='json') {
  const urlSearchParams = new URLSearchParams(params);
  const url = urlBase + '?' + urlSearchParams.toString();

  const fetch = fetchOptionsOverrides.devel
    ? require('./fetchDevel')
    : nodeFetch;

  const fetchOptions = {
    "User-Agent": userAgent,
    ...fetchOptionsOverrides
  };

  const res = await fetch(url, fetchOptions);
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
