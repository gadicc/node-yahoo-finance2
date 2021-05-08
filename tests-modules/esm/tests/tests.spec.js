import yahooFinance from "../../../dist/esm/src/index-node.js";

describe("esm", () => {
  it("sanity", () => {
    expect(yahooFinance._env).toBeDefined();
  });
});
