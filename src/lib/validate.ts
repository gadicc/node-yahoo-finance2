import Ajv, {JSONSchemaType, DefinedError, ValidateFunction} from "ajv";

//import schema from '../../schema.json';
const schema = require('../../schema.json');
const pkg = require('../../package.json');

const ajv = new Ajv();
ajv.addSchema(schema);

function validate(object: object, key: string): void {
  const validator = ajv.getSchema(key);
  if (!validator)
    throw new Error("No such schema with key: " + key);

  const valid = validator(object);
  if (valid) return;

  const title = encodeURIComponent("Failed validation: " + key);
  console.error("The following result did not validate with schema: " + key);
  console.error(object);
  console.error(validator.errors);
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
  throw new Error("Failed Yahoo Schema validation");
}

export default validate;
