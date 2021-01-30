class BadRequestError extends Error { name = "BadRequestError" }
class HTTPError extends Error { name = "HTTPError" }
class FailedYahooValidationError extends Error { name = "FailedYahooValidationError" }
class InvalidOptionsError extends Error { name = "InvalidOptionsError" }

module.exports = {
  BadRequestError,
  HTTPError,
  FailedYahooValidationError,
  InvalidOptionsError,
};
