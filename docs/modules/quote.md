# quote

Note: in the original `node-yahoo-finance`, we had a module called "`quote`"
that actually called the [quoteSummary](./quoteSummary.md) API.  See that
module for further details.

**Make sure to read the [quirks](#quirks) section at the bottom of this file.**

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
  regularMarketTime: new Date("2021-02-05T21:00:02.000Z"),
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

const optionResult = await yahooFinance.quote("AAPL220121C00025000")

{
   language: "en-US",
   region: "US",
   quoteType: "OPTION",
   triggerable: false,
   currency: "USD",
   fiftyTwoWeekLowChange: 0.5,
   fiftyTwoWeekLowChangePercent: 0.005,
   fiftyTwoWeekRange: "100.0 - 100.5",
   fiftyTwoWeekHighChange: 0,
   fiftyTwoWeekHighChangePercent: 0,
   fiftyTwoWeekLow: 100,
   fiftyTwoWeekHigh: 100.5,
   strike: 25,
   openInterest: 8,
   expireDate: 1642723200,
   expireIsoDate: "2022-01-21T00:00:00Z",
   sourceInterval: 15,
   exchangeDataDelayedBy: 20,
   tradeable: false,
   regularMarketChange: 0,
   regularMarketChangePercent: 0,
   regularMarketTime: 1623093194,
   regularMarketPrice: 100.5,
   regularMarketDayHigh: 100.5,
   regularMarketDayRange: "100.0 - 100.5",
   firstTradeDateMilliseconds: 1622088000000,
   priceHint: 2,
   regularMarketDayLow: 100,
   regularMarketVolume: 3,
   regularMarketPreviousClose: 100.5,
   bid: 105.15,
   ask: 105.8,
   fullExchangeName: "OPR",
   regularMarketOpen: 100.37,
   underlyingSymbol: "AAPL",
   exchange: "OPR",
   shortName: "AAPL Jan 2022 25.000 call",
   exchangeTimezoneName: "America/New_York",
   exchangeTimezoneShortName: "EDT",
   gmtOffSetMilliseconds: -14400000,
   market: "us24_market",
   esgPopulated: false,
   marketState: "REGULAR",
   symbol: "AAPL220121C00025000"
}

// Multiple symbols, with default { return: "array" }.  Missing symbols skipped.
const results = await yahooFinance.quote(['AAPL', 'NO_SUCH_SYMBOL', 'GOOGL']);
const result = { AAPL: result[0], GOOGL: result[1] /* not result[2]! */ };

// Other return types, where it's easier to deal with missing symbols, e.g.
// here map.get("NO_SUCH_SYMBOL") === object.NO_SUCH_SYMBOL === undefined.
const map = await yahooFinance.quote([...], { return: "map" });
const object = await yahooFinance.quote([...], { return: "object" });
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/quote.ts

## API

```js
await yahooFinance.quote(symbol, queryOptions, moduleOptions);
```

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  You can find it
using [search](./search.md).  You can also provide
an array of symbols, and you'll receive an array of results back.

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `fields`      | string[]  | (all)      | Which fields to return in query
| `return`      | string    | "array"    | Return as "array" | "map" | "object"

```js
// Don't return all fields, only return these two + other essentials.
await quote('TSLA', { fields: [ "symbol", "displayName" ] });
```

Note: some fields are *always* returned, e.g. `language`, `quoteType`, etc.
For a list of all fields, see the `Quote` interface in
[quote.ts](https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/quote.ts).

### Module Options

See [Common Options](../README.md#common-options).

<a name="quirks"></a>
## Quirks

### Inaccurate Earnings Dates

As reported by @glintik in
[issue #386](https://github.com/gadicc/node-yahoo-finance2/issues/386),
the values of
`earningsTimestamp`, `earningsTimestampStart`, `earningsTimestampEnd`
can be very misleading, and you are advised to find a better source for
accurate timing.  However, to get a *rough indication* of when the earnings
call might be (+/- 2 days), this might be sufficient.  Please review the
issue for further details and comments.

### Delisted symbols `{ quoteType: "NONE" }`

Delisted symbols arrive with `{ quoteType: "NONE" }` however we decided to
instead drop these results (returning `undefined`) to make the behaviour
consistent with requests for non-existent symbols.  See
[issue #381](https://github.com/gadicc/node-yahoo-finance2/issues/381).

If you find a use-case where this behaviour is undesirable, please open a
new issue and we'll consider adding a queryOption to disable it.
