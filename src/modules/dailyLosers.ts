import type {
  ModuleOptions,
  ModuleOptionsWithValidateFalse,
  ModuleOptionsWithValidateTrue,
  ModuleThis,
} from "../lib/moduleCommon.ts";

import type {
  DailyGainersOptions,
  DailyGainersResult,
} from "./dailyGainers.ts";

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
  // deno-lint-ignore no-explicit-any
): Promise<any>;

export default function dailyLosers(
  this: ModuleThis,
  queryOptionsOverrides?: DailyGainersOptions,
  moduleOptions?: ModuleOptions,
  // deno-lint-ignore no-explicit-any
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
      // deno-lint-ignore no-explicit-any
      transformWith(result: any) {
        if (!result.finance) {
          throw new Error("Unexpected result: " + JSON.stringify(result));
        }
        return result.finance.result[0];
      },
    },
    moduleOptions,
  });
}
