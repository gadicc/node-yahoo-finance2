import { ExtendedCookieJar } from "./cookieJar.js";
import { Static, Type } from "@sinclair/typebox";
import { QueueOptionsSchema } from "./queue.js";

const LoggerSchema = Type.Object({
  info: Type.Function([], Type.Void()),
  warn: Type.Function([], Type.Void()),
  error: Type.Function([], Type.Void()),
  debug: Type.Function([], Type.Void()),
});

export type Logger = {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

const ValidationOptionsSchema = Type.Object({
  logErrors: Type.Optional(Type.Boolean()),
  logOptionsErrors: Type.Optional(Type.Boolean()),
  _internalThrowOnAdditionalProperties: Type.Optional(
    Type.Boolean({
      default: process.env.NODE_ENV === "test",
      description:
        "Use this property to throw when properties beyond what is explicitly specified in the schema are provided. It is an internal option and subject to change, use at your own risk",
    }),
  ),
});

export type ValidationOptions = Static<typeof ValidationOptionsSchema>;

export const YahooFinanceOptionsSchema = Type.Object(
  {
    YF_QUERY_HOST: Type.Optional(Type.String()),
    cookieJar: Type.Optional(Type.Any()),
    queue: Type.Optional(QueueOptionsSchema),
    validation: Type.Optional(ValidationOptionsSchema),
    logger: Type.Optional(LoggerSchema),
  },
  { title: "YahooFinanceOptions" },
);

/*
TODO: Ideally we'd have the typebox type be our source of truth for types here.
However, Typebox does not support type checking for instances of a particular class
in the case of the `cookieJar`, and for functions with variadic params in the case 
of the `logger` (ref: https://github.com/sinclairzx81/typebox/issues/931)
*/
export type YahooFinanceOptions = Static<typeof YahooFinanceOptionsSchema> & {
  cookieJar?: ExtendedCookieJar;
  logger?: Logger;
};

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
  logger: {
    info: (...args: any[]) => console.log(...args),
    warn: (...args: any[]) => console.warn(...args),
    error: (...args: any[]) => console.error(...args),
    debug: (...args: any[]) => console.log(...args),
  },
};

export default options;
