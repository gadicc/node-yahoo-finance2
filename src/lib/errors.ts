import type { ErrorObject } from "ajv/dist/types"

export class BadRequestError extends Error { name = 'BadRequestError' }
export class HTTPError extends Error { name = 'HTTPError' }
export class InvalidOptionsError extends Error { name = 'InvalidOptionsError' }
export class NoEnvironmentError extends Error { name = 'NoEnvironmentError' }

export class FailedYahooValidationError extends Error {
  name = 'FailedYahooValidationError';
  result: any;
  errors?: null | ErrorObject[];

  constructor(
    message: string,
    { result, errors }: { result: any, errors?: null | ErrorObject[] }
  ) {
    super(message);
    this.result = result;
    this.errors = errors;
  }
}
