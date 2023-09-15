// libs
import yahooFinanceFetch from "./lib/yahooFinanceFetch.js";
import moduleExec from "./lib/moduleExec.js";
import options from "./lib/options.js";
import errors from "./lib/errors.js";
import setGlobalConfig from "./lib/setGlobalConfig.js";
import { disallowAdditionalProps } from "./lib/validateAndCoerceTypes.js";

// modules
import autoc from "./modules/autoc.js";
import chart, { _chart } from "./modules/chart.js";
import historical from "./modules/historical.js";
import insights from "./modules/insights.js";
import optionsModule from "./modules/options.js";
import quote from "./modules/quote.js";
import quoteSummary from "./modules/quoteSummary.js";
import recommendationsBySymbol from "./modules/recommendationsBySymbol.js";
import search from "./modules/search.js";
import trendingSymbols from "./modules/trendingSymbols.js";
import dailyGainers from "./modules/dailyGainers.js";

// other
import quoteCombine from "./other/quoteCombine.js";

export default {
  // internal
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _opts: options,
  _disallowAdditionalProps: disallowAdditionalProps,

  // common
  errors,
  setGlobalConfig,

  // modules,
  autoc,
  chart,
  _chart,
  historical,
  insights,
  options: optionsModule,
  quote,
  quoteSummary,
  recommendationsBySymbol,
  search,
  trendingSymbols,
  dailyGainers,

  // other
  quoteCombine,
};
