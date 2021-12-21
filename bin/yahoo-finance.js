#!/usr/bin/env -S node --experimental-json-modules --experimental-vm-modules

import yahooFinance from "../dist/esm/src/index-node.js";
const moduleNames = Object.keys(yahooFinance).filter((n) => !n.startsWith("_"));
moduleNames.push("_chart"); // modules in development

const node = process.argv[0];
const script = process.argv[1];
const moduleName = process.argv[2];
const argsAsStrings = process.argv.slice(3);

if (!moduleNames.includes(moduleName)) {
  console.log("No such module: " + moduleName);
  console.log("Available modules: " + moduleNames.join(", "));
  process.exit();
}

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
