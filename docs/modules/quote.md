# quote

Note: in the original `node-yahoo-finance`, we had a module called "`quote`"
that actually called the [quoteSummary](./quoteSummary.md) API.  See that
module for further details.

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

// Single symbol
const result = await yahooFinance.quote('AAPL');

{
  language: 'en-US',
  region: 'US',
  quoteType: 'EQUITY',
  quoteSourceName: 'Nasdaq Real Time Price',
  triggerable: true,
  currency: 'USD',
  exchange: 'NMS',
  shortName: 'Apple Inc.',
  longName: 'Apple Inc.',
  messageBoardId: 'finmb_24937',
  exchangeTimezoneName: 'America/New_York',
  exchangeTimezoneShortName: 'EST',
  gmtOffSetMilliseconds: -18000000,
  market: 'us_market',
  esgPopulated: false,
  epsCurrentYear: 4.45,
  priceEpsCurrentYear: 30.732584,
  sharesOutstanding: 16788100096,
  bookValue: 3.936,
  fiftyDayAverage: 133.31032,
  fiftyDayAverageChange: 3.4496765,
  fiftyDayAverageChangePercent: 0.02587704,
  twoHundredDayAverage: 119.94297,
  twoHundredDayAverageChange: 16.817024,
  twoHundredDayAverageChangePercent: 0.1402085,
  marketCap: 2295940513792,
  forwardPE: 29.34764,
  priceToBook: 34.745934,
  sourceInterval: 15,
  exchangeDataDelayedBy: 0,
  tradeable: false,
  firstTradeDateMilliseconds: new Date("1980-12-12T14:30:00.000Z"),
  priceHint: 2,
  marketState: 'PREPRE',
  postMarketChangePercent: -0.058498,
  postMarketTime: new Date("2021-02-06T00:59:58.000Z"),
  postMarketPrice: 136.68,
  postMarketChange: -0.0800018,
  regularMarketChange: -0.42500305,
  regularMarketChangePercent: -0.30980286,
  regularMarketTime: 1612558802,
  regularMarketPrice: 136.76,
  regularMarketDayHigh: 137.41,
  regularMarketDayRange: { low: 135.86, high: 137.41 },
  regularMarketDayLow: 135.86,
  regularMarketVolume: 75693830,
  regularMarketPreviousClose: 137.185,
  bid: 0,
  ask: 0,
  bidSize: 29,
  askSize: 11,
  fullExchangeName: 'NasdaqGS',
  financialCurrency: 'USD',
  regularMarketOpen: 137.35,
  averageDailyVolume3Month: 106825349,
  averageDailyVolume10Day: 108468300,
  fiftyTwoWeekLowChange: 83.6075,
  fiftyTwoWeekLowChangePercent: 1.572974,
  fiftyTwoWeekRange: { low: 53.1525, high: 145.09 },
  fiftyTwoWeekHighChange: -8.330002,
  fiftyTwoWeekHighChangePercent: -0.057412654,
  fiftyTwoWeekLow: 53.1525,
  fiftyTwoWeekHigh: 145.09,
  dividendDate: new Date("2021-02-11T00:00:00.000Z"),
  earningsTimestamp: new Date("2021-01-27T16:30:00.000Z"),
  earningsTimestampStart: new Date("2021-04-28T10:59:00.000Z"),
  earningsTimestampEnd: new Date("2021-05-03T12:00:00.000Z"),
  trailingAnnualDividendRate: 0.807,
  trailingPE: 37.092484,
  trailingAnnualDividendYield: 0.0058825673,
  epsTrailingTwelveMonths: 3.687,
  epsForward: 4.66,
  displayName: 'Apple',
  symbol: 'AAPL'
}

// Multiple symbols
const results = await yahooFinance.quote(['AAPL','GOOGL']);
const result = { AAPL: result[0], GOOGL: result[1] };
```

## API

```js
await yahooFinance.quote(symbol, queryOptions, moduleOptions);
```

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  You can find it
using [autoc](./auto.md) or [search](./search.md).  You can also provide
an array of symbols, and you'll receive an array of results back.

### Query Options

The `quote` module doesn't have any options.  Find some?  Let us know!

### Module Options

See [Common Options](../README.md#common-options).
