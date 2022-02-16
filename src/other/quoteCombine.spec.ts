import { jest } from "@jest/globals";

import quoteCombine from "./quoteCombine.js";
import testYf from "../../tests/testYf.js";

const yf = testYf({ quoteCombine });

describe("quoteCombine", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("works with a single result", (done) => {
    console.log("works with a single result - START");
    const devel = "quoteCombine-AAPL.json";
    yf.quoteCombine("AAPL", undefined, { devel })
      .then((result: any) => {
        expect(result.symbol).toBe("AAPL");
        console.log("works with a single result - DONE");
        done();
      })
      .catch(done);
    jest.runAllTimers();
  });

  it("works with two results", (done) => {
    console.log("works with two results - START");
    const opts = { devel: "quoteCombine-AAPL-TSLA.json" };
    Promise.all([
      yf.quoteCombine("AAPL", undefined, opts).then((result: any) => {
        expect(result.symbol).toBe("AAPL");
      }),

      yf.quoteCombine("TSLA", undefined, opts).then((result: any) => {
        expect(result.symbol).toBe("TSLA");
      }),
    ])
      .then(() => {
        console.log("works with two results - DONE");
        done();
      })
      .catch(done);

    jest.runAllTimers();
  });

  it("resolves undefined for single missing symbol", (done) => {
    const devel = "quoteCombine-NONEXIST.json";
    console.log("resolves undefined for single missing symbol - START");
    yf.quoteCombine("NONEXIST", undefined, { devel })
      .then((result: any) => {
        expect(result).toBe(undefined);
        console.log("resolves undefined for single missing symbol - DONE");
        done();
      })
      .catch(done);
    jest.runAllTimers();
  });

  it("resolves undefined for missing symbols + resolves found", (done) => {
    const opts = { devel: "quoteCombine-AAPL-NONEXIST.json" };
    console.log(
      "resolves undefined for missing symbols + resolves found - START"
    );
    Promise.all([
      yf.quoteCombine("AAPL", undefined, opts).then((result: any) => {
        expect(result.symbol).toBe("AAPL");
      }),

      yf.quoteCombine("NONEXIST", undefined, opts).then((result: any) => {
        expect(result).toBe(undefined);
      }),
    ])
      .then(() => {
        console.log(
          "resolves undefined for missing symbols + resolves found - DONE"
        );
        done();
      })
      .catch(done);

    jest.runAllTimers();
  });

  it("throws if symbol arg is not a single string", () => {
    expect(() => yf.quoteCombine([])).toThrow(/string/);
  });

  if (process.env.FETCH_DEVEL !== "nocache")
    it("throws on quote() error", () => {
      console.log("throws on quote() error - START");
      const opts = { devel: "weirdJsonResult.fake.json" };
      const promise = yf
        .quoteCombine("fake", undefined, opts)
        .finally(() => console.log("throws on quote() error - DONE"));
      jest.runAllTimers();
      return expect(promise).rejects.toThrow(/Unexpected/);
    });
});
