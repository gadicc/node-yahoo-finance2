import { jest } from "@jest/globals";

import historicalv8 from "./_historicalv8.js";
import { testSymbols } from "../../tests/symbols.js";

import testYf from "../../tests/testYf.js";
import { consoleSilent, consoleRestore } from "../../tests/console.js";

const yf = testYf({ historicalv8 });

describe("historicalv8", () => {
  // See also common module tests in moduleExec.spec.js

  const symbolsToSkip = ["BEKE", "BFLY", "SIMP", "^VXAPL" /* Not Found */];
  const symbols = testSymbols.filter((s) => symbolsToSkip.indexOf(s) === -1);
  it.each(symbols)("passes validation for symbol '%s'", async (symbol) => {
    const period1 = "2020-01-01";
    const period2 = "2021-01-04";

    await yf.historicalv8(
      symbol,
      {
        period1: period1,
        period2: period2,
        events: "div|split",
      },
      {
        devel: `historicalv8-${symbol}-${period1}-to-${period2}.json`,
        validateResult: true,
      }
    );
  });

  describe("transformWith", () => {
    const yf = { _moduleExec: jest.fn(), historicalv8 };
    // @ts-ignore: TODO
    yf.historicalv8("symbol", { period1: "required-but-not-used" });
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
