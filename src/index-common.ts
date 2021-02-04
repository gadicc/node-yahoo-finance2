// libs
import yahooFinanceFetch from './lib/yahooFinanceFetch';
import moduleExec from './lib/moduleExec';

// modules
import autoc from './modules/autoc';
import historical from './modules/historical';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';

export default {
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,

  autoc,
  historical,
  quoteSummary,
  search,
};
