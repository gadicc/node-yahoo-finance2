import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { FormatRegistry } from "@sinclair/typebox";
import { isDate, isDateTime, isYear } from "./datetime.js";

FormatRegistry.Set("date", isDate);
FormatRegistry.Set("date-time", isDateTime);
FormatRegistry.Set("year", isYear);

// Strictly must be empty
export const EmptyObjectCoerceToNull = Type.Transform(
  Type.Object({}, { maxProperties: 0, title: "EmptyObjectCoerceToNull" })
)
  .Decode(() => null)
  .Encode(() => ({}));

// Technically this will also contain a string 'fmt' key but we don't care because we don't use it
export const RawNumber = Type.Transform(
  Type.Object(
    {
      raw: Type.Number(),
    },
    {
      title: "RawNumber",
    }
  )
)
  .Decode((v) => v.raw)
  .Encode((v) => ({ raw: v }));

export const TwoNumberRangeString = Type.Transform(
  Type.RegExp(/^(-?\d+(?:\.\d+)?) - (-?\d+(?:\.\d+)?)$/g, {
    title: "TwoNumberRangeString",
  })
)
  .Decode((value) => {
    // Split the two numbers allowing for negatives on either side
    const validatedNumbers = value.match(/-?\d+(?:\.\d+)?/g);

    if (!validatedNumbers) {
      throw new Error(`Unable to decode number range from: ${value}`);
    }

    const [low, high] = validatedNumbers.map((number) => parseFloat(number));

    if (isNaN(low) || isNaN(high)) {
      throw new Error(
        `Unable to decode number range from: ${value}. Decoded value for low is: ${low}, decoded value for high is: ${high}`
      );
    }
    return { low, high };
  })
  .Encode(({ low, high }) => `${low} - ${high}`);

const TwoNumberRange = Type.Object(
  {
    low: Type.Number(),
    high: Type.Number(),
  },
  { title: "TwoNumberRange" }
);

export const EpochTimestamp = Type.Transform(Type.Number())
  .Decode((v) => new Date(v * 1000))
  .Encode((v) => +v / 1000);

export const RawDateObject = Type.Transform(
  Type.Object(
    {
      raw: EpochTimestamp,
    },
    { title: "RawDateObject" }
  )
)
  .Decode((v) => v.raw)
  .Encode((v) => ({
    raw: Value.Encode(EpochTimestamp, v),
  }));

export const ISOStringDate = Type.Transform(
  Type.Union(
    [
      Type.String({ format: "date" }),
      Type.String({ format: "year" }),
      Type.String({ format: "date-time" }),
    ],
    { title: "ISOStringDate" }
  )
)
  .Decode((v) => new Date(v))
  .Encode((v) => v.toISOString());

export const YahooFinanceDate = Type.Union(
  [Type.Date(), EpochTimestamp, RawDateObject, ISOStringDate],
  { title: "YahooFinanceDate" }
);

/**
 * Validates and decodes all nullable date representations produced by Yahoo
 * e.g. accepted inputs include:
 * - 1612313997
 * - { raw: 1612313997 }
 * - "2024-02-29"
 * - "2024-05-04T13:24:41.100Z"
 * - {} (coerces to null)
 */
export const NullableYahooFinanceDate = Type.Union(
  [YahooFinanceDate, Type.Null(), EmptyObjectCoerceToNull],
  {
    title: "NullableYahooFinanceDate",
  }
);

/**
 * Validates and decodes all number types and coerces to a number
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 */

export const YahooNumber = Type.Union([RawNumber, Type.Number()], {
  title: "YahooNumber",
});

/**
 * Validates and decodes dates represented as milliseconds since the unix epoch to Date objects
 * e.g. accepted inputs include:
 * - 1612313997000
 */
export const YahooDateInMs = Type.Transform(
  Type.Number({ title: "YahooDateInMs" })
)
  .Decode((v) => new Date(v))
  .Encode((v) => +v);
/**
 * Validates and decodes all nullable number types and coerces to a number or null
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 * - null
 * - {} (coerces to null)
 */
export const NullableYahooNumber = Type.Union(
  [RawNumber, EmptyObjectCoerceToNull, Type.Number(), Type.Null()],
  {
    title: "NullableYahooNumber",
  }
);

/**
 * Validates and decodes 2 number ranges to a consistent object format of { low: <number>, high: <number> }
 * e.g. accepted inputs include:
 * - { low: 103, high: 10043 }
 * - "-32432 - 453"
 */
export const YahooTwoNumberRange = Type.Union(
  [TwoNumberRange, TwoNumberRangeString],
  {
    title: "YahooTwoNumberRange",
  }
);
