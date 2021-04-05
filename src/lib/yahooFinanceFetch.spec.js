const _yahooFinanceFetch = require("./yahooFinanceFetch");
const errors = require("./errors");

const _env = require("../env-node").default;
const _opts = require("./options").default;

describe("substituteVariables", () => {
  const substituteVariables = _yahooFinanceFetch.substituteVariables;

  it("substitutes YF_QUERY_HOST", () => {
    const origUrl = "https://${YF_QUERY_HOST}/something";
    const origRandom = Math.random;

    Math.random = Math.random = () => 0.4;
    expect(substituteVariables(origUrl)).toBe(
      "https://query1.finance.yahoo.com/something"
    );

    Math.random = Math.random = () => 0.6;
    expect(substituteVariables(origUrl)).toBe(
      "https://query2.finance.yahoo.com/something"
    );

    Math.random = origRandom;
  });

  it("does not substitute non-amtching vars", () => {
    expect(substituteVariables("hello, ${name}.")).toBe("hello, ${name}.");
  });
});

describe("yahooFinanceFetch", () => {
  const yahooFinanceFetch = _yahooFinanceFetch.bind({ _env, _opts });

  // Don't log errors during tests
  const fakeConsole = { log: jest.fn(), error: jest.fn(), dir: jest.fn() };
  const origConsole = console;

  beforeEach(() => (console = fakeConsole));
  afterEach(() => (console = origConsole));

  it("catches errors", () => {
    const url = "https://query2.finance.yahoo.com/v1/finance/search";

    return expect(
      yahooFinanceFetch(url, {}, { devel: "search-noOpts.json" })
    ).rejects.toBeInstanceOf(errors.BadRequestError);
  });

  it("throws if no environmennt set", () => {
    return expect(_yahooFinanceFetch("")).rejects.toBeInstanceOf(
      errors.NoEnvironmentError
    );
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws HTTPError if !res.ok and no error in json result", () => {
      return expect(
        yahooFinanceFetch(
          "https://query1.finance.yahoo.com/nonExistingURL-CACHED",
          {},
          { devel: "pageWith404andJson.fake.json" }
        )
      ).rejects.toBeInstanceOf(errors.HTTPError);
    });

  it("throws Error if we receive unknown error from json result", () => {
    return expect(
      yahooFinanceFetch(
        "https://query1.finance.yahoo.com/nonExistingURL-CACHED",
        {},
        { devel: "pageWithUnknownError.json" }
      )
    ).rejects.toBeInstanceOf(Error);
  });
});
