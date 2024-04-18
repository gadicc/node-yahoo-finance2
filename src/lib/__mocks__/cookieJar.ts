import crypto from "crypto";

const getCookies = jest.fn(() => {
  return [crypto.randomBytes(32).toString("hex")];
});

// ES6 class mock.
export const ExtendedCookieJar = jest.fn().mockImplementation(() => {
  return { getCookies };
});
