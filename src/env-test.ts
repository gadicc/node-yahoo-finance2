import { URLSearchParams } from "url";
import fetch from "node-fetch";
import type { RequestInfo, RequestInit, Response } from "node-fetch";

// This let's us still only require the file if we need it, at runtime.
let fetchDevelFunc: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
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
