import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  setupCache,
} from "../../tests/common.ts";

import dailyLosers from "./dailyLosers.ts";

const YahooFinance = createTestYahooFinance({ modules: { dailyLosers } });
const yf = new YahooFinance();

describe("dailyLosers", () => {
  setupCache();

  it("returns expected result", () => {
    const devel = "dailyLosers.json";
    return expect(yf.dailyLosers({}, { devel })).resolves.toBeDefined();
  });
});
