import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  PERFORM_FAKE_TESTS,
  setupCache,
} from "../../tests/common.ts";
import { spy } from "@std/testing/mock";

import search from "../modules/search.ts";
import chart from "../modules/chart.ts";
import { InvalidOptionsError } from "./errors.ts";

const YahooFinance = createTestYahooFinance({ modules: { search, chart } });
const yf = new YahooFinance({ validation: { logErrors: false } });

function createNewLogger() {
  return {
    info: spy(),
    warn: spy(),
    error: spy(),
    debug: spy(),
    dir: spy(),
  };
}

describe("moduleExec", () => {
  setupCache();

  describe("assertSymbol", () => {
    const periodOpts = {
      period1: new Date("2022-02-22"),
      period2: new Date("2022-02-23"),
    };

    it("accepts a string", async () => {
      await expect(
        yf.chart("AAPL", periodOpts, { devel: "chart-AAPL.json" }),
      ).resolves.toBeDefined();
    });

    it("throws otherwise", async () => {
      const yfc = (symbol: any) => yf.chart(symbol, periodOpts);
      await expect(yfc(["AAPL"])).rejects.toThrow(/string symbol/);
    });
  });

  describe("options validation", () => {
    it("throws InvalidOptions on invalid options", async () => {
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
    });

    /*
    XXX TODO
    * with new yf() option, and with moduleoptions
    it("throws InvalidOptions on invalid options with validateOptions = false", async () => {
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
    });
    */

    it("accepts empty queryOptions", async () => {
      await expect(
        yf.search("AAPL", undefined, { devel: "search-AAPL.json" }),
      ).resolves.toBeDefined();
    });

    it("logs errors on invalid options when logOptionsErrors = true", async () => {
      const logger = createNewLogger();
      const yf = new YahooFinance({
        logger,
        validation: { logOptionsErrors: true },
      });
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
      expect(
        logger.info.calls.length +
          logger.error.calls.length +
          logger.dir.calls.length,
      ).toBeGreaterThan(1);
    });

    it("does not log errors on invalid options when logOptionsErrors = false", async () => {
      const logger = createNewLogger();
      const yf = new YahooFinance({
        logger,
        validation: { logOptionsErrors: false },
      });
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
      expect(
        logger.info.calls.length +
          logger.error.calls.length +
          logger.dir.calls.length,
      ).toBe(0);
    });
  });

  /* XXX TODO
  describe("result validation", () => {
    if (PERFORM_FAKE_TESTS) {
      it("throws on unexpected input", async () => {
        await expect(
          yf.search("AAPL", {}, { devel: "search-badResult.fake.json" }),
        ).rejects.toThrow(/Failed Yahoo Schema/);
      });
    }

    it("dont throw or log on unexpected input with {validateResult: false}", async () => {
      const logger = createNewLogger();
      const yf = new YahooFinance({ logger, validation: { logErrors: false } });
      if (PERFORM_FAKE_TESTS) {
        await expect(
          yf.search(
            "AAPL",
            {},
            {
              devel: "search-badResult.fake.json",
              validateResult: false,
            },
          ),
        ).resolves.toBeDefined();
      }

      expect(logger.info).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
      expect(logger.dir).not.toHaveBeenCalled();
    });
  });
  */
});
