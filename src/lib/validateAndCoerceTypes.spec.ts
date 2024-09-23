import { jest } from "@jest/globals";

import { validateAndCoerceTypebox } from "./validateAndCoerceTypes.js";
import { Type } from "@sinclair/typebox";
import { YahooFinanceDate, YahooNumber } from "./yahooFinanceTypes.js";
import { FailedYahooValidationError } from "./errors.js";

describe("validateAndCoerceTypebox", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw a sensible error on failure", () => {
    const testCase = { date: { weird: 123 } };
    const testSchema = Type.Object({
      date: YahooFinanceDate,
    });

    let error: FailedYahooValidationError | undefined;
    try {
      validateAndCoerceTypebox({
        type: "result",
        data: testCase,
        schema: testSchema,
        options: {},
      });
    } catch (e) {
      error = e as unknown as FailedYahooValidationError;
    }

    expect(error).toMatchInlineSnapshot(
      `[FailedYahooValidationError: Failed Yahoo Schema validation]`,
    );

    expect(JSON.stringify(error?.errors?.[0], null, 2)).toMatchInlineSnapshot(`
      "{
        "schema": {
          "type": "object",
          "properties": {
            "date": {
              "title": "YahooFinanceDate",
              "anyOf": [
                {
                  "type": "Date"
                },
                {
                  "type": "number"
                },
                {
                  "title": "RawDateObject",
                  "type": "object",
                  "properties": {
                    "raw": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "raw"
                  ]
                },
                {
                  "title": "ISOStringDate",
                  "anyOf": [
                    {
                      "format": "date",
                      "type": "string"
                    },
                    {
                      "format": "year",
                      "type": "string"
                    },
                    {
                      "format": "date-time",
                      "type": "string"
                    }
                  ]
                }
              ]
            }
          },
          "required": [
            "date"
          ]
        },
        "value": {
          "date": {
            "weird": 123
          }
        },
        "error": {
          "type": 62,
          "schema": {
            "title": "YahooFinanceDate",
            "anyOf": [
              {
                "type": "Date"
              },
              {
                "type": "number"
              },
              {
                "title": "RawDateObject",
                "type": "object",
                "properties": {
                  "raw": {
                    "type": "number"
                  }
                },
                "required": [
                  "raw"
                ]
              },
              {
                "title": "ISOStringDate",
                "anyOf": [
                  {
                    "format": "date",
                    "type": "string"
                  },
                  {
                    "format": "year",
                    "type": "string"
                  },
                  {
                    "format": "date-time",
                    "type": "string"
                  }
                ]
              }
            ]
          },
          "path": "/date",
          "value": {
            "weird": 123
          },
          "message": "Expected union value"
        }
      }"
    `);

    expect(JSON.stringify(error?.errors?.[0]?.value, null, 2))
      .toMatchInlineSnapshot(`
      "{
        "date": {
          "weird": 123
        }
      }"
    `);
  });

  it("Should log errors when logErrors = true", () => {
    const logSpy = jest.spyOn(console, "log");
    const logSpyFn = jest.fn(() => undefined);
    logSpy.mockImplementation(logSpyFn);

    const testSchema = Type.Object({
      aNumber: YahooNumber,
    });
    const testCase = { aNumber: "foo" };
    expect(() => {
      validateAndCoerceTypebox({
        type: "result",
        data: testCase,
        schema: testSchema,
        options: {
          logErrors: true,
        },
      });
    }).toThrow();

    expect(logSpy).toHaveBeenCalledTimes(2);
    const calls = logSpyFn.mock.calls as unknown[][];

    const error = JSON.parse(calls[0][0] as string);
    expect(error).toMatchObject({
      type: 62,
      path: "/aNumber",
      value: "foo",
      message: "Expected union value",
    });

    const help = calls[1][0];
    expect(help).toMatch(/This may happen intermittently/);

    expect(logSpyFn.mock.results).toMatchObject([
      { type: "return", value: undefined },
      { type: "return", value: undefined },
    ]);
  });

  it("Should not log errors when logErrors = false", () => {
    const logSpy = jest.spyOn(console, "log");
    const logSpyFn = jest.fn(() => undefined);
    logSpy.mockImplementation(logSpyFn);

    const testSchema = Type.Object({
      aNumber: YahooNumber,
    });
    const testCase = { aNumber: "foo" };
    expect(() => {
      validateAndCoerceTypebox({
        type: "result",
        data: testCase,
        schema: testSchema,
        options: {
          logErrors: false,
        },
      });
    }).toThrow();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it("Should log options errors when logOptionsErrors = true", () => {
    const logSpy = jest.spyOn(console, "error");
    const logSpyFn = jest.fn(() => undefined);
    logSpy.mockImplementation(logSpyFn);

    const testSchema = Type.Object({
      aNumber: YahooNumber,
    });
    const testCase = { aNumber: "foo" };
    expect(() => {
      validateAndCoerceTypebox({
        type: "options",
        data: testCase,
        schema: testSchema,
        options: {
          // @ts-ignore
          logErrors: "bananas",
          logOptionsErrors: true,
        },
      });
    }).toThrow();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpyFn).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": [
          [
            "[yahooFinance] Invalid options ("{
        "type": 62,
        "schema": {
          "title": "YahooNumber",
          "anyOf": [
            {
              "title": "RawNumber",
              "type": "object",
              "properties": {
                "raw": {
                  "type": "number"
                }
              },
              "required": [
                "raw"
              ]
            },
            {
              "type": "number"
            }
          ]
        },
        "path": "/aNumber",
        "value": "foo",
        "message": "Expected union value"
      }")",
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);
  });

  it("Should not log options errors when logOptionsErrors = false", () => {
    const logSpy = jest.spyOn(console, "error");
    const logSpyFn = jest.fn(() => undefined);
    logSpy.mockImplementation(logSpyFn);

    const testSchema = Type.Object({
      aNumber: YahooNumber,
    });
    const testCase = { aNumber: "foo" };
    expect(() => {
      validateAndCoerceTypebox({
        type: "options",
        data: testCase,
        schema: testSchema,
        options: {
          // @ts-ignore
          logErrors: "bananas",
          logOptionsErrors: false,
        },
      });
    }).toThrow();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it("Should not log errors when logErrors = true and validation succeeds", () => {
    const logSpy = jest.spyOn(console, "log");
    const logSpyFn = jest.fn(() => undefined);
    logSpy.mockImplementation(logSpyFn);

    const testSchema = Type.Object({
      aNumber: YahooNumber,
    });
    const testCase = { aNumber: 10 };
    expect(() => {
      validateAndCoerceTypebox({
        type: "result",
        data: testCase,
        schema: testSchema,
        options: { logErrors: true },
      });
    }).not.toThrow();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it("Should still throw if an unexpected error occurs", () => {
    const testCase = { aNumber: 10 };
    expect(() => {
      validateAndCoerceTypebox({
        type: "result",
        data: testCase,
        // Create a TypeError to ensure that we still crash hard even
        // if it's not an error we expect
        // @ts-ignore
        schema: undefined,
      });
    }).toThrow(TypeError);
  });
});

describe("_internalThrowOnAddtionalProperties", () => {
  const schema = Type.Object(
    { name: Type.String() },
    { additionalProperties: Type.Any() },
  );

  const testCase = { name: "Gadi", aTotallyUnrelatedKey: "foo" };
  it("Should allow additional properties if a schema does when _throwOnAdditionalProperties is false", () => {
    const result = validateAndCoerceTypebox({
      type: "result",
      data: testCase,
      options: {
        _internalThrowOnAdditionalProperties: false,
      },
      schema,
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "aTotallyUnrelatedKey": "foo",
        "name": "Gadi",
      }
    `);
  });
  it("Should not allow additional properties even if a schema does when _throwOnAdditionalProperties is true", () => {
    expect(() => {
      validateAndCoerceTypebox({
        type: "options",
        data: testCase,
        schema: schema,
        options: {
          _internalThrowOnAdditionalProperties: true,
        },
      });
    }).toThrow();
  });
});
