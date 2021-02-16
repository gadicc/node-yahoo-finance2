const { URLSearchParams } = require("url");
const fetch = require("node-fetch");

function fetchDevel() {
  // This let's us still only require the file if we need it, at runtime.
  return require("./lib/fetchDevel");
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
