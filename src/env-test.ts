import { URLSearchParams } from "url";

// This let's us still only require the file if we need it, at runtime.
let fetchDevelFunc: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
async function fetchDevel() {
  if (fetchDevelFunc) return fetchDevelFunc;

  const module = await import("./lib/fetchDevel.js");
  // @ts-expect-error: it's ok.
  fetchDevelFunc = module.default;
  return fetchDevelFunc;
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
