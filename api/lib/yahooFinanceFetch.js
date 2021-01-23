const { URLSearchParams} = require('url');
const fetch = require('node-fetch');

const pkg = require('../../package.json');
const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

async function yahooFinanceFetch(urlBase, params={}, fetchOptionsOverrides={}) {
  const urlSearchParams = new URLSearchParams(params);
  const url = urlBase + '?' + urlSearchParams.toString();

  const fetchOptions = {
    "User-Agent": userAgent,
    ...fetchOptionsOverrides
  };

  console.log({ url, fetchOptions });

  const req = await fetch(url, fetchOptions);
  const json = await req.json();
  return json;
}

module.exports = yahooFinanceFetch;
