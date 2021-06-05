import type { ErrorObject } from "ajv/dist/types";

// Yahoo's servers returned an HTTP 400 for this request.
export class BadRequestError extends Error {
  name = "BadRequestError";
}

// Yahoo's servers returned a 'not-ok' status for this request.
// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
export class HTTPError extends Error {
  name = "HTTPError";
}

// A YahooFinance method was called with invalid options.
export class InvalidOptionsError extends Error {
  name = "InvalidOptionsError";
}

// An internal method yahooFinanceFetch() was called without this._env set.
export class NoEnvironmentError extends Error {
  name = "NoEnvironmentError";
}

export class FailedYahooValidationError extends Error {
  name = "FailedYahooValidationError";
  result: any;
  errors?: null | ErrorObject[];

  constructor(
    message: string,
    { result, errors }: { result: any; errors?: null | ErrorObject[] }
  ) {
    super(message);
    this.result = result;
    this.errors = errors;
  }
}

// Index necessary to allow things like: const ErrorClass = errors[errorName];
type ErrorsIndex = {
  [key: string]: any;
};

const errors: ErrorsIndex = {
  BadRequestError,
  HTTPError,
  InvalidOptionsError,
  NoEnvironmentError,
  FailedYahooValidationError,
};

export default errors;
