import { URLSearchParams } from "url";
import fetch from "node-fetch";

function fetchDevel() {
  // This let's us still only require the file if we need it, at runtime.
  return require("./lib/fetchDevel");
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
