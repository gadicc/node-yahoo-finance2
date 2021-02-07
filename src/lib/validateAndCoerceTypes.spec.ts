import validateAndCoerceTypes, { ajv } from './validateAndCoerceTypes';
import { InvalidOptionsError, FailedYahooValidationError } from './errors';

const defParams = {
  source: "validateAndCoerceTypes.spec.js",
  schemaKey: "#/definitions/QuoteSummaryResult",
  options: {
    logErrors: true,
    logOptionsErrors: true,
  }
};

const priceResult = {
  price: {
    maxAge: 1,
    preMarketSource: 'FREE_REALTIME',
    // 0.006599537 from RawNumberObj
    postMarketChangePercent: { raw: 0.006599537, fmt: "6.5%" }, //
    postMarketChange: 5.76001,
    // new Date("2021-02-03T00:59:57.000Z"),
    postMarketTime: 1612313997, // <---------------- Date: epoch
    postMarketPrice: 878.55,
    postMarketSource: 'DELAYED',
    regularMarketChangePercent: 0.039270766,
    regularMarketChange: 32.97998,
    // new Date("2021-02-02T21:00:01.000Z")
    regularMarketTime: '2021-02-02T21:00:01.000Z', // Date: ISODate
    priceHint: 2, // test this as regular number
    regularMarketPrice: 872.79,
    regularMarketDayHigh: 880.5,
    regularMarketDayLow: 842.2006,
    regularMarketVolume: 24346213,
    regularMarketPreviousClose: 839.81,
    regularMarketSource: 'FREE_REALTIME',
    regularMarketOpen: 844.68,
    exchange: 'NMS',
    exchangeName: 'NasdaqGS',
    exchangeDataDelayedBy: 0,
    marketState: 'PREPRE',
    quoteType: 'EQUITY',
    symbol: 'TSLA',
    underlyingSymbol: null,
    shortName: 'Tesla, Inc.',
    longName: 'Tesla, Inc.',
    currency: 'USD',
    quoteSourceName: 'Delayed Quote',
    currencySymbol: '$',
    fromCurrency: null,
    toCurrency: null,
    lastMarket: null,
    marketCap: 827318468608
  }
};

describe('validateAndCoerceTypes', () => {

  describe('coersion', () => {

    describe('numbers', () => {

      it('passes regular numbers', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        expect(result.price.priceHint).toBe(2);
      });

      it('corerces rawNumberObjs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        result.price.postMarketChangePercent = { raw: 0.006599537, fmt: "6.5%" }
        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        expect(result.price.postMarketChangePercent).toBe(0.006599537);
      });

      it('fails if data is not a number nor object', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = true;
        expect(
          () => validateAndCoerceTypes({
            ...defParams, type: 'result', object: result,
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it('fails if data.raw is not a number', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = { raw: "a string" };
        expect(
          () => validateAndCoerceTypes({
            ...defParams, type: 'result', object: result,
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it('fails if string returns a NaN', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketChangePercent = "not-a-number";
        expect(
          () => validateAndCoerceTypes({
            ...defParams, type: 'result', object: result,
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

    });

    describe('dates', () => {

      it('coerces rawNumberObjs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { raw: 1612313997 };

        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
          .toBe(1612313997 * 1000);
      });

      it('coerces epochs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
        .toBe(new Date(priceResult.price.regularMarketTime).getTime());
      });

      it('coerces recognizable date string', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
          .toBe(new Date(priceResult.price.regularMarketTime).getTime());
      });

      it('throws on non-matching strings', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        /* @ts-ignore */
        result.price.postMarketTime = "clearly not a date";
        expect(
          () => validateAndCoerceTypes({
            ...defParams, type: 'result', object: result,
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow(/Failed Yahoo Schema/);
      });

      it('passes through Date objects', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        const date = new Date();
        // @ts-ignore
        result.price.postMarketTime = date;
        validateAndCoerceTypes({ ...defParams, type: 'result', object: result });
        expect(result.price.postMarketTime).toBe(date);
      });

    });

    describe('failures', () => {

      it('fails on invalid options usage', () => {
        const options = { period1: true };
        expect(
          () => validateAndCoerceTypes({
            ...defParams,
            object: options,
            type: 'options',
            schemaKey: "#/definitions/HistoricalOptions",
            source: "historical-in-validate.spec",
            options: { ...defParams.options, logOptionsErrors: false }
          })
        ).toThrow(InvalidOptionsError)
      });

      it('fails on error', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { weird: 1612313997 };

        let error: FailedYahooValidationError;
        try {
          validateAndCoerceTypes({
            ...defParams, object: result, type: 'result',
            options: { ...defParams.options, logErrors: false }
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
        expect(error0.keyword).toBe('yahooFinanceType');
        expect(error0.message).toBe('No matching type');
        expect(error0.params).toBeDefined();

        if (!error0.params) return;
        expect(error0.params.schema).toBe('date');
        expect(error0.params.data).toBe(result.price.regularMarketTime);
        expect(error0.dataPath).toBe('/price/regularMarketTime');
        expect(error0.schemaPath).toBe('#/definitions/Price/properties/regularMarketTime/yahooFinanceType');
      });

      it('fails on invalid schema key', () => {
        expect(
          () => validateAndCoerceTypes({
            ...defParams,
            object: {},
            type: 'result',
            schemaKey: "SOME_MISSING_KEY",
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow(/No such schema/)
      });

      // i.e. on output not from bin/modify-schema
      it('fails when yahooFinanceType is not "date"|"number"', () => {
        const schema = { yahooFinanceType: "impossible" };
        const validate = ajv.compile(schema);
        expect(
          () => validate({})
        ).toThrow(/No such yahooFinanceType/);
      });

      it('logs errors when logErrors=true', () => {
        const origConsole = console;
        const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

        /* @ts-ignore */
        console = fakeConsole;
        expect(
          () => validateAndCoerceTypes({
            ...defParams,
            object: { a: 1 },
            type: 'result',
            options: { ...defParams.options, logErrors: true }
          })
        ).toThrow("Failed Yahoo Schema validation");
        console = origConsole;

        expect(fakeConsole.log).toHaveBeenCalled();
      });

      it('does not log errors when logErrors=false', () => {
        const origConsole = console;
        const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

        /* @ts-ignore */
        console = fakeConsole;
        expect(
          () => validateAndCoerceTypes({
            ...defParams,
            object: { a: 1 },
            type: 'result',
            options: { ...defParams.options, logErrors: false }
          })
        ).toThrow("Failed Yahoo Schema validation");
        console = origConsole;

        expect(fakeConsole.log).not.toHaveBeenCalled();
        expect(fakeConsole.error).not.toHaveBeenCalled();
        expect(fakeConsole.dir).not.toHaveBeenCalled();
      });

      it('returns results/errors in error object', () => {
        const result = { nonExistingModule: true };

        let error;
        try {
          validateAndCoerceTypes({
              ...defParams, object: result, type: "result",
              options: { ...defParams.options, logErrors: false }
            });
        } catch (e) {
          error = e;
        }

        expect(error).toBeDefined();
        expect(error.message).toMatch(/Failed Yahoo/);
        expect(error.result).toBe(result);
        expect(error.errors).toBeType('array');
      });

    });

  });

});
