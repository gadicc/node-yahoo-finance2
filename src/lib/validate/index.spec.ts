import { describe, test as it } from "@jest/globals";
import validateAndCoerce from "./index.js";

describe("validate", () => {
  describe("object", () => {
    it("basic", () => {
      let errors = validateAndCoerce({ foo: 42 }, { type: "object" });
      expect(errors).toHaveLength(0);

      errors = validateAndCoerce(
        { foo: 42 },
        {
          type: "object",
          properties: {
            foo: { type: "number" },
          },
        },
      );
      expect(errors).toHaveLength(0);

      errors = validateAndCoerce(
        { foo: 42 },
        {
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      );
      expect(errors[0]).toMatchObject({
        data: 42,
        message: "Expected a string",
      });
    });
  });
});
