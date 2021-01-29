import autoc from './modules/autoc';
import historical from './modules/historical';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';

export const modules = {
  autoc,
  historical,
  quoteSummary,
  search,
};


class YahooFinance {
  constructor() {
  }

  autoc = autoc;
  historical = historical;
  quoteSummary = quoteSummary;
  search = search;
}

export default YahooFinance;
