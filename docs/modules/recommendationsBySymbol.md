# recommendationsBySymbol

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

// 1. Get recommended symbols for Apple
const searchSingle = await yahooFinance2.recommendationsBySymbol('AAPL');

{
  symbol: 'AAPL',
  recommendedSymbols: [
    { symbol: 'AMZN', score: 0.292276 },
    { symbol: 'FB', score: 0.274045 },
    { symbol: 'GOOG', score: 0.272778 },
    { symbol: 'TSLA', score: 0.270931 },
    { symbol: 'NFLX', score: 0.209186 }
  ]
}

// 2. Get recommended symbols for Apple and BMW
const searchMultiple = await yahooFinance2.recommendationsBySymbol([
'AAPL',
'BMW.DE',
]);

[
  {
    symbol: 'AAPL',
    recommendedSymbols: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    symbol: 'BMW.DE',
    recommendedSymbols: [ [Object], [Object], [Object], [Object], [Object] ]
  }
]
```

## API

```js
await yahooFinance.recommendationsBySymbol(query, queryOptions, moduleOptions);
```

### Query

You can pass a single symbol as a string, e.g `AAPL` or multiple symbols in an array, e.g `['AAPL', 'BMW.DE']`.

### Query Options

There are no query options for this module that we know of.

### Module Options

See [Common Options](../README.md#common-options).
