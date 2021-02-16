import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon";

export interface AutocResultSet {
  Query: string;
  Result: Array<AutocResult>;
}

export interface AutocResult {
  symbol: string; // "AMZN"
  name: string; // "Amazon.com, Inc."
  exch: string; // "NMS"
  type: string; // "S".    TODO: "S" | "I" | ???
  exchDisp: string; // "NASDAQ"
  typeDisp: string; // "Equity"
}

export interface AutocOptions {
  region?: number; // 1
  lang?: string; // "en"
}

const queryOptionsDefaults = {
  region: 1,
  lang: "en",
};

export default function autoc(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: AutocOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<AutocResult>;

export default function autoc(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: AutocOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function autoc(
  this: ModuleThis,
  query: string,
  queryOptionsOverrides?: AutocOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "autoc",

    query: {
      url: "https://autoc.finance.yahoo.com/autoc",
      schemaKey: "#/definitions/AutocOptions",
      defaults: queryOptionsDefaults,
      runtime: { query },
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/AutocResultSet",
      transformWith(result: any) {
        if (!result.ResultSet)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.ResultSet;
      },
    },

    moduleOptions,
  });
}
