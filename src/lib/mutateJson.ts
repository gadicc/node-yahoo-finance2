export default function mutateJson(
  obj: { [key: string]: any },
  mapping: { [key: string]: any },
  transformFunc: Function
) {
  for (let key of Object.keys(obj)) {

    if (typeof mapping[key] === 'undefined') {

      // no-op

    } else if (typeof mapping[key] === 'string') {

      obj[key] = transformFunc(obj[key], mapping[key]);

    } else if (Array.isArray(mapping[key])) {

      if (typeof mapping[key][0] === 'string') {

        // earningsDate: [ 'epoch' ]
        obj[key] = obj[key].map((n:number) => transformFunc(n, mapping[key][0]))

      } else if (typeof mapping[key][0] === 'object') {

        // cashflowStatements: [ { endDate: 'dateObj'} ]
        obj[key].forEach((o:object) => mutateJson(o, mapping[key][0], transformFunc));

      } else {

        throw new Error("Unknown array type:" + mapping[key][0]);

      }

    } else if (typeof mapping[key] === 'object') {

      mutateJson(obj[key], mapping[key], transformFunc);

    } else {

      throw new Error("Unknown mapping:" + mapping[key]);

    }
  }
}
