import search from "./search.js";
import { InvalidOptionsError } from "../lib/errors.js";

import { testSymbols } from "../../tests/symbols.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ search });

const testSearches = [
  ...testSymbols,
  "Evolution Gaming Group", // STO
  "Bayerische Motoren Werke AG", // GER
  "NO0010123060", // has no shortname! (#31)
  "EUR", // a currency
  "BJ0CDD2", // additionalProperty: { exchDisp: "London" }
];

describe("search", () => {
  // See also common module tests in moduleExec.spec.js

  // validate different searches
  it.each(testSearches)(
    "passed validation for search '%s'",
    async (testSearch) => {
      const devel = `search-${testSearch}.json`;
      await yf.search(testSearch, {}, { devel });
    }
  );
});
