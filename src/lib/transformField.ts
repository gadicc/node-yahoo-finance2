export default function transformDate(input:any, format:string): Date {
  if (format === 'epoch') {
    if (typeof input !== 'number')
      throw new Error("convertDate(input, format), format=epoch but typeof input !== 'number'");
    // TODO, check range? 1604620800
    return new Date(input * 1000);
  }

  if (format === 'dateObj') {
    if (typeof input !== 'object')
      throw new Error("convertDate(input, format), format=dateObj but typeof input !== 'object'");
    if (typeof input.raw !== 'number')
      throw new Error("convertDate(input, format), format=dateObj but typeof input.raw !== 'number'");
    return new Date(input.raw * 1000);
  }

  // 2020-01-01
  if (format === 'dateStr') {
    if (typeof input !== 'string')
      throw new Error("convertDate(input, format), format=dateStr but typeof input !== 'string'");
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}/))
      throw new Error("convertDate(input, format), format=dateStr but typeof input doesn't match 'YYYY-MM-DD'");
    return new Date(input);
  }

  if (format === 'ISODate') {
    // 2021-02-05T00:00:00.000Z
    if (typeof input !== 'string')
      throw new Error("convertDate(input, format), format=ISODate but typeof input !== 'string'");
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}\.\d{3,3}Z/))
      throw new Error("convertDate(input, format), format=ISODate but got input " + input);
    return new Date(input);
  }

  if (format.match(/\|/)) {
    const formats = format.split('|');
    let date;
    let failed = new Array(formats.length);
    for (let format of formats) {
      try {
        date = transformDate(input, format)
        break;
      } catch (error) {
        failed.push({ format, error })
      }
    }
    if (!date) {
      const data = { input, format, failed };
      throw new Error("convertDate(input, format) failed: " + JSON.stringify(data, null, 2));
    }
    return date;
  }

  throw new Error("convertDate(input, format) but unknown format: " + format);
}
