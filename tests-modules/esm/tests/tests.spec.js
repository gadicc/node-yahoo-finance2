import yahooFinance from "../../../dist/esm/src/index-test.js";

describe("esm", () => {
  it("sanity", () => {
    expect(yahooFinance._env).toBeDefined();
  });
});
