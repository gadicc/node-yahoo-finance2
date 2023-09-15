# chart

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'AAPL';
const queryOptions = { period1: '2021-05-08', /* ... */ };
const result = await yahooFinance.chart(query, queryOptions);

{
  meta: {
    currency: 'USD',
    symbol: 'AAPL',
    exchangeName: 'NMS',
    instrumentType: 'EQUITY',
    firstTradeDate: new Date("1980-12-12T14:30:00.000Z"),
    regularMarketTime: new Date("2021-11-19T21:00:02.000Z"),
    gmtoffset: -18000,
    timezone: 'EST',
    exchangeTimezoneName: 'America/New_York',
    regularMarketPrice: 160.55,
    chartPreviousClose: 124.808,
    priceHint: 2,
    currentTradingPeriod: {
      pre: {
        timezone: 'EST',
        start: new Date("2021-11-19T09:00:00.000Z"),
        end: new Date("2021-11-19T14:30:00.000Z"),
        gmtoffset: -18000
      },
      regular: {
        timezone: 'EST',
        start: new Date("2021-11-19T14:30:00.000Z"),
        end: new Date("2021-11-19T21:00:00.000Z"),
        gmtoffset: -18000
      },
      post: {
        timezone: 'EST',
        start: new Date("2021-11-19T21:00:00.000Z"),
        end: new Date("2021-11-20T01:00:00.000Z"),
        gmtoffset: -18000
      }
    },
    dataGranularity: '1d',
    range: '',
    validRanges: [
      '1d',  '5d',  '1mo',
      '3mo', '6mo', '1y',
      '2y',  '5y',  '10y',
      'ytd', 'max'
    ]
  },
  quotes: [
    {
      date: new Date("2020-05-08T13:30:00.000Z"),
      high: 77.5875015258789,
      volume: 133838400,
      open: 76.41000366210938,
      low: 76.07250213623047,
      close: 77.53250122070312,
      adjclose: 76.78629302978516 // if requested
    },
    // ...
  ]
  events: {
    dividends: [
      { amount: 0.205, date: new Date("2020-05-08T13:30:00.000Z") },
      // ...
    ],
    splits: [
      {
        date: new Date("2020-08-31T13:30:00.000Z"),
        numerator: 4,
        denominator: 1,
        splitRatio: '4:1'
      },
      // ...
    ]
  }
}
```

Make sure to also look out for [chart() errors](#errors)
and [general errors](../README.md#error-handling).

The above includes a number of transforms from the original object format
received from Yahoo, which makes the data a bit easier to work with.  It uses
the query default of `{ return: "array" }`.  However, certain charting
libraries might actually prefer the original format, which you can get with
`{ return: "object" }`, as follows:

```js

const query = 'AAPL';
const queryOptions = { period1: '2021-05-08', return: "object", /* ... */ };
const result = await yahooFinance.chart(query, queryOptions);

{
  meta: { /* same format as previous example */ },
  timestamp: [
    // These are the object keys used below.
    1598880600,
    1598967000,
    1599053400,
    // ...
  ],
  events: {
    dividends: {
      '1604673000': { amount: 0.205, date: new Date("2020-11-06T14:30:00.000Z") },
      '1612535400': { amount: 0.205, date: new Date("2021-02-05T14:30:00.000Z") },
      '1620394200': { amount: 0.22, date: new Date("2021-05-07T13:30:00.000Z") },
      '1628256600': { amount: 0.22, date: new Date("2021-08-06T13:30:00.000Z") },
      '1636119000': { amount: 0.22, date: new Date("2021-11-05T13:30:00.000Z") }
    },
    splits: {
      '1598880600': {
        date: new Date("2020-08-31T13:30:00.000Z"),
        numerator: 4,
        denominator: 1,
        splitRatio: '4:1'
      }
    }
  },
  indicators: {
    quote: [
      {
        high: [ 131,  134.8000030517578, 137.97999572753906, /* ... */ ],
        volume: [ 225702700, 151948100, 200119000, /* ... */ ],
        open: [ 127.58000183105469, 132.75999450683594, 137.58999633789062, /* ... */ ],
        low: [ 126, 130.52999877929688, 127, /* ... */ ],
        close: [ 129.0399932861328, 134.17999267578125, 131.39999389648438, /* ... */ ]
      }
    ],
    adjclose: [
      {
        adjclose: [ 128.0284881591797, 133.12820434570312,  130.3699951171875, /* ... */ ],
      }
    ]
  }
}
```

**Note:** The example outputs above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/chart.ts

## API

```js
await yahooFinance.chart(query, queryOptions, moduleOptions);
```

### Query term

Yahoo Symbol, e.g. "AAPL", "TSLA", etc.

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `period1`     | Date*     | *required* | Starting period
| `period2`     | Date*     | (today)    | Ending period
| `useYfid`     | boolean   | true       |
| `interval`    | string    | "1d"       | Interval period (see below)
| `includePrePost` | boolean | true      |
| `events`      | string    | "div\|split\|earn" | Event types to return, "\|"-separated
| `lang`        | string    | "en-US"    |
| **`return`**  | string    | "array"    | "array" or "object", see examples above.  Not sent to Yahoo.


Dates* can be:

* A **Date** instance, e.g. `new Date(something)`
* A **string** that can be parsed by `Date()`, e.g. `"2020-01-01"`.
* A **unix timestamp**, e.g. `1636119000000`

Interval period can be one of 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, **1d**, 5d, **1wk**, **1mo**, 3mo.

### Module Options

See [Common Options](../README.md#common-options).

<a name="errors"></a>
## Errors

* `Error: No data found, symbol may be delisted`

  You'll get this error if you try query that a symbol that doesn't exist.
  **If a stock gets delisted, a previously valid symbol will stop working!**
  *This includes periods for when the stock WAS listed*.  ALL DATA will no
  longer be available.  This is how Yahoo treats delisted stocks and there is
  nothing we can do about it.
