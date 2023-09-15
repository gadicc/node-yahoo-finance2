/// <reference lib="DOM" />

function fetchDevel() {
  throw new Error("{ devel: true } not suported in the browser");
}

export default {
  fetch,
  fetchDevel,
  URLSearchParams,
};
