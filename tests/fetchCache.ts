"use strict";

import { spy } from "jsr:@std/testing/mock";
import { afterAll, beforeAll } from "jsr:@std/testing/bdd";
// XXX TODO npm?
// import createFetchCache from "fetch-mock-cache/lib/runtimes/deno.ts";
// import Store from "fetch-mock-cache/lib/stores/fs.ts";
import createFetchCache from "@gadicc/fetch-mock-cache/runtimes/deno.ts";
import Store from "@gadicc/fetch-mock-cache/stores/fs.ts";

const fetchCache = createFetchCache({ Store });
const originalFetch = globalThis.fetch;

function fetchCacheSetup() {
  beforeAll(() => {
    globalThis.fetch = spy(fetchCache);
  });
  afterAll(() => {
    globalThis.fetch = originalFetch;
  });
}

export { fetchCacheSetup };
export default fetchCache;
