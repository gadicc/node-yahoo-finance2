/* istanbul ignore file */
const nodeFetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_BASE = path.join(__dirname, '..', '..', 'tests', 'http');

class FakeResponse {

  constructor(props) {
    Object.keys(props).forEach(key => this[key]=props[key]);
  }

  async json() {
    return JSON.parse(this.body);
  }

}

function urlHash(url) {
  var hash = crypto.createHash('sha1')
  hash.update(url);
  return hash.digest('hex');
}

const cache = {};

async function yahooFinanceFetchDevel(url, fetchOptions) {
  // If devel===true, hash the url, otherwise use the value of devel
  // This allows us to specify our own static filename vs url hash.
  const filename = path.join(FILE_BASE,
    fetchOptions.devel === true ? urlHash(url) : fetchOptions.devel);

  if (cache[filename])
    return cache[filename];

  let contentJson, contentObj;

  try {

    contentJson = await fs.promises.readFile(filename, { encoding: 'utf8' });
    contentObj = JSON.parse(contentJson);

  } catch (error) {

    console.log(5, error);
    console.log(5, error.code);

    if (error.code === 'ENOENT') {

      console.log(6);
      const res = await nodeFetch(url, fetchOptions);

      contentObj = {
        request: {
          url: url,
        },
        response: {
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers.raw(),
          body: await res.text(),
        }
      };

      contentJson = JSON.stringify(contentObj, null, 2);
      console.log('a')
      await fs.promises.writeFile(filename, contentJson, { encoding: 'utf8' });
      console.log('b')

    } else {

      console.log(8);
      throw error;

    }
  }

  const res = cache[filename] = new FakeResponse(contentObj.response);
  return res;
}

module.exports = yahooFinanceFetchDevel;
