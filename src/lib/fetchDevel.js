/* istanbul ignore file */
import nodeFetch, { Headers } from "node-fetch";
import fs from "fs";
import crypto from "crypto";

//const FILE_BASE = path.join(__dirname, "..", "..", "tests", "http");
const BASE_URL = new URL("../../tests/http/", import.meta.url);

class FakeResponse {
  constructor(props) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
    const rawHeaders = this.headers;
    this.headers = new Headers(rawHeaders);
    // node-fetch extension, needed to handle multiple set-cookie headers
    this.headers.raw = () => rawHeaders;
  }

  async json() {
    return this.bodyJson || JSON.parse(this.body);
  }

  async text() {
    return this.body;
  }
}

function urlHash(url) {
  var hash = crypto.createHash("sha1");
  hash.update(url);
  return hash.digest("hex");
}

const cache = {};

async function fetchDevel(url, fetchOptions) {
  if (process.env.FETCH_DEVEL === "nocache")
    return await nodeFetch(url, fetchOptions);

  // Use query2 for all our tests / fixtures / cache
  url = url.replace(
    /^https:\/\/query1.finance.yahoo.com/,
    "https://query2.finance.yahoo.com"
  );

  // Remove crumb param to have consistent cacheable URLs
  const origUrl = url;
  url = url.replace(/[?&]crumb=[^?&]+/, "");

  // If devel===true, hash the url, otherwise use the value of devel
  // This allows us to specify our own static filename vs url hash.
  /*
  const filename = path.join(
    FILE_BASE,
    fetchOptions.devel === true ? urlHash(url) : fetchOptions.devel
  );
  */
  const destUrl = new URL(
    "./" + (fetchOptions.devel === true ? urlHash(url) : fetchOptions.devel),
    BASE_URL
  );

  const filename = destUrl.toString();

  if (cache[filename]) return cache[filename];

  let contentJson, contentObj;

  try {
    contentJson = await fs.promises.readFile(destUrl, { encoding: "utf8" });
    contentObj = JSON.parse(contentJson);
  } catch (error) {
    if (error.code === "ENOENT") {
      const res = await nodeFetch(origUrl, fetchOptions);

      contentObj = {
        request: {
          url: url,
        },
        response: {
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers.raw(),
          // body: await res.text(),
        },
      };

      const contentTypeHeader = contentObj.response.headers["content-type"];
      const contentType = contentTypeHeader && contentTypeHeader[0].split(";");
      if (contentType === "application/json") {
        contentObj.response.bodyJson = await res.json();
      } else {
        contentObj.response.body = await res.text();
      }

      contentJson = JSON.stringify(contentObj, null, 2);
      await fs.promises.writeFile(destUrl, contentJson, { encoding: "utf8" });
    } else {
      throw error;
    }
  }

  if (contentObj.request.url !== url && !filename.match(/\.fake\.json$/)) {
    const message =
      "URL mismatch - did you want to delete stale cached " +
      "result or rename to .fake.json?\n\n" +
      "  Requested URL: " +
      url +
      "\n" +
      "  Cached URL:    " +
      contentObj.request.url +
      "\n" +
      "\n" +
      "File: " +
      filename;
    throw new Error(message);
  }

  const res = (cache[filename] = new FakeResponse(contentObj.response));
  return res;
}

export default fetchDevel;
