module.exports = {};

const errorNames = [
  'BadRequestError',
  'HTTPError',
  'FailedYahooValidationError',
  'InvalidOptionsError'
];

errorNames.forEach(name => {
  // Support for the experimental syntax 'classProperties' isn't currently enabled (node 12.0.0)
  module.exports[name] = class extends Error {};
  module.exports[name].name = name;
});
