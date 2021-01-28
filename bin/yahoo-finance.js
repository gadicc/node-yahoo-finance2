#!/usr/bin/env node

const YahooFinance = require('../api/index.js').default;
const { modules } = require('../api/index.js');
const moduleNames = Object.keys(modules);

const node = process.argv[0];
const script = process.argv[1];
const moduleName = process.argv[2];
const argsAsStrings = process.argv.slice(3);

if (!moduleNames.includes(moduleName)) {
  console.log("No such module: " + moduleName);
  console.log("Available modules: " + moduleNames.join(', '));
  process.exit();
}

function decodeArgs(stringArgs) {
  return stringArgs.map(arg => {

    if (arg[0] === '{')
      return JSON.parse(arg);

    if (arg.match(/^[0-9\.]+$/))
      return Number(arg);

    return arg;
  });
}

(async function() {
  const args = decodeArgs(argsAsStrings);

  const yahooFinance = new YahooFinance();
  const result = await yahooFinance[moduleName](...args);
  console.log(result);
})();
