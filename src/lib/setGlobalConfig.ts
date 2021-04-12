import { Options } from "../typings/interfaces";
import { ModuleThis } from "./moduleCommon";
import validateAndCoerceTypes from "./validateAndCoerceTypes";

export default function setGlobalConfig(
  this: ModuleThis,
  config: Partial<Options>
): void {
  validateAndCoerceTypes({
    object: config,
    source: "setGlobalConfig",
    type: "options",
    options: this._opts.validation,
    schemaKey: "#/definitions/PartialOptions",
  });
  for (const key of Reflect.ownKeys(config)) {
    this._opts[key] = config[key as keyof Options];
  }
}
