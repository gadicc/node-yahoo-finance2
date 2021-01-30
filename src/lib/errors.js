// Support for the experimental syntax 'classProperties' isn't currently enabled (node 12.0.0)

class BadRequestError extends Error {}
BadRequestError.name = 'BadRequestError';

class HTTPError extends Error {}
HTTPError.name = 'HTTPError';

class FailedYahooValidationError extends Error {}
FailedYahooValidationError.name = 'FailedYahooValidationError';

class InvalidOptionsError extends Error {}
InvalidOptionsError.name = 'InvalidOptionsError';

module.exports = {
  BadRequestError,
  HTTPError,
  FailedYahooValidationError,
  InvalidOptionsError,
};
