// TODO, keep defaults there too?
import type { ValidationOptions } from "./validateAndCoerceTypes.js";
import type { QueueOptions } from "./queue.js";

export interface Logger {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

export interface YahooFinanceOptions {
  YF_QUERY_HOST?: string;
  queue?: QueueOptions;
  validation?: ValidationOptions;
  logger: Logger;
}

const options: YahooFinanceOptions = {
  YF_QUERY_HOST: process.env.YF_QUERY_HOST || "query2.finance.yahoo.com",
  queue: {
    concurrency: 4, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
  },
  logger: {
    info: (...args: any[]) => console.log(...args),
    warn: (...args: any[]) => console.error(...args),
    error: (...args: any[]) => console.error(...args),
    debug: (...args: any[]) => console.log(...args),
  },
};

export default options;
