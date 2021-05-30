//import ModuleExec from "./moduleExec.js";

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
  [key: string]: any;
  // TODO: should be ModuleExec function but requiring functions breaks
  // schema generation because json-schema does not support functions.
  _moduleExec: any;
}
