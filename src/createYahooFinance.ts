import defaultOptions, { type YahooFinanceOptions } from "./lib/options.ts";
import yahooFinanceFetch from "./lib/yahooFinanceFetch.ts";
import moduleExec from "./lib/moduleExec.ts";

class YahooFinance {
  _opts: YahooFinanceOptions;
  _fetch: typeof yahooFinanceFetch;
  _moduleExec: typeof moduleExec;
  // XXX TODO remove
  _env: {
    URLSearchParams: typeof URLSearchParams;
    fetch: typeof fetch;
    fetchDevel?: () => Promise<typeof fetch>;
  };
  _logObj: (obj: unknown) => void;

  constructor(options?: YahooFinanceOptions) {
    /// XXX TODO mergeoptions from setGlobalConfig
    this._opts = { ...defaultOptions, ...options };
    this._fetch = yahooFinanceFetch;
    this._moduleExec = moduleExec;
    // XXX TODO remove
    this._env = {
      URLSearchParams,
      fetch,
      async fetchDevel() {
        const { default: fetchCache } = await import("../tests/fetchCache.ts");

        function fetchDevel(
          input: Parameters<typeof fetch>[0],
          init?: Parameters<typeof fetch>[1], // & { devel?: boolean | string },
        ): ReturnType<typeof fetch> {
          // @ts-expect-error: later
          const { devel, ..._init } = init || {};
          // console.log({ devel });
          if (typeof devel === "string") {
            fetchCache._once({ id: devel.replace(/\.json$/, "") });
          } else {
            throw new Error(
              "unexpected fetchDevel value: " + JSON.stringify(devel),
            );
          }

          return fetch(input, init);
        }
        return fetchDevel;
      },
    };

    if ("_createOpts" in this) {
      const createOpts = this._createOpts as Record<string, unknown>;
      if (createOpts) {
        if ("_allowAdditionalProps" in createOpts) {
          if (!this._opts.validation) this._opts.validation = {};
          this._opts.validation.allowAdditionalProps = false;
        }
      }
    }

    // @ts-ignore: relevant for ts-json-schema-generator
    this._logObj = Deno.stdout.isTerminal()
      // deno-lint-ignore no-explicit-any
      ? (obj: any) => this._opts.logger!.dir(obj, { depth: 4, colors: true })
      // deno-lint-ignore no-explicit-any
      : (obj: any) => this._opts.logger!.info(JSON.stringify(obj, null, 2));
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
  const { modules, ...rest } = createOpts;
  Object.assign(YahooFinance.prototype, modules);
  Object.assign(YahooFinance.prototype, { _createOpts: rest });
  return YahooFinance as YahooFinanceWithModules<T> & {
    _createOpts: typeof rest;
  };
}
