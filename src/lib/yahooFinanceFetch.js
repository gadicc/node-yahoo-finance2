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
  if (!res.ok) {
    console.error(url);
    throw new Error("Error " + res.status + ": " + res.statusText)
  }

  const result = await res[func]();

  /*
    {
      finance: {
        result: null,
        error: {
          code: 'Bad Request',
          description: 'Missing required query parameter=q'
        }
      }
    }
   */
  if (func==='json' && result.finance && result.finance.error) {
    const errorObj = result.finance.error;
    const errorName = errorObj.code.replace(/ /g, '') + 'Error';
    const ErrorClass = errors[errorName] || Error;
    throw new ErrorClass(errorObj.description);
  }

  return result;
}

module.exports = yahooFinanceFetch;
