import transformField from './transformField';

describe('transformField', () => {

  it('converts epoch dates', () => {
    const epoch = Math.floor(new Date('2020-01-01').getTime() / 1000);
    const date = transformField(epoch, 'epoch');
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBe(epoch * 1000);
  });

  it('converts dateObj dates', () => {
    const dateObj = {
      raw: 1601078400,
      fmt: "2020-09-26"
    }
    const date = transformField(dateObj, 'dateObj');

    // should be same object, but with added prop
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBe(dateObj.raw * 1000);
  });

  describe('dateStr', () => {

    it('converts valid input', () => {
      const input = '2020-01-01';
      const date = transformField(input, 'dateStr');
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(new Date(input).getTime());
    });

  });

  describe('ISODate', () => {

    it('converts valid input', () => {
      const input = '2021-02-01T07:38:07.751Z';
      const date = transformField(input, 'dateStr');
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(new Date(input).getTime());
    });

  });

  describe('rawNumberObj', () => {

    it('converts valid input', () => {
      const input = { raw: 12.1, fmt: "12.1" };
      const raw = transformField(input, 'rawNumberObj');
      expect(raw).toBe(input.raw);
    });

  });


  describe('try multi', () => {

    it('works', () => {
      let date;
      const format = 'epoch|ISODate';

      date = transformField(1604620800, format);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(new Date(1604620800*1000).getTime());

      date = transformField("2021-02-05T00:00:00.000Z", format);
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2021);
    });

  });

});
