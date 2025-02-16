import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import YahooFinance from "./index.ts";

describe("YahooFinanceFetch", () => {
  it("inits", () => {
    const yahooFinance = new YahooFinance();
    expect(yahooFinance.autoc).toBeDefined();
  });
});
