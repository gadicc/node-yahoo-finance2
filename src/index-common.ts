// libs
import yahooFinanceFetch from './lib/yahooFinanceFetch';

// modules
import autoc from './modules/autoc';
import historical from './modules/historical';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';

export default {
  _env: {},
  _fetch: yahooFinanceFetch,

  autoc,
  historical,
  quoteSummary,
  search,
};
