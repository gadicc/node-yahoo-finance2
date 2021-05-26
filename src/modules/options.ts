import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

import { Quote } from "./quote.js";

export interface OptionsResult {
  underlyingSymbol: string;
  expirationDates: Date[];
  strikes: number[];
  hasMiniOptions: boolean;
  quote: Quote;
  options: Option[];
}

export interface Option {
  expirationDate: Date;
  hasMiniOptions: boolean;
  calls: CallOrPut[];
  puts: CallOrPut[];
}

export interface CallOrPut {
  contractSymbol: string;
  strike: number;
  currency: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  volume?: number;
  openInterest?: number;
  bid?: number;
  ask: number;
  contractSize: "REGULAR";
  expiration: Date;
  lastTradeDate: Date;
  impliedVolatility: number;
  inTheMoney: boolean;
}

export interface OptionsOptions {
  formatted?: boolean;
  lang?: string;
  region?: string;
  date?: number;
}

const queryOptionsDefaults: OptionsOptions = {
  formatted: false,
  lang: "en-US",
  region: "US",
};

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<OptionsResult>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function options(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: OptionsOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {
  return this._moduleExec({
    moduleName: "options",

    query: {
      url: "https://query1.finance.yahoo.com/v7/finance/options/" + symbol,
      schemaKey: "#/definitions/OptionsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
    },

    result: {
      schemaKey: "#/definitions/OptionsResult",
      transformWith(result: any) {
        if (!result.optionChain)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.optionChain.result[0];
      },
    },

    moduleOptions,
  });
}
