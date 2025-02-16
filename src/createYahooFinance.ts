import defaultOptions, { type YahooFinanceOptions } from "./lib/options.ts";

class YahooFinance {
  _opts: YahooFinanceOptions;
  // XXX TODO remove
  _env: { URLSearchParams: typeof URLSearchParams; fetch: typeof fetch };

  constructor(options?: YahooFinanceOptions) {
    /// XXX TODO mergeoptions from setGlobalConfig
    this._opts = { ...defaultOptions, ...options };
    // XXX TODO remove
    this._env = { URLSearchParams, fetch };
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
