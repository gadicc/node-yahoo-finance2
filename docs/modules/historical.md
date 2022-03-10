# historical

API for e.g. https://finance.yahoo.com/quote/AAPL/history?p=AAPL.

Note: the historical API is a little limited; in
particular:

1. `events` (prices, dividends, and stock splits) must be queried in separate network requests.
1. `interval` can be only "1d", "1wk", "1m".

For this reason, many of us are instead using the [chart API](./chart.md) which addresses both these points.

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'TSLA';
const queryOptions = { period1: '2021-02-01', /* ... */ };
const result = await yahooFinance.historical(query, queryOptions);

[
  {
    date: new Date("2021-02-01T00:00:00.000Z"),
    open: 814.289978,
    high: 842,
    low: 795.559998,
    close: 839.809998,
    adjClose: 839.809998,
    volume: 25391400
  },
  {
    date: new Date("2021-02-02T00:00:00.000Z"),
    open: 844.679993,
    high: 880.5,
    low: 842.200623,
    close: 872.789978,
    adjClose: 872.789978,
    volume: 24346213
  }
]
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/historical.ts

Make sure to also look out for [historical() errors](#errors)
and [general errors](../README.md#error-handling).

## API

```js
await yahooFinance.historical(query, queryOptions, moduleOptions);
```

### Query term

Symbol, company name, SEDOL, etc.

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `period1`     | Date*     | *required* | Starting period
| `period2`     | Date*     | (today)    | Ending period
| `interval`    | "1d", "1wk", "1mo" | "1d" | Interval (day, week, month)
| `events`      | string    | "history"
| `includeAdjustedClose` | boolean | true

Dates* can be:

* A **Date** instance, e.g. `new Date(something)`
* A **string** that can be parsed by `Date()`, e.g. `"2020-01-01"`.

### Module Options

See [Common Options](../README.md#common-options).

## Quirks

### Null rows

Yahoo occasionally provides data like this:

```csv
Date,Open,High,Low,Close,Adj Close,Volume
2019-10-08,0.892830,0.899880,0.892200,0.892800,0.892800,0
2019-10-09,null,null,null,null,null,null
```

`node-yahoo-finance2` will silently skip these null rows, so as usual, you
can rely on received input to be well validated.  Note: this only happens
when *all* fields are `null`.  If you come across a case where only some
fields are null, an error will be thrown - in that case, please let us know
what symbol and date it happened on.

### Errors

* `HTTPError: Not Found`

  You'll get this error if you try query that a symbol that doesn't exist.
  **If a stock gets delisted, a previously valid symbol will stop working!**
  *This includes periods for when the stock WAS listed*.  ALL DATA will no
  longer be available.  This is how Yahoo treats delisted stocks and there is
  nothing we can do about it.
