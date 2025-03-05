import type { YahooFinanceOptions as YahooFinanceOptionsJSON } from "./optionsJson.ts";
import { ExtendedCookieJar } from "./cookieJar.ts";

export interface Logger {
  // deno-lint-ignore no-explicit-any
  info: (...args: any[]) => void;
  // deno-lint-ignore no-explicit-any
  warn: (...args: any[]) => void;
  // deno-lint-ignore no-explicit-any
  error: (...args: any[]) => void;
  // deno-lint-ignore no-explicit-any
  debug: (...args: any[]) => void;
}

export interface YahooFinanceOptions extends YahooFinanceOptionsJSON {
  cookieJar?: ExtendedCookieJar;
  logger?: Logger;
}

const options: YahooFinanceOptions = {
  YF_QUERY_HOST: "query2.finance.yahoo.com",
  cookieJar: new ExtendedCookieJar(),
  queue: {
    concurrency: 4, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
    allowAdditionalProps: true,
  },
  logger: {
    // deno-lint-ignore no-explicit-any
    info: (...args: any[]) => console.log(...args),
    // deno-lint-ignore no-explicit-any
    warn: (...args: any[]) => console.warn(...args),
    // deno-lint-ignore no-explicit-any
    error: (...args: any[]) => console.error(...args),
    // deno-lint-ignore no-explicit-any
    debug: (..._args: any[]) => {
      // XXX TODO ability to easily toggle this.
      // console.log(...args)
    },
  },
};

export default options;
