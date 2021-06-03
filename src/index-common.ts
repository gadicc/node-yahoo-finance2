// libs
import yahooFinanceFetch from "./lib/yahooFinanceFetch.js";
import moduleExec from "./lib/moduleExec.js";
import options from "./lib/options.js";

// modules
import autoc from "./modules/autoc.js";
import quote from "./modules/quote.js";
import quoteSummary from "./modules/quoteSummary.js";
import search from "./modules/search.js";
import recommendationsBySymbol from "./modules/recommendationsBySymbol.js";
import trendingSymbols from "./modules/trendingSymbols.js";
import optionsModule from "./modules/options.js";
import historical from "./modules/historical.js";

// other
import quoteCombine from "./other/quoteCombine.js";
import insights from "./modules/insights.js";

export default {
  // internal
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _opts: options,

  // modules,
  autoc,
  quote,
  quoteSummary,
  search,
  recommendationsBySymbol,
  trendingSymbols,
  options: optionsModule,
  insights,
  historical,

  // other
  quoteCombine,
};
