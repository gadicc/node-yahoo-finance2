import validateAndCoerceTypes from './validateAndCoerceTypes';
import { InvalidOptionsError, FailedYahooValidationError } from './errors';

const QUERY_RESULT_SCHEMA_KEY = "#/definitions/QuoteSummaryResult";

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
        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        expect(result.price.priceHint).toBe(2);
      });

      it('corerces rawNumberObjs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        result.price.postMarketChangePercent = { raw: 0.006599537, fmt: "6.5%" }
        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        expect(result.price.postMarketChangePercent).toBe(0.006599537);
      });

    });

    describe('dates', () => {

      it('coerces rawNumberObjs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { raw: 1612313997 };

        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
          .toBe(1612313997 * 1000);
      });

      it('coerces epochs', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        // @ts-ignore
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
        .toBe(new Date(priceResult.price.regularMarketTime).getTime());
      });

      it('coerces strings', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        // @ts-ignore
        expect(result.price.regularMarketTime.getTime())
          .toBe(new Date(priceResult.price.regularMarketTime).getTime());
      });

      it('passes through Date objects', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        const date = new Date();
        // @ts-ignore
        result.price.postMarketTime = date;
        validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY);
        expect(result.price.postMarketTime).toBe(date);
      });

    });

    describe('failures', () => {

      it('fails on error', () => {
        const result = Object.assign({}, priceResult);
        result.price = Object.assign({}, result.price);
        // @ts-ignore
        result.price.regularMarketTime = { weird: 1612313997 };

        expect(
          () => validateAndCoerceTypes(result, QUERY_RESULT_SCHEMA_KEY)
        ).toThrow("Failed Yahoo Schema validation");

        // @ts-ignore
        const error = validateAndCoerceTypes.errors[0];
        expect(error).toBeDefined();
        expect(error.keyword).toBe('yahooFinanceType');
        expect(error.message).toBe('No matching type');
        expect(error.params).toBeDefined();
        expect(error.params.schema).toBe('date');
        expect(error.params.data).toBe(result.price.regularMarketTime);
        expect(error.dataPath).toBe('/price/regularMarketTime');
        expect(error.schemaPath).toBe('#/definitions/Price/properties/regularMarketTime/yahooFinanceType');
      });

      it('fails on invalid schema key', () => {
        expect(
          () => validateAndCoerceTypes({}, "SOME_MISSING_KEY")
        ).toThrow(/No such schema/)
      });

    });

  });

});
