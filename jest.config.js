module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "<rootDir>/tests/setupTests.js"
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/api/"
  ],
  reporters: [
    '<rootDir>/tests/reporter.js',
    '<rootDir>/tests/summary-reporter.js',
  ],
};
