import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from "../lib/moduleCommon.js";

import { DailyGainersOptions, DailyGainersResult } from "./dailyGainers.js";

const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_losers",
  count: 5,
};

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue,
): Promise<DailyGainersResult>;

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse,
): Promise<any>;

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptions,
): Promise<any> {
  return this._moduleExec({
    moduleName: "dailyLosers",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schemaKey: "#/definitions/DailyGainersOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true,
    },
    result: {
      schemaKey: "#/definitions/DailyGainersResult",
      transformWith(result: any) {
        if (!result.finance)
          throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
