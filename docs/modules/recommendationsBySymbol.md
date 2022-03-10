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

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/recommendationsBySymbol.ts

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
