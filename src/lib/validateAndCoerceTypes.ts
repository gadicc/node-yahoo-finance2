// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.
import pkg from "../../package.json" assert { type: "json" };
import { FailedYahooValidationError, InvalidOptionsError } from "./errors.js";
import { StaticDecode, type TSchema } from "@sinclair/typebox";
import {
  TransformDecodeCheckError,
  TransformDecodeError,
  Value,
} from "@sinclair/typebox/value";
import { ValidationOptions } from "./options";

function logRelevantErrorInfo(
  e: TransformDecodeError | TransformDecodeCheckError,
) {
  const { /* schema, */ error /* , value */ } = e;
  console.log(JSON.stringify(error, null, 2));
}

const handleResultError = (
  e: TransformDecodeError | TransformDecodeCheckError,
  options: ValidationOptions,
) => {
  const title = e.schema.title;
  if (options.logErrors) {
    logRelevantErrorInfo(e);
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
  }
  throw new FailedYahooValidationError("Failed Yahoo Schema validation", {
    result: e.value,
    errors: [e],
  });
};

const handleOptionsError = (
  e: TransformDecodeCheckError | TransformDecodeError,
  { logOptionsErrors }: ValidationOptions,
) => {
  if (logOptionsErrors) {
    console.error(
      `[yahooFinance] Invalid options ("${JSON.stringify(e.error, null, 2)}")`,
    );
  }
  throw new InvalidOptionsError("Validation called with invalid options");
};

export const validateAndCoerceTypebox = <T extends TSchema>({
  type,
  data,
  schema,
  options,
}: {
  type?: "result" | "options";
  data: unknown;
  schema: T;
  options: ValidationOptions;
}): StaticDecode<T> => {
  try {
    const validationSchema = options._internalThrowOnAdditionalProperties
      ? { ...schema, additionalProperties: false }
      : schema;
    return Value.Decode(validationSchema, data);
  } catch (e) {
    if (
      e instanceof TransformDecodeError ||
      e instanceof TransformDecodeCheckError
    ) {
      // TODO: The existing implementation of 'validate' assumes that the `type` parameter may not be provided
      // and defaults to validating the options if it is not.
      // We should probably explore validating this further up in the call chain.
      // It'd be nice to do this in the body of a module (e.g. search) so that we can avoid
      // polluting core code with type checks and edge cases
      type === "result"
        ? handleResultError(e, options)
        : handleOptionsError(e, options);
    }
    throw e;
  }
};

export default validateAndCoerceTypebox;
