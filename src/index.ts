import autoc from './modules/autoc';
import search from './modules/search';

export const modules = {
  autoc,
  search,
};


class YahooFinance {
  constructor() {
  }

  autoc = autoc;
  search = search;
}

export default YahooFinance;
