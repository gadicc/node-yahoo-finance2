const isDate = (schema) =>
  schema.type === "string" && schema.format === "date-time";

const funcs = [
  /*

  // Now handled in TypeFormatter/yfReferenceTypeFormatter.ts
  function TwoNumberRange(schema, parent, state) {
    if (schema.$ref === "#/definitions/TwoNumberRange") {
      const key = state.property.split("/").pop();
      parent.properties[key] = { yahooFinanceType: "TwoNumberRange" };
      return true;
    }
  },

  // Now handled in TypeFormatter/yfReferenceTypeFormatter.ts
  function DateInMs(schema, parent, state) {
    if (schema.$ref === "#/definitions/DateInMs") {
      const key = state.property.split("/").pop();
      parent.properties[key] = { yahooFinanceType: "DateInMs" };
      return true;
    }
  },

  // Now handled in TypeFormatter/yfNumberTypeFormatter.ts
  function Number(schema, parent, state) {
    if (schema.type === "number") {
      delete schema.type;
      schema.yahooFinanceType = "number";
      return true;
    }
  },

  */

  function NumberNull(schema, parent, state) {
    if (Array.isArray(schema.type)) {
      if (
        schema.type.length === 2 &&
        schema.type.includes("number") &&
        schema.type.includes("null")
      ) {
        delete schema.type;
        schema.yahooFinanceType = "number|null";
        return true;
      }
    }
  },

  function Date(schema, parent, state) {
    const anyOf = schema.anyOf;
    if (
      anyOf &&
      anyOf.length === 2 &&
      ((isDate(anyOf[0]) && anyOf[1].type === "null") ||
        (isDate(anyOf[1]) && anyOf[0].type === "null"))
    ) {
      delete schema.anyOf;
      schema.yahooFinanceType = "date|null";
      return true;
    }

    if (isDate(schema)) {
      delete schema.format;
      delete schema.type;
      schema.yahooFinanceType = "date";
      return true;
    }
  },
];

export default function callback(schema, parent, state) {
  for (let func of funcs) if (func(schema, parent, state)) break;
}
