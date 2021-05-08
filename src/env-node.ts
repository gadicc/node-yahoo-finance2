import { URLSearchParams } from "url";
import fetch from "node-fetch";

// This let's us still only require the file if we need it, at runtime.
async function fetchDevel() {
  const module = await import("./lib/fetchDevel.js");
  return module.default;
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
