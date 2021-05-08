const config = {
  preset: "ts-jest/presets/default-esm",
  //setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/api/", "/tests\//"],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: false, // true in main config, turned off here [modules/cjs]
    },
  },
  moduleNameMapper: {
    //"(.*)\\.js$": "$1", // turned off here [modules/cjs]
  },
  /*
  reporters: [
    '<rootDir>/tests/reporter.js',
    '<rootDir>/tests/summary-reporter.js',
  ],
  */
};

module.exports = config;
