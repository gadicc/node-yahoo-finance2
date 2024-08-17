import { consoleSilent, consoleRestore } from "../../tests/console.js";
import testYf from "../../tests/testYf.js";
import options from "./options.js";
import setGlobalConfig from "./setGlobalConfig.js";
import { jest } from "@jest/globals";

const yf = testYf({ setGlobalConfig });

describe("setGlobalConfig", () => {
  const optionsBackup = JSON.parse(JSON.stringify(options));
  beforeEach(() => {
    yf._opts = JSON.parse(JSON.stringify(optionsBackup));
  });

  it("sets config options and passes validation", () => {
    const configOverrides = { queue: { concurrency: 10, timeout: 90 } };
    yf.setGlobalConfig(configOverrides);
    expect(yf._opts).toEqual({ ...optionsBackup, ...configOverrides });
  });

  it("sets config options multiple levels deep", () => {
    const configOverrides = { queue: { concurrency: 10 } };
    yf.setGlobalConfig(configOverrides);
    expect(yf._opts.queue).toEqual({
      concurrency: 10,
      timeout: optionsBackup.queue.timeout,
    });
  });

  it("should throw on invalid config", () => {
    consoleSilent();

    expect(() => yf.setGlobalConfig({ queue: { concurrency: "" } })).toThrow(
      /Validation called with invalid options/,
    );

    consoleRestore();
  });
  it("should throw on an invalid logger", () => {
    consoleSilent();

    expect(() =>
      yf.setGlobalConfig({
        logger: {
          info() {},
          debug() {},
          error() {},
          warn: "yeh this won't work",
        },
      }),
    ).toThrow(/Validation called with invalid options/);

    expect(() =>
      yf.setGlobalConfig({
        logger: {
          info() {},
          debug() {},
          error() {},
        },
      }),
    ).toThrow(/Validation called with invalid options/);

    expect(() =>
      yf.setGlobalConfig({
        logger: {},
      }),
    ).toThrow(/Validation called with invalid options/);

    consoleRestore();
  });
  it("should throw on an invalid cookie jar", () => {
    consoleSilent();

    expect(() =>
      yf.setGlobalConfig({
        cookieJar: "not a cookie jar",
      }),
    ).toThrow(/cookieJar must be an instance of ExtendedCookieJar/);
    consoleRestore();
  });
});

describe("Default options object", () => {
  it("Should log to the console appropriately with the default logger", () => {
    consoleSilent();
    jest.spyOn(console, "log");
    jest.spyOn(console, "error");

    options.logger?.info("info");
    options.logger?.warn("warn");
    options.logger?.error("error");
    options.logger?.debug("debug");

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledTimes(2);
    consoleRestore();
  });
});
