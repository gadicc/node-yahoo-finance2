#!/usr/bin/env node

const yahooFinance = require('../index.js');
const moduleNames = Object.keys(yahooFinance);

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
  const result = await yahooFinance[moduleName].apply(null, args);
  console.log(result);
})();
