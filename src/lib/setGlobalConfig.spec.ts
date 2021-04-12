import testYf from "../../tests/testYf";
import setGlobalConfig from "./setGlobalConfig";
const yf = testYf({ setGlobalConfig });

describe("setGlobalConfig", () => {
  it("sets config options", () => {
    const configOverrides = { queue: { concurrency: 10, timeout: 90 } };
    yf.setGlobalConfig(configOverrides);
    expect(yf._opts.queue).toEqual(configOverrides.queue);
  });
});
