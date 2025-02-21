import {
  createTestYahooFinance,
  describe,
  expect,
  it,
  setupCache,
} from "../../tests/common.ts";

import dailyGainers from "./dailyGainers.ts";

const YahooFinance = createTestYahooFinance({ modules: { dailyGainers } });
const yf = new YahooFinance();

describe("dailyGainers", () => {
  setupCache();

  it("returns expected result", () => {
    const devel = "dailyGainers.json";
    return expect(yf.dailyGainers({}, { devel })).resolves.toBeDefined();
  });
});
