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

import validateAndCoerceTypes from './validateAndCoerceTypes';
import csv2json from './csv2json';

interface TransformFunc {
  // The consuming module itself will have a stricter return type.
  (result: {[key: string]: any}): {[key: string]: any};
}

interface ModuleExecOptions {
  /**
   * Name of the module, e.g. "search", "quoteSummary", etc.  Used in error
   * reporting.
   */
  moduleName: string;

  query: {
    /**
     * URL of the API to query, WITHOUT query params.
     */
    url: string;
    /**
     * Key of schema used to validate user-provider query options.
     * e.g. yf.search('AAPL', { isThisAValidOption: "maybe" })
     */
    schemaKey: string;
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
     * Any options to pass to fetch() just for this request.
     */
    fetchOptions?: any;
    /**
     * Called with the merged (defaults,runtime,overrides) before running
     * the query.  Useful to transform options we allow but not Yahoo, e.g.
     * allow a "2020-01-01" date but transform this to a UNIX epoch.
     */
    transformWith?: TransformFunc;
    /**
     * Default: 'json'.  Can be 'text' or 'csv' (augments fetch's "text").
     */
    fetchType?: string;
  };

  result: {
    /**
     * Key of schema to validate (and coerce) the retruned result from Yahoo.
     */
    schemaKey: string;
    /**
     * Mutate the Yahoo result *before* validating and coercion.  Mostly used
     * to e.g. throw if no (resault.returnField) and return result.returnField.
     */
    transformWith?: TransformFunc;
  };
}

type ThisWithFetch = { [key: string]: any; _moduleExec: Function };

export default async function moduleExec(this: ThisWithFetch, opts: ModuleExecOptions) {
  const query = opts.query;

  // Check that query options passed by the user are valid for this module
  validateAndCoerceTypes(query.overrides, query.schemaKey, opts.moduleName);

  let queryOptions = {
    ...query.defaults,    // Module defaults e.g. { period: '1wk', lang: 'en' }
    ...query.runtime,     // Runtime params e.g. { q: query }
    ...query.overrides,   // User supplied options that override above
  };

  /*
   * Called with the merged (defaults,runtime,overrides) before running
   * the query.  Useful to transform options we allow but not Yahoo, e.g.
   * allow a "2020-01-01" date but transform this to a UNIX epoch.
   */
  if (query.transformWith)
    queryOptions = query.transformWith(queryOptions);

  // this._fetch is lib/yahooFinanceFetch
  let result = await this._fetch(query.url, queryOptions, query.fetchOptions, query.fetchType);

  if (query.fetchType === 'csv')
    result = csv2json(result);

  /*
   * Mutate the Yahoo result *before* validating and coercion.  Mostly used
   * to e.g. throw if no (resault.returnField) and return result.returnField.
   */
  if (opts.result.transformWith)
    result = opts.result.transformWith(result);

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
  validateAndCoerceTypes(result, opts.result.schemaKey, undefined, this._options?.validation);

  return result;
}
