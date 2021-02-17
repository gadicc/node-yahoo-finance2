import Ajv from "ajv";
import type { SchemaValidateFunction } from "ajv/dist/types";
import addFormats from "ajv-formats";

//import schema from '../../schema.json';
const schema = require("../../schema.json");
const pkg = require("../../package.json");
import { InvalidOptionsError, FailedYahooValidationError } from "./errors";

// https://ajv.js.org/docs/api.html#options
export const ajv = new Ajv({
  // All rules, all errors.  Don't end early after first error.
  allErrors: true,
  // Allow multiple non-null types, like in TypeSript.
  allowUnionTypes: true,
});
addFormats(ajv);

ajv.addKeyword({
  keyword: "yahooFinanceType",
  modifying: true,
  errors: true,
  schema: true,
  compile(schema /*, parentSchema, it */) {
    const validate: SchemaValidateFunction = (data, dataCtx) => {
      const { parentData, parentDataProperty } = dataCtx;

      function set(value: any) {
        parentData[parentDataProperty] = value;
        return true;
      }

      if (schema === "number" || schema === "number|null") {
        if (typeof data === "number") return true;

        if (typeof data === "string") {
          let float = Number.parseFloat(data);
          if (Number.isNaN(float)) {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message: "Number.parseFloat returned NaN",
              params: { schema, data },
            });
            return false;
          }
          return set(float);
        }

        if (data === null) {
          if (schema === "number|null") {
            return true;
          } else {
            validate.errors = validate.errors || [];
            validate.errors.push({
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
              return set(null);
            } else {
              validate.errors = validate.errors || [];
              validate.errors.push({
                keyword: "yahooFinanceType",
                message:
                  "Got {}->null for 'number', did you want 'number | null' ?",
                params: { schema, data },
              });
              return false;
            }
          }
          if (typeof data.raw === "number") return set(data.raw);
        }
      } else if (schema === "date") {
        if (data instanceof Date) {
          // Validate existing date objects.
          // Generally we receive JSON but in the case of "historical", the
          // csv parser does the date conversion, and we want to validate
          // afterwards.
          return true;
        }

        if (typeof data === "number") return set(new Date(data * 1000));

        if (data === null) return set(null);

        if (typeof data === "object" && typeof data.raw === "number")
          return set(new Date(data.raw * 1000));

        if (typeof data === "string") {
          if (
            data.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/) ||
            data.match(
              /^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}\.\d{3,3}Z$/
            )
          )
            return set(new Date(data));
        }
      } else if (schema === "DateInMs") {
        return set(new Date(data));
      } else if (schema === "TwoNumberRange") {
        if (
          typeof data === "object" &&
          typeof data.low === "number" &&
          typeof data.high === "number"
        )
          return true;
        if (typeof data === "string") {
          const parts = data.split("-").map(parseFloat);
          if (Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message:
                "Number.parseFloat returned NaN: [" + parts.join(",") + "]",
              params: { schema, data },
            });
            return false;
          }
          return set({ low: parts[0], high: parts[1] });
        }
      } else {
        throw new Error("No such yahooFinanceType: " + schema);
      }

      validate.errors = validate.errors || [];
      validate.errors.push({
        keyword: "yahooFinanceType",
        message: "No matching type",
        params: { schema, data },
      });
      return false;
    };

    return validate;
  },
});

ajv.addSchema(schema);

/* istanbul ignore next */
const logObj = process?.stdout?.isTTY
  ? (obj: any) => console.dir(obj, { depth: 4, colors: true })
  : (obj: any) => console.log(JSON.stringify(obj, null, 2));

export function resolvePath(obj: any, dataPath: string) {
  const path = dataPath.split("/");
  let ref = obj;
  for (let i = 1; i < path.length; i++) ref = ref[path[i]];
  return ref;
}

interface ValidationOptions {
  logErrors: boolean;
  logOptionsErrors: boolean;
}

export interface ValidateParams {
  source: string;
  type: "options" | "result";
  object: object;
  schemaKey: string;
  options: ValidationOptions;
}

function validate({
  source,
  type,
  object,
  schemaKey,
  options,
}: ValidateParams): void {
  const validator = ajv.getSchema(schemaKey);
  if (!validator) throw new Error("No such schema with key: " + schemaKey);

  const valid = validator(object);
  if (valid) return;

  if (type === "result") {
    if (validator.errors)
      validator.errors.forEach((error) => {
        if (error.dataPath !== "")
          // Note, not the regular ajv data value from verbose:true
          error.data = resolvePath(object, error.dataPath);
      });

    if (options.logErrors) {
      const title = encodeURIComponent("Failed validation: " + schemaKey);
      console.log(
        "The following result did not validate with schema: " + schemaKey
      );
      logObj(validator.errors);
      // logObj(object);
      console.log(`
This may happen intermittently and you should catch errors appropriately.
However:  1) if this recently started happening on every request for a symbol
that used to work, Yahoo may have changed their API.  2) If this happens on
every request for a symbol you've never used before, but not for other
symbols, you've found an edge-case.  Please see if anyone has reported
this previously:

  ${pkg.repository}/issues?q=is%3Aissue+${title}

or open a new issue (and mention the symbol):

  ${pkg.repository}/issues/new?title=${title}

For information on how to turn off the above logging or skip these errors,
see https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs/validation.md.
`);
    } /* if (logErrors) */

    throw new FailedYahooValidationError("Failed Yahoo Schema validation", {
      result: object,
      errors: validator.errors,
    });
  } /* if (type === 'options') */ else {
    if (options.logOptionsErrors) {
      console.error(
        `[yahooFinance.${source}] Invalid options ("${schemaKey}")`
      );
      logObj({ errors: validator.errors, input: object });
    }
    throw new InvalidOptionsError(
      `yahooFinance.${source} called with invalid options.`
    );
  }
}

export default validate;
