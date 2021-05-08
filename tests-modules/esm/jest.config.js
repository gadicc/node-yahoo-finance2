const config = {
  preset: "ts-jest/presets/default-esm",
  //setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/api/", "/tests\//"],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "(.*)\\.js$": "$1",
  },
  /*
  reporters: [
    '<rootDir>/tests/reporter.js',
    '<rootDir>/tests/summary-reporter.js',
  ],
  */
};

export default config;
