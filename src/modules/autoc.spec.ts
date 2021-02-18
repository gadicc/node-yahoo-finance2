import autoc from "./autoc";
import { testSymbols } from "../../tests/symbols";

import testYf from "../../tests/testYf";

const yf = testYf({ autoc });

describe("autoc", () => {
  // See also common module tests in moduleExec.spec.js

  it.each(testSymbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.autoc(symbol, {}, { devel: `autoc-${symbol}.json` });
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on unexpected input", async () => {
      await expect(
        yf.autoc("AAPL", {}, { devel: "weirdJsonResult.fake.json" })
      ).rejects.toThrow(/Unexpected result/);
    });
});
