# quoteCombine

This utility function will debounce multiple calls and combine them into a
single [quote()](../modules/quote.md) call, i.e. you'll call `quoteCombine()`
many times, and 50ms after the last call, `quote()` will be called once so
that only a single HTTP request is sent to collect the data for all symbols.

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

// Only a single HTTP request will be made for all of these.
databaseResults.forEach(async (row) => {
  const result = await yahooFinance.quoteCombine(row.symbol);
  // do something
});

// Consider asking only for what you need to save on bandwidth and latency
const fields = [ "regularMarketPrice", "regularMarketTime" ];
const result = await yahooFinance.quoteCombine("TSLA", { fields });
```

Notes:

* Each `quoteCombine()` call receives the result for only the symbol it
 asked for.

* Query options (i.e. `fields`, above) and the shape of the return result is
identical to that of [quote()](../modules/quote.md).

* If you call `quoteCombine()` multiple times with different `queryOptions`,
  `quote()` will be called separately for each unique set of `queryOptions`
  and its associated set of symbols.

* It's fine if your code calls `quoteCombine()` many times for the same
  symbol.  The symbol will be queried only once, and returned many times.
