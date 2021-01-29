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

  async text() {
    return this.body;
  }

}

function urlHash(url) {
  var hash = crypto.createHash('sha1')
  hash.update(url);
  return hash.digest('hex');
}

const cache = {};

async function fetchDevel(url, fetchOptions) {
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

    if (error.code === 'ENOENT') {

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
      await fs.promises.writeFile(filename, contentJson, { encoding: 'utf8' });

    } else {

      throw error;

    }
  }

  const res = cache[filename] = new FakeResponse(contentObj.response);
  return res;
}

module.exports = fetchDevel;
