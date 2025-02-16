import createYahooFinance from "./createYahooFinance.ts";
import yahooFinanceFetch from "./lib/yahooFinanceFetch.ts";
import moduleExec from "./lib/moduleExec.ts";

// import modules from "./modules/index.ts";
import autoc from "./modules/autoc.ts";
import quote from "./modules/quote.ts";
const modules = {
  quote,
  autoc,
  _fetch: yahooFinanceFetch,
  _moduleExec: moduleExec,
};

const YahooFinance = createYahooFinance({ modules });

export default YahooFinance;
