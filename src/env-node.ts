import { URLSearchParams } from "url";
import fetch from "node-fetch";

// This let's us still only require the file if we need it, at runtime.
let fetchDevelFunc: Function;
async function fetchDevel() {
  if (fetchDevelFunc) return fetchDevelFunc;

  const module = await import("./lib/fetchDevel.js");
  fetchDevelFunc = module.default;
  return fetchDevelFunc;
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
