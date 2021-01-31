// Support for the experimental syntax 'classProperties' isn't currently enabled (node 12.0.0)

class BadRequestError extends Error {
  constructor(...args) { super(...args); this.name = 'BadRequestError' }
}

class HTTPError extends Error {
  constructor(...args) { super(...args); this.name = 'HTTPError' }
}

class FailedYahooValidationError extends Error {
  constructor(...args) { super(...args); this.name = 'FailedYahooValidationError' }
}

class InvalidOptionsError extends Error {
  constructor(...args) { super(...args); this.name = 'InvalidOptionsError' }
}

module.exports = {
  BadRequestError,
  HTTPError,
  FailedYahooValidationError,
  InvalidOptionsError,
};
