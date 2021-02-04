import validateAndCoerceTypes from './validateAndCoerceTypes';
import csv2json from './csv2json';

interface ModuleExecOptions {
  moduleName: string;

  query: {
    url: string;
    schemaKey: string;
    defaults: any;
    runtime?: any;
    overrides: any;
    fetchOptions?: any;
    transformWith?: Function;
    fetchType?: string;
  };

  result: {
    schemaKey: string;
    transformWith?: Function;
  };
}

type ThisWithFetch = { [key: string]: any; _moduleExec: Function };

export default async function moduleExec(this:ThisWithFetch, opts:ModuleExecOptions) {
  const query = opts.query;
  validateAndCoerceTypes(query.overrides, query.schemaKey, opts.moduleName);

  let queryOptions = {
    ...query.defaults,
    ...query.runtime,
    ...query.overrides,
  };

  if (query.transformWith)
    queryOptions = query.transformWith(queryOptions);

  let result = await this._fetch(query.url, queryOptions, query.fetchOptions, query.fetchType);

  if (query.fetchType === 'csv')
    result = csv2json(result);

  if (opts.result.transformWith)
    result = opts.result.transformWith(result);

  validateAndCoerceTypes(result, opts.result.schemaKey);

  return result;
}
