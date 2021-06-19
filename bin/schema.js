import fs from "fs/promises";
import tsj from "ts-json-schema-generator";

//const OUTPUT_PATH = "schema.json";
const OUTPUT_PATH = process.stdout;

const config = {
  path: "src/{modules/**/*.ts,lib/options.ts}",
  tsconfig: "tsconfig.json",
  type: "*",
};

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);

if (OUTPUT_PATH === process.stdout) {
  await process.stdout.write(schemaString);
} else {
  await fs.writeFile(OUTPUT_PATH, schemaString);
}
