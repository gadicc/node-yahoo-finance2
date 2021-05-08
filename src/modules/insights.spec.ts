import insights from "./insights";
import { testSymbols } from "../../tests/symbols";

import testYf from "../../tests/testYf";

const yf = testYf({ insights });

describe("insights", () => {
  it.each(testSymbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.insights(symbol, undefined, {
      devel: `insights-${symbol}.json`,
    });
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on weird result", () => {
      const devel = "weirdJsonResult.fake.json";
      return expect(yf.insights("A", {}, { devel })).rejects.toThrow(
        /^Unexpected result/
      );
    });
});
