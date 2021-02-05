// libs
import yahooFinanceFetch from './lib/yahooFinanceFetch';
import moduleExec from './lib/moduleExec';
import options from './lib/options';

// modules
import autoc from './modules/autoc';
import historical from './modules/historical';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';

export default {
  _env: {},
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
  _options: options,

  autoc,
  historical,
  quoteSummary,
  search,
};
