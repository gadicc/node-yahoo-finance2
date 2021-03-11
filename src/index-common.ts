// libs
import yahooFinanceFetch from "./lib/yahooFinanceFetch";
import moduleExec from "./lib/moduleExec";
import options from "./lib/options";

// modules
import autoc from "./modules/autoc";
import historical from "./modules/historical";
import quote from "./modules/quote";
import quoteSummary from "./modules/quoteSummary";
import search from "./modules/search";
import recommendationsBySymbol from "./modules/recommendationsBySymbol";
import trendingSymbols from "./modules/trendingSymbols";

// other
import quoteCombine from "./other/quoteCombine";

export default {
  // internal
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _opts: options,

  // modules,
  autoc,
  historical,
  quote,
  quoteSummary,
  search,
  recommendationsBySymbol,
  trendingSymbols,

  // other
  quoteCombine,
};
