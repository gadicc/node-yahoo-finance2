import defaultOptions, { type YahooFinanceOptions } from "./lib/options.ts";
import yahooFinanceFetch from "./lib/yahooFinanceFetch.ts";
import moduleExec from "./lib/moduleExec.ts";
import fetchCache from "../tests/fetchCache.ts";

class YahooFinance {
  _opts: YahooFinanceOptions;
  _fetch: typeof yahooFinanceFetch;
  _moduleExec: typeof moduleExec;
  // XXX TODO remove
  _env: {
    URLSearchParams: typeof URLSearchParams;
    fetch: typeof fetch;
    fetchDevel?: () => Promise<
      (url: URL | RequestInfo, init?: RequestInit) => Promise<Response>
    >;
  };

  constructor(options?: YahooFinanceOptions) {
    /// XXX TODO mergeoptions from setGlobalConfig
    this._opts = { ...defaultOptions, ...options };
    this._fetch = yahooFinanceFetch;
    this._moduleExec = moduleExec;
    // XXX TODO remove
    this._env = {
      URLSearchParams,
      fetch,
      fetchDevel() {
        function fetchDevel(
          input: RequestInfo | URL,
          init?: RequestInit, // & { devel?: boolean | string },
        ): Promise<Response> {
          // @ts-expect-error: later
          const { devel, ..._init } = init || {};
          // console.log({ devel });
          if (typeof devel === "string") {
            fetchCache._once({ id: devel });
          }

          return fetch(input, init);
        }
        return Promise.resolve(fetchDevel);
      },
    };
  }
}

// deno-lint-ignore no-explicit-any
type ModuleMethod = (...args: any[]) => any;

interface CreateYahooFinanceOptions {
  modules: Record<string, ModuleMethod>;
}

type YahooFinanceWithModules<T extends CreateYahooFinanceOptions> =
  & {
    new (options?: YahooFinanceOptions):
      & YahooFinance
      & {
        [K in keyof T["modules"]]: T["modules"][K];
      };
  }
  & {
    [K in keyof T["modules"]]: T["modules"][K];
  };

export default function createYahooFinance<T extends CreateYahooFinanceOptions>(
  createOpts: T,
): YahooFinanceWithModules<T> {
  Object.assign(YahooFinance.prototype, createOpts.modules);
  return YahooFinance as YahooFinanceWithModules<T>;
}
