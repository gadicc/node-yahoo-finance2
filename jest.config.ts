import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/api/"],
  extensionsToTreatAsEsm: [".ts"],
  /*
  reporters: [
    '<rootDir>/tests/reporter.js',
    '<rootDir>/tests/summary-reporter.js',
  ],
  */
};

export default config;
