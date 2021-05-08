import { jest } from "@jest/globals";

import historical from "./historical.js";
import { testSymbols } from "../../tests/symbols.js";

import testYf from "../../tests/testYf.js";

const yf = testYf({ historical });

describe("historical", () => {
  // See also common module tests in moduleExec.spec.js

  const symbolsToSkip = ["BEKE", "BFLY", "SIMP"];
  const symbols = testSymbols.filter((s) => symbolsToSkip.indexOf(s) === -1);
  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    await yf.historical(
      symbol,
      {
        period1: "2020-01-01",
        period2: "2020-01-03",
      },
      { devel: `historical-${symbol}-2020-01-01-to-2020-01-03.json` }
    );
  });

  describe("transformWith", () => {
    const yf = { _moduleExec: jest.fn(), historical };
    yf.historical("symbol", { period1: "required-but-not-used" });
    // @ts-ignore: TODO
    const { transformWith } = yf._moduleExec.mock.calls[0][0].query;

    it("uses today's date as default for period2", () => {
      const now = new Date();
      const options = transformWith({ period1: "2020-01-01" });
      expect(options.period2).toBeDefined();
      expect(options.period2).toBe(Math.floor(now.getTime() / 1000));
    });
  });
});
