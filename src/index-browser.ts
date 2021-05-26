import yahooFinance from "./index-common.js";
import browserEnvironment from "./env-browser.js";

yahooFinance._env = browserEnvironment;

// NOTE: The repo name is hardcoded, see #167
console.warn(
  "⚠️ WARNING! This package (i.e. `yahoo-finance2`) is being used in the browser.",
  "Trying to use this may not work because of CORS. Be aware of that (and don't file issues for help with that).",
  "You can use a proxy to make CORS errors disappear, but we will not help you with that.",
  "Please read the README (https://github.com/gadicc/node-yahoo-finance2) for more details."
);

export default yahooFinance;
