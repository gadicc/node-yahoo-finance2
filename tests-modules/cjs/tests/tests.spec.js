const yahooFinance = require("../../../dist/cjs/src/index-test.js").default;

describe("esm", () => {
  it("sanity", () => {
    expect(yahooFinance._env).toBeDefined();
  });
});
