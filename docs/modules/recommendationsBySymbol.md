# recommendationsBySymbol

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const result = await yahooFinance.recommendationsBySymbol(['AAPL', 'BMW.DE'], /* queryOptions */);

{
  "finance": {
    "result": [
      {
        "symbol": "AAPL",
        "recommendedSymbols": [
          { "symbol": "AMZN", "score": 0.292276 },
          { "symbol": "FB", "score": 0.274045 },
          { "symbol": "GOOG", "score": 0.272778 },
          { "symbol": "TSLA", "score": 0.270931 },
          { "symbol": "NFLX", "score": 0.209186 }
        ]
      },
      {
        "symbol": "BMW.DE",
        "recommendedSymbols": [
          { "symbol": "DAI.DE", "score": 0.1927 },
          { "symbol": "VOW.DE", "score": 0.105787 },
          { "symbol": "SIE.DE", "score": 0.102734 },
          { "symbol": "VOW3.DE", "score": 0.098733 },
          { "symbol": "BAS.DE", "score": 0.098715 }
        ]
      }
    ],
    "error": null
  }
}
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
