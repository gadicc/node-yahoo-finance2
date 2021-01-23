const nodeFetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_BASE = path.join(__dirname, '..', '..', 'tests', 'http');

console.log(5, __filename, __dirname);

class FakeResponse {

  constructor(props) {
    Object.keys(props).forEach(key => this[key]=props[key]);
  }

  async json() {
    return JSON.parse(this.body);
  }

}

function urlToFilePath(url) {
  var hash = crypto.createHash('sha1')
  hash.update(url);
  return path.join(FILE_BASE, hash.digest('hex'));
}

const cache = {};

async function yahooFinanceFetchDevel(url, fetchOptions) {
  const filename = urlToFilePath(url);

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
