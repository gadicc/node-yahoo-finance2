import autoc from './modules/autoc';
import quoteSummary from './modules/quoteSummary';
import search from './modules/search';

export const modules = {
  autoc,
  quoteSummary,
  search,
};


class YahooFinance {
  constructor() {
  }

  autoc = autoc;
  quoteSummary = quoteSummary;
  search = search;
}

export default YahooFinance;
