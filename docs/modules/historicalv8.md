# historicalv8

**IMPORTANT** This module is not production ready and may change at any time.
It uses a newer Yahoo Finance API to fetch historical prices, splits, and
dividends all in one network request. The historical module can fetch prices,
dividends, and splits as well but it requires three network requests.

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'AAPL';
const queryOptions = {
  period1: '2020-01-03',
  period2: '2021-01-04',
  events: 'div|split' // 'div', 'split', or 'div|split'
}
const result = await yahooFinance.historicalv8(query, queryOptions);

// NOTE the output format is different from that of the historical module
{
  meta: {
    currency: 'USD',
    symbol: 'AAPL',
    exchangeName: 'NMS',
    instrumentType: 'EQUITY',
    firstTradeDate: 1980-12-12T14:30:00.000Z,
    regularMarketTime: 2021-11-12T21:00:03.000Z,
    gmtoffset: -18000,
    timezone: 'EST',
    exchangeTimezoneName: 'America/New_York',
    regularMarketPrice: 149.99,
    chartPreviousClose: 75.088,
    priceHint: 2,
    currentTradingPeriod: { pre: [Object], regular: [Object], post: [Object] },
    dataGranularity: '1d',
    range: '',
    validRanges: [
      '1d',  '5d',  '1mo',
      '3mo', '6mo', '1y',
      '2y',  '5y',  '10y',
      'ytd', 'max'
    ]
  },
  quote: [
    {
      date: 2020-01-03T14:30:00.000Z,
      open: 74.2874984741211,
      close: 74.35749816894531,
      high: 75.1449966430664,
      low: 74.125,
      volume: 146322800,
      adjClose: 73.26914978027344
    },
    {
      date: 2020-01-06T14:30:00.000Z,
      open: 73.44750213623047,
      close: 74.94999694824219,
      high: 74.98999786376953,
      low: 73.1875,
      volume: 118387200,
      adjClose: 73.85298156738281
    },
    // ... more omitted
  ],
  splits: [
    {
      date: 2020-08-31T13:30:00.000Z,
      numerator: 4,
      denominator: 1,
      splitRatio: '4:1'
    }
  ],
  dividends: [
    { amount: 0.1925, date: 2020-02-07T14:30:00.000Z },
    { amount: 0.205, date: 2020-05-08T13:30:00.000Z },
    { amount: 0.205, date: 2020-08-07T13:30:00.000Z },
    { amount: 0.205, date: 2020-11-06T14:30:00.000Z }
  ]
}


```

## API

```js
await yahooFinance.historicalv8(query, queryOptions, moduleOptions);
```

### Query term

Symbol, company name, SEDOL, etc

### Query Options

As in the historical module with one difference:

The events property can be "div", "split", or "div|split".

### Module Options

See [Common Options](../README.md#common-options).
