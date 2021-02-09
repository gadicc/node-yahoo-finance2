// libs
import yahooFinanceFetch from './lib/yahooFinanceFetch';
import moduleExec from './lib/moduleExec';
import options from './lib/options';

// modules
import autoc from './modules/autoc';
import historical from './modules/historical';
import quote from './modules/quote';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';
import recommendationsBySymbol from './modules/recommendationsBySymbol';

export default {
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _options: options,

  autoc,
  historical,
  quote,
  quoteSummary,
  search,
  recommendationsBySymbol,
};
