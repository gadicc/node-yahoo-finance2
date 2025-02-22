import fullSchema from "../../../schema.json" with { type: "json" };
// @ts-ignore: relevant for ts-json-schema-generator
import type { JSONSchema7 } from "json-schema";

type JSONSchema = JSONSchema7 & { yahooFinanceType?: string };
// deno-lint-ignore no-explicit-any
const definitions = (fullSchema as any).definitions as Record<
  string,
  JSONSchema
>;

export type ValidationError = {
  keyword?: string;
  instancePath?: string;
  schemaPath?: string;
  data?: unknown;
  schema?: unknown;
  message: string;
  params?: { [key: string]: unknown };
  subErrors?: ValidationError[];
};

const byType = {
  string(
    input: unknown,
    _schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (typeof input !== "string") {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected a string",
        data: input,
      });
      return false;
    }
  },

  number(
    input: unknown,
    _schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (typeof input !== "number") {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected a number",
        data: input,
      });
      return false;
    }
  },

  boolean(
    input: unknown,
    _schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (typeof input !== "boolean") {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected a boolean",
        data: input,
      });
      return false;
    }
  },

  null(
    input: unknown,
    _schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (input !== null) {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected null",
        data: input,
      });
      return false;
    }
  },

  undefined(
    input: unknown,
    schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (input !== undefined) {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected undefined",
        data: input,
        schema,
      });
      return false;
    }
  },

  object(
    _input: unknown,
    schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (typeof _input !== "object") {
      errors.push({
        instancePath,
        schemaPath,
        message: "Expected an object",
        data: _input,
      });
      return false;
    }

    const input = _input as Record<string, unknown>;
    const dataCtx = { parentData: input, parentDataProperty: "" };

    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in input)) {
          errors.push({
            instancePath,
            schemaPath: schemaPath + "/required",
            message: "Missing required property",
            data: key,
          });
        }
      }
    }

    for (const [key, value] of Object.entries(input)) {
      const propSchema = schema.properties?.[key];
      dataCtx.parentDataProperty = key;

      if (propSchema) {
        validateAndCoerce(
          value,
          propSchema as JSONSchema,
          errors,
          instancePath + "/" + key,
          dataCtx,
          schemaPath,
        );
      } else {
        if (schema.additionalProperties === false) {
          errors.push({
            instancePath,
            schemaPath: schemaPath + "/additionalProperties",
            message: "should NOT have additional properties",
            params: {
              additionalProperty: key,
            },
            data: input,
          });
        } else if (schema.additionalProperties) {
          validateAndCoerce(
            value,
            schema.additionalProperties as JSONSchema,
            errors,
            instancePath + "/" + key,
            dataCtx,
            schemaPath + "/additionalProperties",
          );
        }
      }
    }
  },

  array(
    input: unknown,
    schema: JSONSchema,
    errors: ValidationError[],
    instancePath: string,
    _dataCtx: DataCtx | undefined,
    schemaPath: string,
  ) {
    if (!Array.isArray(input)) {
      errors.push({ instancePath, message: "Expected an array", data: input });
      return false;
    }

    if (schema.items) {
      const dataCtx = { parentData: input, parentDataProperty: 0 };
      for (const [idx, value] of input.entries()) {
        dataCtx.parentDataProperty = idx;
        validateAndCoerce(
          value,
          schema.items as JSONSchema,
          errors,
          instancePath + "/" + idx,
          dataCtx,
          schemaPath + "/items",
        );
      }
    }
  },
};

function set(
  dataCtx: DataCtx | undefined,
  value: unknown,
  instancePath: string,
) {
  if (dataCtx && dataCtx.parentData && dataCtx.parentDataProperty !== "") {
    // @ts-ignore: later
    dataCtx.parentData[dataCtx.parentDataProperty] = value;
  } else {
    throw new Error(
      'In "' +
        instancePath +
        '", cannot set value ' +
        JSON.stringify(value) +
        " to context " +
        JSON.stringify(dataCtx),
    );
  }
}

function yahooFinanceType(
  data: unknown,
  schema: string,
  errors: ValidationError[],
  instancePath: string,
  dataCtx?: DataCtx,
  schemaPath: string = "",
) {
  if (schema === "number" || schema === "number|null") {
    if (typeof data === "number") return true;

    if (typeof data === "string") {
      const float = Number.parseFloat(data);
      if (Number.isNaN(float)) {
        errors.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Number.parseFloat returned NaN",
          params: { schema, data },
          data,
        });
        return false;
      }
      return set(dataCtx, float, instancePath);
    }

    if (data === null) {
      if (schema === "number|null") {
        return true;
      } else {
        errors.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Expecting number'ish but got null",
          params: { schema, data },
        });
        return false;
      }
    }

    if (typeof data === "object") {
      if (Object.keys(data).length === 0) {
        // Value of {} becomes null
        // Note, TypeScript types should be "number | null"
        if (schema === "number|null") {
          return set(dataCtx, null, instancePath);
        } else {
          errors.push({
            instancePath,
            schemaPath,
            keyword: "yahooFinanceType",
            message:
              "Got {}->null for 'number', did you want 'number | null' ?",
            params: { schema, data },
          });
          return false;
        }
      }
      if ("raw" in data && typeof data.raw === "number") {
        return set(dataCtx, data.raw, instancePath);
      }
    }

    errors.push({
      instancePath,
      schemaPath,
      keyword: "yahooFinanceType",
      message: "Expecting number'ish",
      params: { schema, data },
    });
    return false;
  } else if (schema === "date" || schema === "date|null") {
    if (data instanceof Date) {
      // Validate existing date objects.
      // Generally we receive JSON but in the case of "historical", the
      // csv parser does the date conversion, and we want to validate
      // afterwards.
      return true;
    }

    if (typeof data === "number") {
      return set(dataCtx, new Date(data * 1000), instancePath);
    }

    if (data === null) {
      if (schema === "date|null") {
        return true;
      } else {
        errors.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Expecting date'ish but got null",
          params: { schema, data },
        });
        return false;
      }
    }

    if (typeof data === "object") {
      if (Object.keys(data).length === 0) {
        // Value of {} becomes null
        // Note, TypeScript types should be "data | null"
        if (schema === "date|null") {
          return set(dataCtx, null, instancePath);
        } else {
          errors.push({
            instancePath,
            schemaPath,
            keyword: "yahooFinanceType",
            message: "Got {}->null for 'date', did you want 'date | null' ?",
            params: { schema, data },
          });
          return false;
        }
      }
      if ("raw" in data && typeof data.raw === "number") {
        return set(dataCtx, new Date(data.raw * 1000), instancePath);
      }
    }

    if (typeof data === "string") {
      if (
        data.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/) ||
        data.match(
          /^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}(\.\d{3,3})?Z$/,
        )
      ) {
        return set(dataCtx, new Date(data), instancePath);
      }
    }

    errors.push({
      instancePath,
      schemaPath,
      keyword: "yahooFinanceType",
      message: "Expecting date'ish",
      params: { schema, data },
    });
    return false;
  } else if (schema === "DateInMs") {
    if (typeof data === "number") {
      return set(dataCtx, new Date(data), instancePath);
    } else {
      errors.push({
        // keyword: "yahooFinanceType",
        instancePath,
        schemaPath,
        message: "yahooFinanceDate/dateInMs: Expected a number",
        // params: { schema, data },
        schema,
        data,
      });
      return false;
    }
  } else if (schema === "TwoNumberRange") {
    if (
      typeof data === "object" &&
      data !== null &&
      "low" in data &&
      typeof data.low === "number" &&
      "high" in data &&
      typeof data.high === "number"
    ) {
      return true;
    }
    if (typeof data === "string") {
      const parts = data.split("-").map(parseFloat);
      if (Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
        errors.push({
          // keyword: "yahooFinanceType",
          instancePath,
          schemaPath,

          message: "yahooFinanceType: Number.parseFloat returned NaN: [" +
            parts.join(",") +
            "]",
          // params: { schema, data },
          schema,
          data,
        });
        return false;
      }
      return set(dataCtx, { low: parts[0], high: parts[1] }, instancePath);
    }
    errors.push({
      // keyword: "yahooFinanceType",
      instancePath,
      schemaPath,
      message: "TwoNumberRange: Unexpected format",
      // params: { schema, data },
      schema,
      data,
    });
    return false;
  } else {
    errors.push({
      instancePath,
      schemaPath,
      // keyword: "yahooFinanceType",
      message: "yahooFinanceType: no matching type",
      // params: { schema, data },
      data,
      schema,
    });
    return false;
  }

  // return true;
}

function schemaFromSchemaOrSchemaKey(
  schemaOrSchemaKey: JSONSchema | string,
): [JSONSchema, string] {
  let schema: JSONSchema;
  let path: string = "";

  if (typeof schemaOrSchemaKey === "string") {
    const definition = schemaOrSchemaKey.match(/^#\/definitions\/(.*)$/)?.[1];
    if (!definition) {
      throw new Error("No such schema with key: " + schemaOrSchemaKey);
    }
    schema = definitions[definition] as JSONSchema;
    path = schemaOrSchemaKey;
    if (!schema) {
      throw new Error(`No such schema with key: ${definition}`);
    }
  } else {
    schema = schemaOrSchemaKey;
    if (schema.$id) path = schema.$id;
  }

  while (schema.$ref) {
    schema = definitions[
      schema.$ref.replace("#/definitions/", "")
    ] as JSONSchema;
    path = schema.$ref!;
  }

  return [schema as JSONSchema, path];
}

interface DataCtx {
  parentData: unknown;
  parentDataProperty: number | string;
}

export default function validateAndCoerce(
  input: unknown,
  schemaOrSchemaKey: JSONSchema | string,
  errors: ValidationError[] = [],
  instancePath: string = "",
  dataCtx?: DataCtx,
  schemaPath: string | null = null,
) {
  const [schema, foundSchemaPath] = schemaFromSchemaOrSchemaKey(
    schemaOrSchemaKey,
  );
  if (foundSchemaPath) schemaPath = foundSchemaPath;

  if (schema.anyOf) {
    const allErrors: ValidationError[] = [];
    let _errors: ValidationError[] = [];
    /// Since yahooFinanceType can mutute, we need to save unmodified state.
    const serializedInput = JSON.stringify(input);
    let i = 0;
    for (const subSchema of schema.anyOf as JSONSchema[]) {
      const subSchemaPath = subSchema.$ref ||
        schemaPath + "/anyOf/" + (i++).toString();

      _errors = [];
      validateAndCoerce(
        input,
        subSchema,
        _errors,
        instancePath,
        dataCtx,
        subSchemaPath,
      );
      if (!_errors.length) break;

      // allErrors.push(subSchema);
      allErrors.push(..._errors);
      if (dataCtx?.parentData) {
        input = serializedInput === undefined
          ? undefined
          : JSON.parse(serializedInput);
        // @ts-ignore: it's ok
        dataCtx.parentData[dataCtx.parentDataProperty] = input;
      }
    }
    if (_errors.length) {
      errors.push({
        instancePath,
        schemaPath: schemaPath!, // ! because of "if null" check above
        message: "should match some schema in anyOf",
        data: input,
        // schema,
        subErrors: allErrors,
      });
      return false;
    }
  } else if (schema.yahooFinanceType) {
    yahooFinanceType(
      input,
      schema.yahooFinanceType,
      errors,
      instancePath,
      dataCtx,
      schemaPath!, // ! because of "if null" check above
    );
  } else {
    if (schema.type === undefined) {
      // This is actually a no-op.  With schema of {}, accept anything and everything.
      // console.log(`No type in ${instancePath}`);
      // throw new Error(`No type in ${instancePath}`);
      /*
      // TODO, need accesss to parent schema for this
      if (parentSchema.patternProperties)
        throw new Error(
          `patternProperties needed but not supported yet, ${instancePath}`,
        );
      */
    } else if (Array.isArray(schema.type)) {
      let _errors: ValidationError[] = [];
      for (const type of schema.type) {
        _errors = [];
        // @ts-ignore: another day
        const validator = byType[type];
        if (!validator) {
          throw new Error(
            `No validator for type ${JSON.stringify(type)} in ${instancePath}`,
          );
        }
        validator(input, schema, _errors, instancePath, dataCtx, schemaPath);
        if (!_errors.length) break;
      }
      if (_errors.length) {
        errors.push({
          instancePath,
          message: `Expected one of ${schema.type.join(", ")}`,
          data: input,
        });
        return false;
      }
    } else {
      // @ts-ignore: another day
      const validator = byType[schema.type];
      if (!validator) {
        throw new Error(
          `No validator for type ${
            JSON.stringify(schema.type)
          } in ${instancePath}`,
        );
      }
      validator(input, schema, errors, instancePath, dataCtx, schemaPath);
    }
  }

  return errors;
}
