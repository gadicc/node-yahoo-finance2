import autoc from "./autoc.js";

describe("autoc", () => {
  it("throws", () => expect(autoc()).rejects.toThrow(/issues\/337/));
});
