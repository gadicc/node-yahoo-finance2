import Queue from "./queue";

import type { Options } from "./options";
import type { QueueOptions } from "./queue";

import errors from "./errors";
import pkg from "../../package.json";

const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

interface YahooFinanceFetchThisEnv {
  [key: string]: any;
  URLSearchParams: (init?: any) => any;
  fetch: Function;
  fetchDevel: Function;
}

interface YahooFinanceFetchThis {
  [key: string]: any;
  _env: YahooFinanceFetchThisEnv;
  _opts: Options;
}

interface YahooFinanceFetchModuleOptions {
  devel?: string | boolean;
  fetchOptions?: Object;
  queue?: QueueOptions;
}

const _queue = new Queue();

function assertQueueOptions(queue: any, opts: any) {
  opts; //?
  if (
    typeof opts.concurrency === "number" &&
    queue.concurrency !== opts.concurrency
  )
    queue.concurrency = opts.concurrency;

  if (typeof opts.timeout === "number" && queue.timeout !== opts.timeout)
    queue.timeout = opts.timeout;
}

async function yahooFinanceFetch(
  this: YahooFinanceFetchThis,
  urlBase: string,
  params = {},
  moduleOpts: YahooFinanceFetchModuleOptions = {},
  func = "json"
) {
  if (!this._env)
    throw new errors.NoEnvironmentError(
      "yahooFinanceFetch called without this._env set"
    );

  const queue = moduleOpts?.queue?._queue || _queue;
  assertQueueOptions(queue, moduleOpts.queue || this._opts.queue || {});

  const { URLSearchParams, fetch, fetchDevel } = this._env;

  // @ts-ignore TODO copy interface? @types lib?
  const urlSearchParams = new URLSearchParams(params);
  const url = urlBase + "?" + urlSearchParams.toString();

  /* istanbul ignore next */
  // no need to force coverage on real network request.
  const fetchFunc = moduleOpts.devel ? fetchDevel() : fetch;

  const fetchOptions = {
    "User-Agent": userAgent,
    ...moduleOpts.fetchOptions,
    devel: moduleOpts.devel,
  };

  // used in moduleExec.ts
  if (func === "csv") func = "text";

  const res = (await queue.add(() => fetchFunc(url, fetchOptions))) as any;
  const result = await res[func]();

  /*
    {
      finance: {  // or quoteSummary, or any other single key
        result: null,
        error: {
          code: 'Bad Request',
          description: 'Missing required query parameter=q'
        }
      }
    }
   */
  if (func === "json") {
    const keys = Object.keys(result);
    if (keys.length === 1) {
      const errorObj = result[keys[0]].error;
      if (errorObj) {
        const errorName = errorObj.code.replace(/ /g, "") + "Error";
        const ErrorClass = errors[errorName] || Error;
        throw new ErrorClass(errorObj.description);
      }
    }
  }

  // We do this last as it generally contains less information (e.g. no desc).
  if (!res.ok) {
    console.error(url);
    const error = new errors.HTTPError(res.statusText);
    error.code = res.status;
    throw error;
  }

  return result;
}

export default yahooFinanceFetch;
