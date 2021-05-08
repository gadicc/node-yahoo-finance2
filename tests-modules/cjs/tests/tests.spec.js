const yahooFinance = require("../../../dist/cjs/src/index-node.js").default;

describe("esm", () => {
  it("sanity", () => {
    expect(yahooFinance._env).toBeDefined();
  });
});
