// libs
import yahooFinanceFetch from "./lib/yahooFinanceFetch.js";
import moduleExec from "./lib/moduleExec.js";
import options from "./lib/options.js";
import errors from "./lib/errors.js";

// modules
import autoc from "./modules/autoc.js";
import _chart from "./modules/chart.js";
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
  _chart,
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
