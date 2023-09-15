// TODO, keep defaults there too?
import type { ValidationOptions } from "./validateAndCoerceTypes.js";
import type { QueueOptions } from "./queue.js";
import { ExtendedCookieJar } from "./cookieJar.js";

export interface YahooFinanceOptions {
  YF_QUERY_HOST?: string;
  cookieJar: ExtendedCookieJar;
  queue?: QueueOptions;
  validation?: ValidationOptions;
}

const options: YahooFinanceOptions = {
  YF_QUERY_HOST: process.env.YF_QUERY_HOST || "query2.finance.yahoo.com",
  cookieJar: new ExtendedCookieJar(),
  queue: {
    concurrency: 4, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
  },
};

export default options;
