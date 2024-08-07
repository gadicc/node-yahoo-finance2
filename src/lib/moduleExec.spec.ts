import { jest } from "@jest/globals";

import search from "../modules/search.js";
import chart from "../modules/chart.js";
import { FailedYahooValidationError, InvalidOptionsError } from "./errors.js";
import testYf from "../../tests/testYf.js";
import { Type } from "@sinclair/typebox";

const yf = testYf({ search, chart });
yf._opts.validation.logOptionsErrors = false;
yf._opts.validation.logErrors = false;

describe("moduleExecTypebox", () => {
  describe("assertSymbol", () => {
    const periodOpts = {
      period1: new Date("2022-02-22"),
      period2: new Date("2022-02-23"),
    };

    it("accepts a string", async () => {
      await expect(
        yf.chart("AAPL", periodOpts, { devel: "chart-AAPL.json" })
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

    it("accepts empty queryOptions", async () => {
      await expect(
        yf.search("AAPL", undefined, { devel: "search-AAPL.json" })
      ).resolves.toBeDefined();
    });

    it("logs errors on invalid options when logOptionsErrors = true", async () => {
      yf._opts.validation.logOptionsErrors = true;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
      console = realConsole;

      expect(
        fakeConsole.log.mock.calls.length +
          fakeConsole.error.mock.calls.length +
          fakeConsole.dir.mock.calls.length
      ).toBe(1);
      yf._opts.validation.logOptionsErrors = false;
    });

    it("does not log errors on invalid options when logOptionsErrors = false", async () => {
      yf._opts.validation.logOptionsErrors = false;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      const rwo = (options: any) => yf.search("symbol", options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError);
      console = realConsole;
      expect(
        fakeConsole.log.mock.calls.length +
          fakeConsole.error.mock.calls.length +
          fakeConsole.dir.mock.calls.length
      ).toBe(0);
    });
  });

  describe("result validation", () => {
    if (process.env.FETCH_DEVEL !== "nocache")
      it("throws on unexpected input", async () => {
        yf._opts.validation.logErrors = false;
        await expect(
          yf.search("AAPL", {}, { devel: "search-badResult.fake.json" })
        ).rejects.toThrow(FailedYahooValidationError);
        yf._opts.validation.logErrors = true;
      });

    it("dont throw or log on unexpected input with {validateResult: false}", async () => {
      yf._opts.validation.logErrors = true;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      if (process.env.FETCH_DEVEL !== "nocache")
        await expect(
          yf.search(
            "AAPL",
            {},
            {
              devel: "search-badResult.fake.json",
              validateResult: false,
            }
          )
        ).resolves.toBeDefined();
      console = realConsole;

      expect(fakeConsole.log).not.toHaveBeenCalled();
      expect(fakeConsole.error).not.toHaveBeenCalled();
      expect(fakeConsole.dir).not.toHaveBeenCalled();
    });
  });
  describe("correctly invokes callbacks when provided", () => {
    it("Should invoke the query options transformWith function when one is provided", async () => {
      const yf = testYf({ _fetch: jest.fn() });
      const overrides = { overrideKey: "thingy" };
      const optionsTransformWith = jest.fn((v: Record<string, string>) => ({
        ...v,
        overrideKey: "bobby",
      }));

      await yf._moduleExec({
        query: {
          transformWith: optionsTransformWith,
          assertSymbol: false,
          schema: Type.Any(),
          overrides,
        },
        result: {
          schema: Type.Any(),
        },
      });
      expect(optionsTransformWith).toHaveBeenCalledTimes(1);
      expect(optionsTransformWith).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": [
            [
              {
                "overrideKey": "thingy",
              },
            ],
          ],
          "results": [
            {
              "type": "return",
              "value": {
                "overrideKey": "bobby",
              },
            },
          ],
        }
      `);
    });
    it("Should invoke the result transformWith function when one is provided", async () => {
      const yf = testYf({ _fetch: jest.fn(() => ({ statusCode: 200 })) });
      const resultTransformedWith = jest.fn((v: Record<string, string>) => {
        return { overrideKey: "bobby" };
      });

      await yf._moduleExec({
        query: {
          assertSymbol: false,
          schema: Type.Any(),
        },
        result: {
          schema: Type.Any(),
          transformWith: resultTransformedWith,
        },
      });
      expect(resultTransformedWith).toHaveBeenCalledTimes(1);
      expect(resultTransformedWith).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": [
            [
              {
                "statusCode": 200,
              },
            ],
          ],
          "results": [
            {
              "type": "return",
              "value": {
                "overrideKey": "bobby",
              },
            },
          ],
        }
      `);
    });
    it("should throw when symbol assertion is enabled but a non-string symbol is provided", () => {
      const yf = testYf({ _fetch: jest.fn() });
      expect(
        async () =>
          await yf._moduleExec({
            query: {
              assertSymbol: true,
              schema: Type.Any(),
            },
            result: {
              schema: Type.Any(),
            },
          })
      ).rejects.toThrow();
    });
    it("should pass a string symbol when symbol assertion is enabled", () => {
      const yf = testYf({ _fetch: jest.fn() });
      expect(
        async () =>
          await yf._moduleExec({
            query: {
              assertSymbol: "AAPL",
              schema: Type.Any(),
            },
            result: {
              schema: Type.Any(),
            },
          })
      ).not.toThrow();
    });
  });
});
