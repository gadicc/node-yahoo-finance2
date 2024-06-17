import crypto from "crypto";
import { expect, jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { createCachingMock, NodeFSStore } from "jest-fetch-mock-cache";
import { ExtendedCookieJar } from "./cookieJar";
import { getCookies } from "./getCookies";
import options from "./options";
fetchMock.enableMocks();

//jest.mock("./cookieJar");

const BASE_URL = "https://finance.yahoo.com";
const cachingMock = createCachingMock({ store: new NodeFSStore() });

describe("getCookies", () => {
  const { logger } = options;
  let cookieJar: ExtendedCookieJar;

  beforeEach(() => {
    fetchMock.mockImplementation(cachingMock);
    cookieJar = new ExtendedCookieJar();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("cookieJar with random cookie string", async () => {
    jest.spyOn(cookieJar, "getCookies").mockImplementation(() => {
      return [crypto.randomBytes(32).toString("hex")];
    });
    const cookies = await getCookies(cookieJar, {}, logger, BASE_URL);
    expect(cookieJar.getCookies).toHaveBeenCalledTimes(1);
    expect(cookies).toBeTruthy();
  });

  it("cookieJar without cookies", async () => {
    const cookies = await getCookies(cookieJar, {}, logger, BASE_URL);
  });
});
