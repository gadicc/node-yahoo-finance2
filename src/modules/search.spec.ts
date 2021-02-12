import search from "./search";
const { InvalidOptionsError } = require("../lib/errors");

import { testSymbols } from "../../tests/symbols";
import testYf from "../../tests/testYf";

const yf = testYf({ search });

const testSearches = [
  ...testSymbols,
  "Evolution Gaming Group", // STO
  "Bayerische Motoren Werke AG", // GER
  "NO0010123060", // has no shortname! (#31)
];

describe("search", () => {
  // See also common module tests in moduleExec.spec.js

  // validate different searches
  testSearches.forEach((search) => {
    it(`passed validation for search: ${search}`, async () => {
      const devel = `search-${search}.json`;
      await yf.search(search, {}, { devel });
    });
  });
});
