// libs
import yahooFinanceFetch from "./lib/yahooFinanceFetch.js";
import moduleExec from "./lib/moduleExec.js";
import options from "./lib/options.js";
import errors from "./lib/errors.js";

// modules
import autoc from "./modules/autoc.js";
import historical from "./modules/historical.js";
import insights from "./modules/insights.js";
import optionsModule from "./modules/options.js";
import quote from "./modules/quote.js";
import quoteSummary from "./modules/quoteSummary.js";
import recommendationsBySymbol from "./modules/recommendationsBySymbol.js";
import search from "./modules/search.js";
import trendingSymbols from "./modules/trendingSymbols.js";

// other
import quoteCombine from "./other/quoteCombine.js";

console.warn(
  "[yahoo-finance2] Please upgrade to yahoo-finance2@latest, i.e. " +
    "2.x.  The only breaking change is a fix in quoteSummary to " +
    "correctly return Date objects instead of numerical timestamps in " +
    "these submodules: defaultKeyStatistics, earningsHistory, insiderHolders. " +
    "For more info see: " +
    "https://github.com/gadicc/node-yahoo-finance2/commit/4cf1f624d55d92f80db4b36b3afe9414f5eb5a3c"
);

export default {
  // internal
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _opts: options,

  // errors
  errors,

  // modules,
  autoc,
  historical,
  insights,
  options: optionsModule,
  quote,
  quoteSummary,
  recommendationsBySymbol,
  search,
  trendingSymbols,

  // other
  quoteCombine,
};
