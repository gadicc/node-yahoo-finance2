import { expect, jest } from "@jest/globals";
import { ExtendedCookieJar } from "./cookieJar";
import { getCookies } from "./getCookies";
import options from "./options";

jest.mock("./cookieJar");

describe("getCookies", () => {
  const { logger } = options;
  let cookieJar: ExtendedCookieJar;

  beforeEach(() => {
    cookieJar = new ExtendedCookieJar();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("cookieJar with random cookie string", async () => {
    const cookies = await getCookies("myurl", cookieJar, {}, logger);
    expect(cookieJar.getCookies).toHaveBeenCalledTimes(1);
    expect(cookies).toBeTruthy();
  });
});
