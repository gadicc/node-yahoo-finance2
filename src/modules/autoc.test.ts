import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import autoc from "./autoc.ts";

describe("autoc", () => {
  it("throws", () => expect(autoc).toThrow(/issues\/337/));
});
