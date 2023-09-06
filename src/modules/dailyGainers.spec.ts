import dailyGainers from "./dailyGainers.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ dailyGainers });

describe("dailyGainers", () => {
  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.dailyGainers({}, undefined, { devel })).resolves.toBeDefined(
      );
    });
});
