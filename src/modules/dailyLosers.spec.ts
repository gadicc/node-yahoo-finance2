import dailyLosers from "./dailyLosers.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ dailyLosers });

describe("dailyLosers", () => {
  if (process.env.FETCH_DEVEL !== "nocache")
    it("returns expected result", () => {
      const devel = "dailyLosers.json";
      return expect(yf.dailyLosers({}, { devel })).resolves.toBeDefined();
    });

  it("throws on weird result", () => {
    const devel = "weirdJsonResult.fake.json";
    return expect(yf.dailyLosers({}, { devel })).rejects.toThrow(
      /^Unexpected result/,
    );
  });
});
