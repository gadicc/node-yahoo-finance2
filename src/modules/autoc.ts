import yahooFinanceFetch from '../lib/yahooFinanceFetch';
import validate from '../lib/validate';

const QUERY_URL = 'https://autoc.finance.yahoo.com/autoc';
const QUERY_SCHEMA_KEY = "#/definitions/YahooFinanceAutocResultSet";

export interface YahooFinanceAutocResultSet {
  Query: string;
  /**
   * @minItems 0
   * @maxItems 100
   */
  Result: [YahooFinanceAutocResult]
}

export interface YahooFinanceAutocResult {
  symbol: string;      // "AMZN"
  name: string;        // "Amazon.com, Inc."
  exch: string;        // "NMS"
  type: string;        // "S".    TODO "S" | "I" | ???
  exchDisp: string;    // "NASDAQ"
  typeDisp: string;    // "Equity"
}

const queryOptionsDefaults = {
  region: 1,
  lang: 'en'
};

async function yahooFinanceAutoc(
  query: string,
  queryOptionsOverrides={},
  fetchOptions?: object
): Promise<YahooFinanceAutocResultSet> {
  const queryOptions = {
    query,
    ...queryOptionsDefaults,
    ...queryOptionsOverrides
  };

  const result = await yahooFinanceFetch(QUERY_URL, queryOptions, fetchOptions);

  if (result.ResultSet) {
    validate(result.ResultSet, QUERY_SCHEMA_KEY);
    return result.ResultSet;
  }

  throw new Error("Unexpected result: " + JSON.stringify(result));
}

export default yahooFinanceAutoc;
