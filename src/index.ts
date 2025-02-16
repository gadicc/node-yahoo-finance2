import createYahooFinance from "./createYahooFinance.ts";

// import modules from "./modules/index.ts";
import autoc from "./modules/autoc.ts";
import quote from "./modules/quote.ts";
const modules = {
  quote,
  autoc,
};

const YahooFinance = createYahooFinance({ modules });

export default YahooFinance;
