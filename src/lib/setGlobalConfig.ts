import type { YahooFinanceOptions } from "./options.js";
import type { ModuleThis } from "./moduleCommon.js";
import validateAndCoerceTypes from "./validateAndCoerceTypes.js";

export default function setGlobalConfig(
  this: ModuleThis,
  config: YahooFinanceOptions
): void {
  validateAndCoerceTypes({
    object: config,
    source: "setGlobalConfig",
    type: "options",
    options: this._opts.validation,
    schemaKey: "#/definitions/YahooFinanceOptions",
  });
  mergeObjects(this._opts, config);
}

type Obj = Record<string, any>;
function mergeObjects(original: Obj, objToMerge: Obj) {
  const ownKeys: (keyof typeof objToMerge)[] = Reflect.ownKeys(
    objToMerge
  ) as string[];
  for (const key of ownKeys) {
    if (typeof objToMerge[key] === "object") {
      mergeObjects(original[key] as Obj, objToMerge[key] as Obj);
    } else {
      original[key] = objToMerge[key];
    }
  }
}
