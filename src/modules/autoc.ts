export interface AutocResultSet {
  Query: string;
  Result: Array<AutocResult>
}

export interface AutocResult {
  symbol: string;      // "AMZN"
  name: string;        // "Amazon.com, Inc."
  exch: string;        // "NMS"
  type: string;        // "S".    TODO "S" | "I" | ???
  exchDisp: string;    // "NASDAQ"
  typeDisp: string;    // "Equity"
}

export interface AutocOptions {
  region?: number;      // 1
  lang?: string;        // "en"
}

const queryOptionsDefaults = {
  region: 1,
  lang: 'en'
};

export default function autoc(
  this: { [key:string]: any, _moduleExec: Function },
  query: string,
  queryOptionsOverrides: AutocOptions = {},
  fetchOptions?: object
): Promise<AutocResultSet> {

  return this._moduleExec({
    moduleName: "autoc",

    query: {
      url: "https://autoc.finance.yahoo.com/autoc",
      schemaKey: "#/definitions/AutocOptions",
      defaults: queryOptionsDefaults,
      runtime: { query },
      overrides: queryOptionsOverrides,
      fetchOptions,
    },

    result: {
      schemaKey: "#/definitions/AutocResultSet",
      transformWith(result: any) {
        if (!result.ResultSet)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.ResultSet;
      }
    }
  });

}
