import dailyGainers from "./dailyGainers.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ dailyGainers });

describe("dailyGainers", () => {
  if (process.env.FETCH_DEVEL !== "nocache")
    it("returns expected result", () => {
      const devel = "dailyGainers.json";
      return expect(
        yf.dailyGainers({}, { devel: `dailyGainers.json` })
      ).resolves.toBeDefined();
    });

  it("throws on weird result", () => {
    const devel = "weirdJsonResult.fake.json";
    return expect(yf.dailyGainers({}, { devel })).rejects.toThrow(
      /^Unexpected result/
    );
  });
});
