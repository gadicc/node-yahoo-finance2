import type { YahooFinanceOptions } from "./options.js";
import type { ModuleThis } from "./moduleCommon.js";
import validateAndCoerceTypes from "./validateAndCoerceTypes.js";
import { ExtendedCookieJar } from "./cookieJar.js";

export default function setGlobalConfig(
  this: ModuleThis,
  _config: YahooFinanceOptions
): void {
  // Instances (e.g. cookieJar) don't validate well :)
  const { cookieJar, ...config } = _config;

  validateAndCoerceTypes({
    object: config,
    source: "setGlobalConfig",
    type: "options",
    options: this._opts.validation,
    schemaKey: "#/definitions/YahooFinanceOptions",
  });

  mergeObjects(this._opts, config as Obj);

  if (cookieJar) {
    if (!(cookieJar instanceof ExtendedCookieJar))
      throw new Error("cookieJar must be an instance of ExtendedCookieJar");
    this._opts.cookieJar = cookieJar;
  }
}

type Obj = Record<string, string | ObjRecurse>;

// This is fine, since this is just a hack for recursive types
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjRecurse extends Obj {}

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
