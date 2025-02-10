// NOT USED.  But may reconsider in the future.

import Ajv, { _, KeywordCxt } from "ajv";
import addFormats from "ajv-formats";
import standalone from "ajv/dist/standalone";
import type { SchemaValidateFunction } from "ajv/dist/types";
import type { Code, Name, SafeExpr } from "ajv/dist/compile/codegen";

// Import schema
import schema from "../schema.json" assert { type: "json" };

// Create Ajv instance with same options as runtime
const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  code: { source: true }, // Enable source code generation
});
addFormats(ajv);

/*
ajv.addKeyword({
  keyword: "yahooFinanceType",
  modifying: true,
  errors: true,
  schema: true,
  code(cxt: KeywordCxt) {
    const { schema: schemaType, data } = cxt;
    const { gen } = cxt;

    function addError(message: string) {
      cxt.fail(_`{
        keyword: "yahooFinanceType",
        message: ${message},
        params: { schema: ${schemaType}, data: ${data} }
      }`);
    }

    function setParentData(value: Code) {
      gen.assign(cxt.parentData, cxt.parentDataProperty, value);
    }

    if (schemaType === "number" || schemaType === "number|null") {
      gen.if(_`typeof ${data} === "number"`, () => cxt.pass());

      gen.elseIf(_`typeof ${data} === "string"`, () => {
        const float = gen.let("float", _`Number.parseFloat(${data})`);
        gen.if(
          _`Number.isNaN(${float})`,
          () => {
            addError(_`"Number.parseFloat returned NaN"`);
          },
          () => {
            setParentData(float);
            cxt.pass();
          },
        );
      });

      gen.elseIf(_`${data} === null`, () => {
        if (schemaType === "number|null") {
          cxt.pass();
        } else {
          addError(_`"Expecting number'ish but got null"`);
        }
      });

      gen.elseIf(_`typeof ${data} === "object"`, () => {
        gen.if(_`Object.keys(${data}).length === 0`, () => {
          if (schemaType === "number|null") {
            setParentData(_`null`);
            cxt.pass();
          } else {
            addError(
              _`"Got {}->null for 'number', did you want 'number | null' ?"`,
            );
          }
        });
        gen.elseIf(_`typeof ${data}.raw === "number"`, () => {
          setParentData(_`${data}.raw`);
          cxt.pass();
        });
      });
    } else if (schemaType === "date" || schemaType === "date|null") {
      gen.if(_`${data} instanceof Date`, () => cxt.pass());

      gen.elseIf(_`typeof ${data} === "number"`, () => {
        setParentData(_`new Date(${data} * 1000)`);
        cxt.pass();
      });

      gen.elseIf(_`${data} === null`, () => {
        if (schemaType === "date|null") {
          cxt.pass();
        } else {
          addError(_`"Expecting date'ish but got null"`);
        }
      });

      gen.elseIf(_`typeof ${data} === "object"`, () => {
        gen.if(_`Object.keys(${data}).length === 0`, () => {
          if (schemaType === "date|null") {
            setParentData(_`null`);
            cxt.pass();
          } else {
            addError(
              _`"Got {}->null for 'date', did you want 'date | null' ?"`,
            );
          }
        });
        gen.elseIf(_`typeof ${data}.raw === "number"`, () => {
          setParentData(_`new Date(${data}.raw * 1000)`);
          cxt.pass();
        });
      });

      gen.elseIf(_`typeof ${data} === "string"`, () => {
        gen.if(
          _`${data}.match(/^\\d{4,4}-\\d{2,2}-\\d{2,2}$/) || ${data}.match(/^\\d{4,4}-\\d{2,2}-\\d{2,2}T\\d{2,2}:\\d{2,2}:\\d{2,2}(\\.\\d{3,3})?Z$/)`,
          () => {
            setParentData(_`new Date(${data})`);
            cxt.pass();
          },
        );
      });
    } else if (schemaType === "DateInMs") {
      setParentData(_`new Date(${data})`);
      cxt.pass();
    } else if (schemaType === "TwoNumberRange") {
      gen.if(
        _`typeof ${data} === "object" && typeof ${data}.low === "number" && typeof ${data}.high === "number"`,
        () => cxt.pass(),
      );

      gen.elseIf(_`typeof ${data} === "string"`, () => {
        const parts = gen.let("parts", _`${data}.split("-").map(parseFloat)`);
        gen.if(
          _`Number.isNaN(${parts}[0]) || Number.isNaN(${parts}[1])`,
          () => {
            addError(
              _`"Number.parseFloat returned NaN: [" + ${parts}.join(",") + "]"`,
            );
          },
          () => {
            setParentData(_`{ low: ${parts}[0], high: ${parts}[1] }`);
            cxt.pass();
          },
        );
      });
    } else {
      throw new Error("No such yahooFinanceType: " + schemaType);
    }

    addError("No matching type");
  },
});
*/

// Create a meta-schema to handle all definitions
const metaSchema = {
  type: "object",
  properties: {
    type: { type: "string" }, // The definition name
    data: {}, // Will be filled based on type
  },
  required: ["type", "data"],
  allOf: Object.keys(schema.definitions).map((def) => ({
    if: { properties: { type: { const: def } } },
    then: {
      properties: {
        data: { $ref: `#/definitions/${def}` },
      },
    },
  })),
  definitions: schema.definitions,
};

// Compile the validator
const validate = ajv.compile(metaSchema);
const moduleCode = standalone(ajv, validate);

console.log(moduleCode);
