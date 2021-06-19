import { writeFile } from "fs";

import {
  createProgram,
  createParser,
  SchemaGenerator,
  createFormatter,
} from "ts-json-schema-generator";
import { yfNumberFormatter } from "./schema-custom.js";

//const OUTPUT_PATH = "schema.json";
const OUTPUT_PATH = process.stdout;

const config = {
  path: "src/{modules/**/*.ts,lib/options.ts}",
  tsconfig: "tsconfig.json",
  type: "*",
};

const formatter = createFormatter(config, (fmt) => {
  fmt.addTypeFormatter(new yfNumberFormatter());
});

const program = createProgram(config);
const parser = createParser(program, config);
const generator = new SchemaGenerator(program, parser, formatter, config);
const schema = generator.createSchema(config.type);

const schemaString = JSON.stringify(schema, null, 2);

function throwErr(err?: Error | null): void {
  if (err) throw err;
}

if (OUTPUT_PATH === process.stdout) {
  process.stdout.write(schemaString, throwErr);
} else {
  writeFile(OUTPUT_PATH as string, schemaString, throwErr);
}
