import quoteSummary, { mutateDates, transformDate, quoteSummary_dateFields } from './quoteSummary';
const { InvalidOptionsError } = require('../lib/errors');

describe('quoteSummary', () => {

  describe('quoteSummary', () => {

    it('throws InvalidOptions on invalid options', async () => {
      const rwo = (options:any) => quoteSummary('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
    });

  });

  describe('transformDate', () => {

    it('converts epoch dates', () => {
      const epoch = Math.floor(new Date('2020-01-01').getTime() / 1000);
      const date = transformDate(epoch, 'epoch');
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(epoch * 1000);
    });

    it('converts dateObj dates', () => {
      const dateObjIn = {
        raw: 1601078400,
        fmt: "2020-09-26"
      }
      const dateObjOut = transformDate(dateObjIn, 'dateObj');

      // should be same object, but with added prop
      expect(dateObjIn).toBe(dateObjOut);
      expect(dateObjOut.date).toBeInstanceOf(Date);
      expect(dateObjOut.date.getTime()).toBe(dateObjIn.raw * 1000);
    });

    describe('dateStr', () => {

      it('converts valid input', () => {
        const input = '2020-01-01';
        const date = transformDate(input, 'dateStr');
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).toBe(new Date(input).getTime());
      });

    });

    describe('try multi', () => {

      it('works', () => {
        let date;
        const format = 'epoch|ISODate';

        date = transformDate(1604620800, format);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).toBe(new Date(1604620800*1000).getTime());

        date = transformDate("2021-02-05T00:00:00.000Z", format);
        expect(date).toBeInstanceOf(Date);
        expect(date.getFullYear()).toBe(2021);
      });

    });

  });

  describe('mutateDates', () => {

    it('converts array of epoch', () => {
      const obj = {
        earnings: { earningsDate: [ 1619568000, 1620000000 ] }
      };

      mutateDates(obj, quoteSummary_dateFields);

      expect(obj.earnings.earningsDate[0]).toBeInstanceOf(Date);
      expect(obj.earnings.earningsDate[1]).toBeInstanceOf(Date);
    });

    it('converts array of objects with endDate: dateObj', () => {
      const obj = {
        cashflowStatementHistoryQuarterly: {
          cashflowStatements: [
            {
              maxAge: 1,
              endDate: {
                raw: 1601078400,
                fmt: "2020-09-26"
              }
            }
          ]
        }
      };

      mutateDates(obj, quoteSummary_dateFields);

      const array = obj.cashflowStatementHistoryQuarterly.cashflowStatements;
      expect(array[0].endDate.raw).toBeDefined();
      // @ts-ignore
      expect(array[0].endDate.date).toBeInstanceOf(Date);
    });

  });

  describe('modules', () => {

    describe('price', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-price-AAPL.json';
        await quoteSummary('AAPL', { modules:['price'] }, { devel });
      });

    });

    describe('summaryDetail', () => {

      it('validates', async () => {
        const devel = 'quoteSummary-summaryDetail-AAPL.json';
        await quoteSummary('AAPL', { modules:['summaryDetail'] }, { devel });
      });

    });

  });

});
