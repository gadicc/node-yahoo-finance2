// import type ModuleExec from "./moduleExec.js";

export interface ModuleOptions {
  validateResult?: boolean;
  devel?: boolean | string;
  fetchOptions?: object;
}

export interface ModuleOptionsWithValidateFalse extends ModuleOptions {
  validateResult: false;
}

export interface ModuleOptionsWithValidateTrue extends ModuleOptions {
  validateResult?: true;
}

export interface ModuleThis {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
  // TODO: should be ModuleExec function but requiring functions breaks
  // schema generation because json-schema does not support functions.
  // deno-lint-ignore no-explicit-any
  _moduleExec: any;
  // _moduleExec: typeof ModuleExec;
}
