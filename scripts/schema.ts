// import { writeFile } from "fs";
const writeFile = Deno.writeFile;

import {
  type Config,
  createFormatter,
  createParser,
  createProgram,
  SchemaGenerator,
} from "ts-json-schema-generator";

// @ts-expect-error: no types
import schemaWalker from "oas-schema-walker";
import walkerCallback from "./schema/postWalker.js";

import yfNumberTypeFormatter from "./schema/TypeFormatter/yfNumberTypeFormatter.ts";
import yfReferenceTypeFormatter from "./schema/TypeFormatter/yfReferenceTypeFormatter.ts";
import yfFunctionIgnorer from "./schema/TypeFormatter/yfFunctionIgnorer.ts";

// const OUTPUT_PATH = "schema.json";
// const OUTPUT_PATH = process.stdout;
const OUTPUT_PATH = Deno.stdout;

const config: Config = {
  // path: "src/{modules/**/!(*spec.ts),lib/options.ts}",
  // XXX TODO
  path:
    "src/modules/{quote,chart,dailyGainers,dailyLosers,fundamentalsTimeSeries,historical,insights}.ts",
  tsconfig: "scripts/schema-tsconfig.json",
  type: "*",
};

const formatter = createFormatter(
  config,
  (chainTypeFormatter, circularReferenceTypeFormatter) => {
    chainTypeFormatter
      .addTypeFormatter(
        new yfReferenceTypeFormatter(
          circularReferenceTypeFormatter,
          config.encodeRefs ?? true,
        ),
      )
      .addTypeFormatter(new yfNumberTypeFormatter())
      .addTypeFormatter(new yfFunctionIgnorer());
  },
);

const program = createProgram(config);
const parser = createParser(program, config);
const generator = new SchemaGenerator(program, parser, formatter, config);
const _schema = generator.createSchema(config.type);

const schema = {
  $schema: _schema.$schema,
  $comment: "DO NOT EDIT THIS FILE.  It is generated automatically " +
    "from typescript interfaces in the project.  To update, run " +
    "`deno task schema`.",
  ..._schema,
};

// @ts-expect-error: no types
for (const key of Object.keys(schema.definitions)) {
  // @ts-expect-error: no types
  schemaWalker.walkSchema(schema.definitions[key], {}, {}, walkerCallback);
}

const schemaString = JSON.stringify(schema, null, 2);

const encoder = new TextEncoder();
const encoded = encoder.encode(schemaString);

if (OUTPUT_PATH === Deno.stdout) {
  await Deno.stdout.write(encoded);
} else if (typeof OUTPUT_PATH === "string") {
  await writeFile(OUTPUT_PATH, encoded);
} else {
  throw new Error("Unsupported output path");
}
