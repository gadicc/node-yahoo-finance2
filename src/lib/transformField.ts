const formats: {[key:string]:Function} = {

  epoch(input: number) {
    if (typeof input !== 'number')
      throw new Error("transformField(input, format), format=epoch but typeof input !== 'number'");
    // TODO, check range? 1604620800
    return new Date(input * 1000);
  },

  dateObj(input: { raw: number; fmt?: string }) {
    if (typeof input !== 'object')
      throw new Error("transformField(input, format), format=dateObj but typeof input !== 'object'");
    if (typeof input.raw !== 'number')
      throw new Error("transformField(input, format), format=dateObj but typeof input.raw !== 'number'");
    return new Date(input.raw * 1000);
  },

  dateStr(input: string) {
    // 2020-01-01
    if (typeof input !== 'string')
      throw new Error("transformField(input, format), format=dateStr but typeof input !== 'string'");
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}/))
      throw new Error("transformField(input, format), format=dateStr but typeof input doesn't match 'YYYY-MM-DD'");
    return new Date(input);
  },

  ISODate(input: string) {
    // 2021-02-05T00:00:00.000Z
    if (typeof input !== 'string')
      throw new Error("transformField(input, format), format=ISODate but typeof input !== 'string', got: " + JSON.stringify(input));
    if (!input.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}\.\d{3,3}Z/))
      throw new Error("transformField(input, format), format=ISODate but got input " + input);
    return new Date(input);
  },

  rawNumberObj(input: { raw: number; fmt?: string }) {
    if (typeof input !== 'object')
      throw new Error("transformField(input, format), format=rawNumberObj but typeof input !== 'object'");
    if (typeof input.raw !== 'number') {
      if (Object.keys(input).length === 0)
        return null;
      throw new Error("transformField(input, format), format=rawNumberObj but typeof input.raw !== 'number'");
    }
    return input.raw;
  },

}

export default function transformField(input:any, format:"rawNumberObj"): number;
export default function transformField(input:any, format:"epoch"|"dateObj"|"dateStr"|"ISODate"): Date;
export default function transformField(input:any, format:"epoch|ISODate"): Date;
export default function transformField(input:any, format:string): Date;
export default function transformField(input:any, format:string): Date|number {
  if (formats[format])
    return formats[format](input);

  if (format.match(/\|/)) {
    const formats = format.split('|');
    let value;
    let failed = new Array(formats.length);
    for (let format of formats) {
      try {
        value = transformField(input, format)
        break;
      } catch (error) {
        failed.push({ format, error })
      }
    }
    if (!value) {
      const data = { input, format, failed };
      throw new Error("transformField(input, format) failed: " + JSON.stringify(data, null, 2));
    }
    return value;
  }

  throw new Error("transformField(input, format) but unknown format: " + format);
}
