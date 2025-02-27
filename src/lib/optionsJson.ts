/*
 * The "JSON" part of options that can be validated against a JSON schema,
 * i.e. no functions or classes.
 */

// TODO, keep defaults there too?
import type { ValidationOptions } from "./validateAndCoerceTypes.ts";
import type { QueueOptions } from "./queue.ts";

export interface YahooFinanceOptions {
  YF_QUERY_HOST?: string;
  // cookieJar?: ExtendedCookieJar;
  queue?: QueueOptions;
  validation?: ValidationOptions;
  // logger?: Logger;
}
