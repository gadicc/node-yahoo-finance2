// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.
import schema from "../../schema.json" assert { type: "json" };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.
import pkg from "../../package.json" with { type: "json" };
import { InvalidOptionsError, FailedYahooValidationError } from "./errors.js";

import validateAndCoerce from "./validate";

/* istanbul ignore next */
const logObj =
  typeof process !== "undefined" && process?.stdout?.isTTY
    ? (obj: any) => console.dir(obj, { depth: 4, colors: true })
    : (obj: any) => console.log(JSON.stringify(obj, null, 2));

export function resolvePath(obj: any, instancePath: string) {
  const path = instancePath.split("/");
  let ref = obj;
  for (let i = 1; i < path.length; i++) ref = ref[path[i]];
  return ref;
}

export interface ValidationOptions {
  logErrors?: boolean;
  logOptionsErrors?: boolean;
}

export interface ValidateParams {
  source: string;
  type: "options" | "result";
  object: object;
  schemaKey: string;
  options: ValidationOptions;
}

function disallowAdditionalProps(show = false) {
  const disallowed = new Set();
  // @ts-ignore: this can cause a breaking catch-22 on schema generation
  for (let key of Object.keys(schema.definitions)) {
    if (key.match(/Options$/)) {
      continue;
    }
    // @ts-ignore
    const def = schema.definitions[key];
    if (def.type === "object" && def.additionalProperties === undefined) {
      def.additionalProperties = false;
      disallowed.add(key);
    }
  }
  /* istanbul ignore next */
  if (show)
    console.log(
      "Disallowed additional props in " + Array.from(disallowed).join(", "),
    );
}

if (process.env.NODE_ENV === "test") disallowAdditionalProps();

function validate({
  source,
  type,
  object,
  schemaKey,
  options,
}: ValidateParams): void {
  const errors = validateAndCoerce(object, schemaKey);
  if (errors === false || !errors.length) return;

  if (type === "result") {
    /* istanbul ignore else */
    /*
    if (errors) {
      let origData: any = false;

      errors.forEach((error) => {
        // For now let's ignore the base object which could be huge.
        /* istanbul ignore else */ /*
        if (error.instancePath !== "")
          // Note, not the regular ajv data value from verbose:true
          error.data = resolvePath(object, error.instancePath);

        if (error.schemaPath === "#/anyOf") {
          if (origData === false) {
            origData = error.data;
          } else if (origData === error.data) {
            error.data = "[shortened by validateAndCoerceTypes]";
          }
        }
      });

      // Becaue of the "anyOf" in quote, errors are huuuuge and mostly
      // irrelevant... so let's filter out (some of) the latter
      errors = errors.filter((error) => {
        if (error.schemaPath.startsWith("#/definitions/Quote")) {
          const schemaQuoteType = error.schemaPath
            .substring(19)
            .split("/")[0]
            .toUpperCase();

          /*
           * Filter out entries for non-matching schema type, i.e.
           * {
           *   schemaPath: '#/definitions/QuoteCryptoCurrency/properties...'
           *   data: {
           *     quoteType: "EQUITY"
           *   }
           * }
           */ /*
          if (
            typeof error.data === "object" &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Properrty "quoteType" does not exist on type "object"
            error.data?.quoteType !== schemaQuoteType
          )
            return false;

          /*
           * Filter out the non-matching "const" for the above.
           * {
           *   schemaPath: '#/definitions/QuoteCryptoCurrency/properties/quoteType/const'
           *   keyword: "const",
           *   params: { allowedValue: "CRYPTOCURRENCY"}},
           *   data: "EQUITY"
           * }
           */ /*
          if (
            typeof error.data === "string" &&
            error.params?.allowedValue === schemaQuoteType
          )
            return false;
        }
        return true;
      });

      // In the case of there being NO match in #anyOf, bring back the data
      if (errors.length === 1 && errors[0].schemaPath === "#/anyOf")
        errors[0].data = origData;
    }
    */

    if (options.logErrors === true) {
      const title = encodeURIComponent("Failed validation: " + schemaKey);
      console.log(
        "The following result did not validate with schema: " + schemaKey,
      );
      logObj(errors);
      // logObj(object);
      console.log(`
This may happen intermittently and you should catch errors appropriately.
However:  1) if this recently started happening on every request for a symbol
that used to work, Yahoo may have changed their API.  2) If this happens on
every request for a symbol you've never used before, but not for other
symbols, you've found an edge-case (OR, we may just be protecting you from
"bad" data sometimes stored for e.g. misspelt symbols on Yahoo's side).
Please see if anyone has reported this previously:

  ${pkg.repository}/issues?q=is%3Aissue+${title}

or open a new issue (and mention the symbol):  ${pkg.name} v${pkg.version}

  ${pkg.repository}/issues/new?labels=bug%2C+validation&template=validation.md&title=${title}

For information on how to turn off the above logging or skip these errors,
see https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs/validation.md.

At the end of the doc, there's also a section on how to
[Help Fix Validation Errors](https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/validation.md#help-fix)
in case you'd like to contribute to the project.  Most of the time, these
fixes are very quick and easy; it's just hard for our small core team to keep up,
so help is always appreciated!
`);
    } /* if (logErrors) */

    throw new FailedYahooValidationError("Failed Yahoo Schema validation", {
      result: object,
      // @ts-expect-error: TODO
      errors: errors,
    });
  } /* if (type === 'options') */ else {
    if (options.logOptionsErrors === true) {
      console.error(
        `[yahooFinance.${source}] Invalid options ("${schemaKey}")`,
      );
      logObj({ errors, input: object });
    }
    throw new InvalidOptionsError(
      `yahooFinance.${source} called with invalid options.`,
    );
  }
}

export { disallowAdditionalProps };
export default validate;
