# historical

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'TSLA';
const queryOptions = { period1: '2021-02-01', /* ... */ };
const result = await yahooFinance.search(query, queryOptions);

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
