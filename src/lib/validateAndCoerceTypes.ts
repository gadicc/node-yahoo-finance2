import Ajv, {JSONSchemaType, DefinedError, ValidateFunction} from "ajv";
import addFormats from 'ajv-formats';

//import schema from '../../schema.json';
const schema = require('../../schema.json');
const pkg = require('../../package.json');
import { InvalidOptionsError, FailedYahooValidationError } from './errors';

const ajv = new Ajv({ allowUnionTypes: true });
addFormats(ajv);

/* @ts-ignore */
ajv.addKeyword('yahooFinanceType', {
  modifying: true,
  errors: true,
  /* @ts-ignore */
  compile(schema, parentSchema) {
    /* @ts-ignore */
    return function validate(data, { parentData, parentDataProperty }) {
      function set(value: any) {
        parentData[parentDataProperty] = value;
        return true;
      }

    /* @ts-ignore */
      if (!validate.errors)
        /* @ts-ignore */
        validate.errors = [];

      if (schema === 'number') {
        if (typeof data === 'number')
          return true;

        if (typeof data === 'object') {
          if (Object.keys(data).length === 0)
            return set(null);
          if (typeof data.raw === 'number')
            return set(data.raw);
        }
      }

      if (schema === 'date') {
        if (typeof data === 'number')
          return set(new Date(data * 1000));
        if (data === null)
          return null;
        if (typeof data === 'object')
          return set(new Date(data.raw * 1000));
        if (typeof data === 'string') {
          if (data.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/) ||
              data.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}\.\d{3,3}Z$/))
            return set(new Date(data));
        }
      }

      /* @ts-ignore */
      validate.errors.push({
        keyword: "yahooFinanceType",
        message: "No matching type",
        params: { schema, data }
      });
      return false;
    };
  }
});

ajv.addSchema(schema);

const logObj = process.stdout.isTTY
  ? (obj:any) => console.dir(obj, { depth: 4, colors: true })
  : (obj:any) => console.log(JSON.stringify(obj, null, 2));

function validate(object: object, key: string, module?: string): void {
  const validator = ajv.getSchema(key);
  if (!validator)
    throw new Error("No such schema with key: " + key);

  const valid = validator(object);
  if (valid) return;

  if (!module) {

    const title = encodeURIComponent("Failed validation: " + key);
    console.error("The following result did not validate with schema: " + key);
    logObj(validator.errors);
    logObj(object);
    console.error("You should handle occassional errors in your code, however if ");
    console.error("this happens every time, probably Yahoo have changed their API ");
    console.error("and node-yahoo-finance2 needs to be updated.  Please see if ");
    console.error("anyone has reported this previously:");
    console.error();
    console.error(`  ${pkg.repository}/issues?q=is%3Aissue+${title}`);
    console.error();
    console.error("or open a new issue:");
    console.error();
    console.error(`  ${pkg.repository}/issues/new?title=${title}`);
    throw new FailedYahooValidationError("Failed Yahoo Schema validation");

  } else /* if (type === 'options') */ {

    console.error(`[yahooFinance.${module}] Invalid options ("${key}")`);
    logObj({ errors: validator.errors, input: object });
    throw new InvalidOptionsError(`yahooFinance.${module} called with invalid options.`);

  }
}

export default validate;
