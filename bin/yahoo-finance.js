#!/usr/bin/env -S node --experimental-json-modules --experimental-vm-modules

import os from "os";
import path from "path";
import { FileCookieStore } from "tough-cookie-file-store";
import yahooFinance from "../dist/esm/src/index-node.js";
import { ExtendedCookieJar } from "../dist/esm/src/lib/cookieJar.js";

const cookiePath = path.join(os.homedir(), ".yf2-cookies.json");
const cookieJar = new ExtendedCookieJar(new FileCookieStore(cookiePath));
yahooFinance.setGlobalConfig({ cookieJar });

const moduleNames = Object.keys(yahooFinance).filter((n) => !n.startsWith("_"));
// moduleNames.push("_chart"); // modules in development

const node = process.argv[0];
const script = process.argv[1];
const moduleName = process.argv[2];
const argsAsStrings = process.argv.slice(3);

if (moduleName === "--help" || moduleName === "-h") {
  console.log();
  console.log("Usage: yahoo-finance.js <module> <args>");
  console.log();
  console.log("Get a quote for AAPL:");
  console.log("$ yahoo-finance.js quoteSummary AAPL");
  console.log();
  console.log("Run the quoteSummary module with two submodules:");
  console.log(
    '$ yahoo-finance.js quoteSummary AAPL \'{"modules":["assetProfile", "secFilings"]}\'',
  );
  console.log();
  console.log("Available modules:");
  console.log(moduleNames.join(", "));
  process.exit();
}

if (!moduleNames.includes(moduleName)) {
  console.log("No such module: " + moduleName);
  console.log("Available modules: " + moduleNames.join(", "));
  process.exit();
}

console.log("Storing cookies in " + cookiePath);

function decodeArgs(stringArgs) {
  return stringArgs.map((arg) => {
    if (arg[0] === "{") return JSON.parse(arg);

    if (arg.match(/^[0-9\.]+$/)) return Number(arg);

    return arg;
  });
}

(async function () {
  const args = decodeArgs(argsAsStrings);

  let result;
  try {
    result = await yahooFinance[moduleName](...args);
  } catch (error) {
    // No need for full stack trace for CLI scripts
    console.error("Exiting with " + error.name + ": " + error.message);
    process.exit(1);
  }

  if (process.stdout.isTTY) console.dir(result, { depth: null, colors: true });
  else console.log(JSON.stringify(result, null, 2));
})();
