import { Value } from "@sinclair/typebox/value";
import {
  EmptyObjectCoerceToNull,
  EpochTimestamp,
  ISOStringDate,
  NullableYahooFinanceDate,
  NullableYahooNumber,
  RawDateObject,
  RawNumber,
  TwoNumberRangeString,
  YahooDateInMs,
  YahooFinanceDate,
  YahooNumber,
  YahooTwoNumberRange,
} from "./yahooFinanceTypes";

describe("NullableYahooNumber", () => {
  it("Should pass regular numbers", () => {
    const testCase = 2;
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooNumber, testCase)).toBe(2);
  });
  it("Should coerce raw number objects", () => {
    const testCase = { raw: 0.006599537, fmt: "6.5%" };
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooNumber, testCase)).toBe(0.006599537);
  });
  it("Should pass nulls through", () => {
    const testCase = null;
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooNumber, testCase)).toBe(null);
  });
  it("Should reject invalid objects", () => {
    const testCase = { number: 10 };
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(false);
  });

  it("Should coerce an empty object to null", () => {
    const testCase = {};
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooNumber, testCase)).toBe(null);
  });

  it("Should fail if data.raw is not a number", () => {
    const testCase = { raw: true, fmt: "bananas" };
    expect(Value.Check(NullableYahooNumber, testCase)).toBe(false);
  });
});
describe("YahooNumber", () => {
  it("Should not accept empty objects as valid inputs", () => {
    const testCase = {};
    expect(Value.Check(YahooNumber, testCase)).toBe(false);
  });
});

describe("YahooTwoNumberRange", () => {
  it("Should correctly parse a string two number range", () => {
    const testCase = "-549.867 - -541.19";
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(true);
    expect(Value.Decode(YahooTwoNumberRange, testCase)).toMatchInlineSnapshot(`
      {
        "high": -541.19,
        "low": -549.867,
      }
    `);
  });

  it("Should throw for invalid string ranges", () => {
    const testCase = "X - 523.12";
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(false);
  });
  it("Should reject null", () => {
    const testCase = null;
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(false);
  });

  it("Should pass through a valid object range", () => {
    const testCase = { low: 10.24, high: 100.453 };
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(true);
    expect(Value.Decode(YahooTwoNumberRange, testCase)).toMatchInlineSnapshot(`
      {
        "high": 100.453,
        "low": 10.24,
      }
    `);
  });

  it("Should fail if an invalid type is provided for an expected object key", () => {
    const testCase = { low: true, high: undefined };
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(false);
  });

  it("Should fail if an object is malformed", () => {
    const testCase = { africa: "by Toto" };
    expect(Value.Check(YahooTwoNumberRange, testCase)).toBe(false);
  });
});

describe("YahooFinanceDate", () => {
  it("Should coerce a raw date object correctly", () => {
    const testCase = { raw: 1612313997 };
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(true);
    const decoded = Value.Decode(YahooFinanceDate, testCase);
    expect(decoded).toMatchInlineSnapshot(`2021-02-03T00:59:57.000Z`);
    expect(+decoded).toBe(testCase.raw * 1000);
  });

  it("Should coerce timestamps from the UNIX epoch to the date using MS", () => {
    const testCase = 1612313997;
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(true);
    const decoded = Value.Decode(YahooFinanceDate, testCase);
    expect(+decoded).toBe(testCase * 1000);
  });

  it("Should parse an ISO8601 date correctly", () => {
    const testCase = "2024-02-29";
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(true);
    expect(Value.Decode(YahooFinanceDate, testCase)).toMatchInlineSnapshot(
      `2024-02-29T00:00:00.000Z`
    );
  });

  it("Should parse an ISO8601 datetime correctly", () => {
    const testCase = "2024-05-04T13:24:41.100Z";
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(true);
    expect(Value.Decode(YahooFinanceDate, testCase)).toMatchInlineSnapshot(
      `2024-05-04T13:24:41.100Z`
    );
  });

  it("Should parse an ISO8601 year correctly", () => {
    const testCase = "2024-05-04";
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(true);
    expect(Value.Decode(YahooFinanceDate, testCase)).toMatchInlineSnapshot(
      `2024-05-04T00:00:00.000Z`
    );
  });

  it("Should reject obviously garbled strings", () => {
    const testCase = "fdsfsdfsd";
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(false);
  });
  it("Should reject null", () => {
    const testCase = null;
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(false);
  });

  it("Should reject an empty object", () => {
    const testCase = {};
    expect(Value.Check(YahooFinanceDate, testCase)).toBe(false);
  });
});

describe("NullableYahooFinanceDate", () => {
  it("Should accept null", () => {
    const testCase = null;
    expect(Value.Check(NullableYahooFinanceDate, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooFinanceDate, testCase)).toBe(null);
  });
  it("Should coerce an empty object to null", () => {
    const testCase = {};
    expect(Value.Check(NullableYahooFinanceDate, testCase)).toBe(true);
    expect(Value.Decode(NullableYahooFinanceDate, testCase)).toBe(null);
  });
});

describe("YahooDateInMs", () => {
  it("Should coerce a date in ms to a date object", () => {
    const testCase = 1612313997000;
    expect(Value.Check(YahooDateInMs, testCase)).toBe(true);
    expect(Value.Decode(YahooDateInMs, testCase)).toMatchInlineSnapshot(
      `2021-02-03T00:59:57.000Z`
    );
  });
});

/*
This test suite isn't super essential, it's just here for the sake of completeness.

To generate decoded types for Typebox an `encode` function must also be provided. Given that
those functions may be called we should unit test them even though in most cases they are trivial.  
*/
describe("Test building block type encoding", () => {
  it("Should encode EmptyObjectCoerceToNull correctly", () => {
    const testCase = {};
    expect(
      Value.Encode(
        EmptyObjectCoerceToNull,
        Value.Decode(EmptyObjectCoerceToNull, testCase)
      )
    ).toMatchInlineSnapshot(`{}`);
  });
  it("Should encode RawNumber correctly", () => {
    const testCase = { raw: 10, fmt: "0.06f" };
    expect(Value.Encode(RawNumber, Value.Decode(RawNumber, testCase)))
      .toMatchInlineSnapshot(`
      {
        "raw": 10,
      }
    `);
  });
  it("Should encode TwoNumberRangeString correctly", () => {
    const testCase = "10 - 20";
    expect(
      Value.Encode(
        TwoNumberRangeString,
        Value.Decode(TwoNumberRangeString, testCase)
      )
    ).toBe("10 - 20");
  });
  it("Should encode the epoch timestamp back to seconds", () => {
    const testCase = 1000;
    expect(
      Value.Encode(EpochTimestamp, Value.Decode(EpochTimestamp, testCase))
    ).toBe(testCase);
  });

  it("Should encode the raw date back to an object", () => {
    const testCase = { raw: 1000 };
    expect(Value.Encode(RawDateObject, Value.Decode(RawDateObject, testCase)))
      .toMatchInlineSnapshot(`
      {
        "raw": 1000,
      }
    `);
  });
  it("Should encode the ISOStringDate back to a valid ISOString", () => {
    const testCase = new Date(1000).toISOString();
    expect(
      Value.Encode(ISOStringDate, Value.Decode(ISOStringDate, testCase))
    ).toBe(testCase);
  });
  it("Should encode the YahooDateInMs back to MS", () => {
    const testCase = +new Date(1000);
    expect(
      Value.Encode(YahooDateInMs, Value.Decode(YahooDateInMs, testCase))
    ).toBe(testCase);
  });
});
