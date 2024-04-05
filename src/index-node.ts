import yahooFinance from "./index-common.js";
import nodeEnvironment from "./env-node.js";
import { ExtendedCookieJar } from "./lib/cookieJar.js";

yahooFinance._env = nodeEnvironment;

export { ExtendedCookieJar };
export default yahooFinance;
