const { URLSearchParams} = require('url');
const nodeFetch = require('node-fetch');

const errors = require('./errors');
const pkg = require('../../package.json');

const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

async function yahooFinanceFetch(urlBase, params={}, fetchOptionsOverrides={}) {
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
  const json = await res.json();

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
  if (json.finance && json.finance.error) {
    const errorObj = json.finance.error;
    const errorName = errorObj.code.replace(/ /g, '') + 'Error';
    const ErrorClass = errors[errorName] || Error;
    throw new ErrorClass(errorObj.description);
  }

  return json;
}

module.exports = yahooFinanceFetch;
