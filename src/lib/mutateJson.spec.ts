import mutateJson from './mutateJson';
import transformField from './transformField';
import { quoteSummary_dateFields } from '../modules/quoteSummary';

describe('mutateJson', () => {

  it('converts array of epoch', () => {
    const obj = {
      earnings: { earningsDate: [ 1619568000, 1620000000 ] }
    };

    mutateJson(obj, quoteSummary_dateFields, transformField);

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

    mutateJson(obj, quoteSummary_dateFields, transformField);

    const array = obj.cashflowStatementHistoryQuarterly.cashflowStatements;
    expect(array[0].endDate).toBeInstanceOf(Date);
  });

});
