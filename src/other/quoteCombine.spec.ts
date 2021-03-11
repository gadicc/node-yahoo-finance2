import quoteCombine from "./quoteCombine";
import testYf from "../../tests/testYf";

const yf = testYf({ quoteCombine });

jest.useFakeTimers();

describe("quoteCombine", () => {
  it("works with a single result", (done) => {
    const devel = "quoteCombine-AAPL.json";
    yf.quoteCombine("AAPL", undefined, { devel })
      .then((result: any) => {
        expect(result.symbol).toBe("AAPL");
        done();
      })
      .catch(done);
    jest.runAllTimers();
  });

  it("works with two results", (done) => {
    const opts = { devel: "quoteCombine-AAPL-TSLA.json" };
    Promise.all([
      yf.quoteCombine("AAPL", undefined, opts).then((result: any) => {
        expect(result.symbol).toBe("AAPL");
      }),

      yf.quoteCombine("TSLA", undefined, opts).then((result: any) => {
        expect(result.symbol).toBe("TSLA");
      }),
    ])
      .then(() => done())
      .catch(done);

    jest.runAllTimers();
  });
});
