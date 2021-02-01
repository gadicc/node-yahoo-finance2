module.exports = {
  preset: 'ts-jest',
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
