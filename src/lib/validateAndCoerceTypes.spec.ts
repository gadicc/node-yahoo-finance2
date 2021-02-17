import validateAndCoerceTypes, { ajv } from "./validateAndCoerceTypes";
import { InvalidOptionsError, FailedYahooValidationError } from "./errors";

ajv.addSchema({
  $id: "testSchema",
  $schema: "http://json-schema.org/draft-07/schema#",
  properties: {
    date: { yahooFinanceType: "date" },
    dateInMs: { yahooFinanceType: "DateInMs" },
    twoNumberRange: { yahooFinanceType: "TwoNumberRange" },
    number: { yahooFinanceType: "number" },
    numberNull: { yahooFinanceType: "number|null" },
  },
  type: "object",
});

const defParams = {
  source: "validateAndCoerceTypes.spec.js",
  schemaKey: "#/definitions/QuoteSummaryResult",
  options: {
    logErrors: true,
    logOptionsErrors: true,
  },
};

const priceResult = {
  price: {
    maxAge: 1,
    preMarketSource: "FREE_REALTIME",
    // 0.006599537 from RawNumberObj
    postMarketChangePercent: { raw: 0.006599537, fmt: "6.5%" }, //
    postMarketChange: 5.76001,
    // new Date("2021-02-03T00:59:57.000Z"),
    postMarketTime: 1612313997, // <---------------- Date: epoch
    postMarketPrice: 878.55,
    postMarketSource: "DELAYED",
    regularMarketChangePercent: 0.039270766,
    regularMarketChange: 32.97998,
    // new Date("2021-02-02T21:00:01.000Z")
    regularMarketTime: "2021-02-02T21:00:01.000Z", // Date: ISODate
    priceHint: 2, // test this as regular number
    regularMarketPrice: 872.79,
    regularMarketDayHigh: 880.5,
    regularMarketDayLow: 842.2006,
    regularMarketVolume: 24346213,
    regularMarketPreviousClose: 839.81,
    regularMarketSource: "FREE_REALTIME",
    regularMarketOpen: 844.68,
    exchange: "NMS",
    exchangeName: "NasdaqGS",
    exchangeDataDelayedBy: 0,
    marketState: "PREPRE",
    quoteType: "EQUITY",
    symbol: "TSLA",
    underlyingSymbol: null,
    shortName: "Tesla, Inc.",
    longName: "Tesla, Inc.",
    currency: "USD",
    quoteSourceName: "Delayed Quote",
    currencySymbol: "$",
    fromCurrency: null,
    toCurrency: null,
    lastMarket: null,
    marketCap: 827318468608,
  },
};

const quoteResult = [
  {
    language: "en-US",
    region: "US",
    quoteType: "EQUITY",
    quoteSourceName: "Delayed Quote",
    triggerable: true,
    currency: "USD",
    exchange: "NMS",
    shortName: "NVIDIA Corporation",
    longName: "NVIDIA Corporation",
    messageBoardId: "finmb_32307",
    exchangeTimezoneName: "America/New_York",
    exchangeTimezoneShortName: "EST",
    gmtOffSetMilliseconds: -18000000,
    market: "us_market",
    esgPopulated: false,
    epsCurrentYear: 9.72,
    priceEpsCurrentYear: 55.930042,
    sharesOutstanding: 619000000,
    bookValue: 24.772,
    fiftyDayAverage: 530.8828,
    fiftyDayAverageChange: 12.757202,
    fiftyDayAverageChangePercent: 0.024030166,
    twoHundredDayAverage: 515.8518,
    twoHundredDayAverageChange: 27.788208,
    twoHundredDayAverageChangePercent: 0.053868588,
    marketCap: 336513171456,
    forwardPE: 46.54452,
    priceToBook: 21.945745,
    sourceInterval: 15,
    exchangeDataDelayedBy: 0,
    tradeable: false,
    firstTradeDateMilliseconds: 917015400000,
    priceHint: 2,
    marketState: "PREPRE",
    postMarketChangePercent: 0.093813874,
    postMarketTime: 1612573179,
    postMarketPrice: 544.15,
    postMarketChange: 0.51000977,
    regularMarketChange: -2.9299927,
    regularMarketChangePercent: -0.53606904,
    regularMarketTime: 1612558802,
    regularMarketPrice: 543.64,
    regularMarketDayHigh: 549.19,
    regularMarketDayRange: "541.867 - 549.19",
    regularMarketDayLow: 541.867,
    regularMarketVolume: 4228841,
    regularMarketPreviousClose: 546.57,
    bid: 0.0,
    ask: 0.0,
    bidSize: 18,
    askSize: 8,
    fullExchangeName: "NasdaqGS",
    financialCurrency: "USD",
    regularMarketOpen: 549.0,
    averageDailyVolume3Month: 7475022,
    averageDailyVolume10Day: 5546385,
    fiftyTwoWeekLowChange: 362.96002,
    fiftyTwoWeekLowChangePercent: 2.0088556,
    fiftyTwoWeekRange: "180.68 - 589.07",
    fiftyTwoWeekHighChange: -45.429993,
    fiftyTwoWeekHighChangePercent: -0.07712155,
    fiftyTwoWeekLow: 180.68,
    fiftyTwoWeekHigh: 589.07,
    dividendDate: 1609200000,
    earningsTimestamp: 1614200400,
    earningsTimestampStart: 1614200400,
    earningsTimestampEnd: 1614200400,
    trailingAnnualDividendRate: 0.64,
    trailingPE: 88.873634,
    trailingAnnualDividendYield: 0.0011709387,
    epsTrailingTwelveMonths: 6.117,
    epsForward: 11.68,
    displayName: "NVIDIA",
    symbol: "NVDA",
  },
];

describe("validateAndCoerceTypes", () => {
  describe("coersion", () => {
    describe("numbers", () => {
      it("passes regular numbers", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        expect(result.price.priceHint).toBe(2);
      });

      it("corerces rawNumberObjs", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        result.price.postMarketChangePercent = {
          raw: 0.006599537,
          fmt: "6.5%",
        };
        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        expect(result.price.postMarketChangePercent).toBe(0.006599537);
      });

      it("passes if data is null and type IS number|null", () => {
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            schemaKey: "testSchema",
            type: "result",
            object: { numberNull: null },
          })
        ).not.toThrow();
      });

      it("fails if data is null and type IS NOT number|null", () => {
        let error;
        try {
          validateAndCoerceTypes({
            ...defParams,
            schemaKey: "testSchema",
            type: "result",
            object: { number: null },
            options: { ...defParams.options, logErrors: false },
          });
        } catch (e) {
          error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors[0].message).toMatch(/Expecting number/);
      });

      it("passes and coerces {} to null if type IS number|null", () => {
        const object = { numberNull: {} };
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            schemaKey: "testSchema",
            type: "result",
            object,
          })
        ).not.toThrow();
        expect(object.numberNull).toBe(null);
      });

      it("fails when receiving {} if type IS NOT number|null", () => {
        let error;
        try {
          validateAndCoerceTypes({
            ...defParams,
            schemaKey: "testSchema",
            type: "result",
            object: { number: {} },
            options: { ...defParams.options, logErrors: false },
          });
        } catch (e) {
          error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors[0].message).toMatch(/number \| null/);
      });

      it("fails if data is not a number nor object", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = true;
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            type: "result",
            object: result,
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it("fails if data.raw is not a number", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = { raw: "a string" };
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            type: "result",
            object: result,
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it("fails if string returns a NaN", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = "not-a-number";
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            type: "result",
            object: result,
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow(/Failed Yahoo Schema/);
      });
    });

    describe("dates", () => {
      it("coerces rawNumberObjs", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { raw: 1612313997 };

        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime()).toBe(
          1612313997 * 1000
        );
      });

      it("coerces epochs", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime()).toBe(
          new Date(priceResult.price.regularMarketTime).getTime()
        );
      });

      it("coerces recognizable date string", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime()).toBe(
          new Date(priceResult.price.regularMarketTime).getTime()
        );
      });

      it("throws on non-matching strings", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketTime = "clearly not a date";
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            type: "result",
            object: result,
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it("passes through Date objects", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        const date = new Date();
        // @ts-ignore
        result.price.postMarketTime = date;
        validateAndCoerceTypes({
          ...defParams,
          type: "result",
          object: result,
        });
        expect(result.price.postMarketTime).toBe(date);
      });
    });

    describe("DateInMs", () => {
      const _defParams = {
        ...defParams,
        schemaKey: "#/definitions/QuoteResponse",
      };

      it("works with date in milliseconds", () => {
        const result = [Object.assign({}, quoteResult[0])];
        /* @ts-ignore */
        expect(result[0].firstTradeDateMilliseconds).toBeType("number");
        validateAndCoerceTypes({
          ..._defParams,
          type: "result",
          object: result,
        });
        expect(result[0].firstTradeDateMilliseconds).toBeInstanceOf(Date);
      });
    });

    describe("TwoNumberRange", () => {
      const _defParams = {
        ...defParams,
        schemaKey: "#/definitions/QuoteResponse",
      };

      it("works with valid input", () => {
        const result = [Object.assign({}, quoteResult[0])];
        result[0].regularMarketDayRange = "541.867 - 549.19";
        validateAndCoerceTypes({
          ..._defParams,
          type: "result",
          object: result,
        });
        expect(result[0].regularMarketDayRange).toMatchObject({
          low: 541.867,
          high: 549.19,
        });
      });

      it("throws on invalid input", () => {
        const result = [Object.assign({}, quoteResult[0])];
        result[0].regularMarketDayRange = "X - 549.19";
        expect(() =>
          validateAndCoerceTypes({
            ..._defParams,
            type: "result",
            object: result,
            options: { ..._defParams.options, logErrors: false },
          })
        ).toThrow(/^Failed Yahoo/);
      });

      it("throws no matching type on weird input", () => {
        const result = [Object.assign({}, quoteResult[0])];
        /* @ts-ignore */
        result[0].regularMarketDayRange = 12;
        expect(() =>
          validateAndCoerceTypes({
            ..._defParams,
            type: "result",
            object: result,
            options: { ..._defParams.options, logErrors: false },
          })
        ).toThrow(/^Failed Yahoo/);
      });
    });

    describe("failures", () => {
      it("fails on invalid options usage", () => {
        const options = { period1: true };
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            object: options,
            type: "options",
            schemaKey: "#/definitions/HistoricalOptions",
            source: "historical-in-validate.spec",
            options: { ...defParams.options, logOptionsErrors: false },
          })
        ).toThrow(InvalidOptionsError);
      });

      it("fails on error", () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { weird: 1612313997 };

        let error: FailedYahooValidationError;
        try {
          validateAndCoerceTypes({
            ...defParams,
            object: result,
            type: "result",
            options: { ...defParams.options, logErrors: false },
          });
        } catch (e) {
          error = e;
        }

        /* @ts-ignore */
        expect(error).toBeDefined();

        /* @ts-ignore */
        if (!error) return;
        expect(error.message).toMatch(/Failed Yahoo Schema/);

        /* @ts-ignore */
        const error0 = error.errors[0];
        expect(error0).toBeDefined();
        expect(error0.keyword).toBe("yahooFinanceType");
        expect(error0.message).toBe("No matching type");
        expect(error0.params).toBeDefined();

        if (!error0.params) return;
        expect(error0.params.schema).toBe("date");
        expect(error0.params.data).toBe(result.price.regularMarketTime);
        expect(error0.dataPath).toBe("/price/regularMarketTime");
        expect(error0.schemaPath).toBe(
          "#/definitions/Price/properties/regularMarketTime/yahooFinanceType"
        );
      });

      it("fails on invalid schema key", () => {
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            object: {},
            type: "result",
            schemaKey: "SOME_MISSING_KEY",
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow(/No such schema/);
      });

      // i.e. on output not from bin/modify-schema
      it('fails when yahooFinanceType is not "date"|"number"', () => {
        const schema = { yahooFinanceType: "impossible" };
        const validate = ajv.compile(schema);
        expect(() => validate({})).toThrow(/No such yahooFinanceType/);
      });

      it("logs errors when logErrors=true", () => {
        const origConsole = console;
        const fakeConsole = {
          error: jest.fn(),
          log: jest.fn(),
          dir: jest.fn(),
        };

        /* @ts-ignore */
        console = fakeConsole;
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            object: { a: 1 },
            type: "result",
            options: { ...defParams.options, logErrors: true },
          })
        ).toThrow("Failed Yahoo Schema validation");
        console = origConsole;

        expect(fakeConsole.log).toHaveBeenCalled();
      });

      it("does not log errors when logErrors=false", () => {
        const origConsole = console;
        const fakeConsole = {
          error: jest.fn(),
          log: jest.fn(),
          dir: jest.fn(),
        };

        /* @ts-ignore */
        console = fakeConsole;
        expect(() =>
          validateAndCoerceTypes({
            ...defParams,
            object: { a: 1 },
            type: "result",
            options: { ...defParams.options, logErrors: false },
          })
        ).toThrow("Failed Yahoo Schema validation");
        console = origConsole;

        expect(fakeConsole.log).not.toHaveBeenCalled();
        expect(fakeConsole.error).not.toHaveBeenCalled();
        expect(fakeConsole.dir).not.toHaveBeenCalled();
      });

      it("returns results/errors in error object", () => {
        const result = { nonExistingModule: true };

        let error;
        try {
          validateAndCoerceTypes({
            ...defParams,
            object: result,
            type: "result",
            options: { ...defParams.options, logErrors: false },
          });
        } catch (e) {
          error = e;
        }

        expect(error).toBeDefined();
        expect(error.message).toMatch(/Failed Yahoo/);
        expect(error.result).toBe(result);
        expect(error.errors).toBeType("array");
      });

      it("returns ref to problem data in error object", () => {
        const result = { price: "str", nonExistingModule: true };

        let error;
        try {
          validateAndCoerceTypes({
            ...defParams,
            object: result,
            type: "result",
            options: { ...defParams.options, logErrors: false },
          });
        } catch (e) {
          error = e;
        }

        expect(error).toBeDefined();
        expect(error.message).toMatch(/Failed Yahoo/);

        // dataPath: '', params: { additionalProperty: 'nonExistingModule' }
        expect(error.errors[0].data).not.toBeDefined();

        // schemaPath: .../type.  params: { type: 'object' }
        expect(error.errors[1].data).toBe("str");
      });
    });
  });
});
