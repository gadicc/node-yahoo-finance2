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
  _moduleExec: Function;
}
