/*
 * moduleExec(options: ModuleExecOptions)
 *
 * 1. Query Stage
 *   1. Validate user-supplied module params, e.g. { period: '1d' }
 *   2. Merge query params: (module defaults, user-supplied overrides, etc)
 *   3. Optionally transform query params
 *
 * 2. Call lib/yahooFinanceFetch
 *
 * 3. Result Stage
 *   1. Optional transform the result
 *   2. Validate the result and coerce types
 *
 * Further info below, inline.
 */

import { validateAndCoerceTypebox } from "./validateAndCoerceTypes.js";
import csv2json from "./csv2json.js";
import { TSchema } from "@sinclair/typebox";

/*
interface TransformFunc {
  (result: { [key: string]: any }): { [key: string]: any };
}
*/

interface ModuleExecOptions<TOpts, TResult> {
  /**
   * Name of the module, e.g. "search", "quoteSummary", etc.  Used in error
   * reporting.
   */
  moduleName: string;

  query: {
    /**
     * If given, a runtime assertion is performed to check that the given
     * argument is a string.  If not, a helpful error is thrown.
     */
    assertSymbol?: string;
    /**
     * URL of the API to query, WITHOUT query params.
     */
    url: string;
    /**
     * The schema to use to validate the options overrides
     */
    schema: TSchema;
    /**
     * Defaults for this query, e.g. { period: '1d' } in history,
     * and other required options that aren't often changed { locale: 'en' }.
     */
    defaults: any;
    /**
     * Query parameters generated inside the module, most commonly something
     * like { q: query } to take e.g. yf.search(query) and pass it how Yahoo
     * expects it.
     */
    runtime?: any;
    /**
     * Query options passed by the user that will override the default and
     * runtime params.  Will be validated with schemaKey.
     */
    overrides: any;
    /**
     * Called with the merged (defaults,runtime,overrides) before running
     * the query.  Useful to transform options we allow but not Yahoo, e.g.
     * allow a "2020-01-01" date but transform this to a UNIX epoch.
     */
    transformWith?: (opts: TOpts) => unknown;
    /**
     * Default: 'json'.  Can be 'text' or 'csv' (augments fetch's "text").
     */
    fetchType?: string;
    /**
     * Default: false.  This request requires Yahoo cookies & crumb.
     */
    needsCrumb?: boolean;
  };

  result: {
    /**
     * The schema to validate (and coerce) the retruned result from Yahoo.
     */
    schema: TSchema;
    /**
     * Mutate the Yahoo result *before* validating and coercion.  Mostly used
     * to e.g. throw if no (resault.returnField) and return result.returnField.
     */
    transformWith?: (result: unknown) => TResult;
  };

  moduleOptions?: {
    /**
     * Allow validation failures to pass if false;
     */
    validateResult?: boolean;
    /**
     * Any options to pass to fetch() just for this request.
     */
    fetchOptions?: any;
  };
}

async function moduleExec<TOpts = unknown, TResult = unknown>(
  this: { [key: string]: any },
  opts: ModuleExecOptions<TOpts, TResult>,
) {
  const queryOpts = opts.query;
  const moduleOpts = opts.moduleOptions;
  const moduleName = opts.moduleName;
  const resultOpts = opts.result;

  if (queryOpts.assertSymbol) {
    const symbol = queryOpts.assertSymbol;
    if (typeof symbol !== "string")
      throw new Error(
        `yahooFinance.${moduleName}() expects a single string symbol as its ` +
          `query, not a(n) ${typeof symbol}: ${JSON.stringify(symbol)}`,
      );
  }

  // Check that query options passed by the user are valid for this module
  validateAndCoerceTypebox({
    type: "options",
    data: queryOpts.overrides ?? {},
    schema: queryOpts.schema,
    options: this._opts.validation,
  });

  let queryOptions = {
    ...queryOpts.defaults, // Module defaults e.g. { period: '1wk', lang: 'en' }
    ...queryOpts.runtime, // Runtime params e.g. { q: query }
    ...queryOpts.overrides, // User supplied options that override above
  };

  /*
   * Called with the merged (defaults,runtime,overrides) before running
   * the query.  Useful to transform options we allow but not Yahoo, e.g.
   * allow a "2020-01-01" date but transform this to a UNIX epoch.
   */
  if (queryOpts.transformWith) {
    queryOptions = queryOpts.transformWith(queryOptions);
  }

  // this._fetch is lib/yahooFinanceFetch
  let result = await this._fetch(
    queryOpts.url,
    queryOptions,
    moduleOpts,
    queryOpts.fetchType,
    queryOpts.needsCrumb ?? false,
  );

  if (queryOpts.fetchType === "csv") {
    result = csv2json(result);
  }

  /*
   * Mutate the Yahoo result *before* validating and coercion.  Mostly used
   * to e.g. throw if no (result.returnField) and return result.returnField.
   */
  if (resultOpts.transformWith) {
    result = resultOpts.transformWith(result);
  }

  const validateResult =
    !moduleOpts ||
    moduleOpts.validateResult === undefined ||
    moduleOpts.validateResult === true;

  const validationOpts = {
    ...this._opts.validation,
    // Set logErrors=false if validateResult=false
    logErrors: validateResult ? this._opts.validation.logErrors : false,
  };

  /*
   * Validate the returned result (after transforming, above) and coerce types.
   *
   * The coersion works as follows: if we're expecting a "Date" type, but Yahoo
   * gives us { raw: 1231421524, fmt: "2020-01-01" }, we'll return that as
   * `new Date(1231421524 * 1000)`.
   *
   * Beyond that, ensures that user won't process unexpected data, in two
   * cases:
   *
   * a) Missing required properties or unexpected additional properties
   * b) A total new change in format that we really have no idea what to do
   *    with, e.g. a new kind of Date that we've never seen before and
   *
   * The idea is that if you receive a result, it's safe to use / store in
   * database, etc.  Otherwise you'll receive an error.
   */
  try {
    return validateAndCoerceTypebox({
      type: "result",
      data: result,
      schema: resultOpts.schema,
      options: validationOpts,
    });
  } catch (error) {
    if (validateResult) throw error;
  }

  return result as any;
}

export default moduleExec;
