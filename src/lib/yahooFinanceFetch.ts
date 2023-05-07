import type { RequestInfo, RequestInit, Response } from "node-fetch";
import Queue from "./queue.js";

import type { YahooFinanceOptions } from "./options.js";
import type { QueueOptions } from "./queue.js";

import errors from "./errors.js";
import pkg from "../../package.json";
import getCrumb from "./getCrumb.js";
import cookieJar from "./cookieJar.js";

const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;

interface YahooFinanceFetchThisEnv {
  [key: string]: any;
  URLSearchParams: (init?: any) => any;
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
  fetchDevel: () => Promise<
    (url: RequestInfo, init?: RequestInit) => Promise<Response>
  >;
}

interface YahooFinanceFetchThis {
  [key: string]: any;
  _env: YahooFinanceFetchThisEnv;
  _opts: YahooFinanceOptions;
}

interface YahooFinanceFetchModuleOptions {
  devel?: string | boolean;
  fetchOptions?: RequestInit;
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

function substituteVariables(this: YahooFinanceFetchThis, urlBase: string) {
  return urlBase.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    if (varName === "YF_QUERY_HOST") {
      // const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
      // return hosts[Math.floor(Math.random() * hosts.length)];
      return this._opts.YF_QUERY_HOST || "query2.finance.yahoo.com";
    } else {
      // i.e. return unsubstituted original variable expression ${VAR}
      return match;
    }
  });
}

async function yahooFinanceFetch(
  this: YahooFinanceFetchThis,
  urlBase: string,
  params = {},
  moduleOpts: YahooFinanceFetchModuleOptions = {},
  func = "json"
) {
  if (!(this && this._env))
    throw new errors.NoEnvironmentError(
      "yahooFinanceFetch called without this._env set"
    );

  // TODO: adds func type to json schema which is not supported
  //const queue = moduleOpts.queue?._queue || _queue;
  const queue = _queue;
  assertQueueOptions(queue, { ...this._opts.queue, ...moduleOpts.queue });

  const { URLSearchParams, fetch, fetchDevel } = this._env;

  /* istanbul ignore next */
  // no need to force coverage on real network request.
  const fetchFunc = moduleOpts.devel ? await fetchDevel() : fetch;

  const fetchOptionsBase = {
    ...moduleOpts.fetchOptions,
    devel: moduleOpts.devel,
    headers: {
      "User-Agent": userAgent,
      ...moduleOpts.fetchOptions?.headers,
    },
  };

  // @ts-expect-error: TODO, crumb string type for partial params
  params.crumb = await getCrumb(fetchFunc, fetchOptionsBase);

  // @ts-expect-error: TODO copy interface? @types lib?
  const urlSearchParams = new URLSearchParams(params);
  const url =
    substituteVariables.call(this, urlBase) + "?" + urlSearchParams.toString();
  // console.log(url);

  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      cookie: cookieJar.getCookieStringSync(url),
    },
  };

  // console.log(fetchOptions);

  // used in moduleExec.ts
  if (func === "csv") func = "text";

  const response = (await queue.add(() => fetchFunc(url, fetchOptions))) as any;

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) cookieJar.setFromSetCookieHeaders(setCookieHeader, url);

  const result = await response[func]();

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
  if (!response.ok) {
    console.error(url);
    const error = new errors.HTTPError(response.statusText);
    error.code = response.status;
    throw error;
  }

  return result;
}

export { substituteVariables };
export default yahooFinanceFetch;
