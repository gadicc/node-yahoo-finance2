# trendingSymbols

## Usage:

```js
import yahooFinance from 'yahoo-finance2';
const queryOptions = { count: 5, lang: 'en-US' };
const result = await yahooFinance.trendingSymbols('US', queryOptions);
```
Result:
```js
{
  count: 5,
  quotes: [
    { symbol: 'TWLO' },
    { symbol: 'RIOT' },
    { symbol: 'LODE' },
    { symbol: 'TLRY' },
    { symbol: 'FSLY' }
  ],
  jobTimestamp: 1613600090081,
  startInterval: 202102172100
}
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/trendingSymbols.ts

## API

```js
await yahooFinance.trendingSymbols(query, queryOptions, moduleOptions);
```

### Query

The country name has to be an ISO2 code, either uppercase or lowercase. Most countries will not return data. Only `US`, `GB`, and a couple other will.

### Query Options

| Name     | Type   | Default | Description                                                       |
| -------- | ------ | ------- | ----------------------------------------------------------------- |
| `count`  | number | 5       | The max amount of symbols that can be returned.                   |
| `lang`   | string | "en-US" |                                                                   |
| `region` | string |         | The region/country. Will override the search country is provided. |

**NOTE:** `corsDomain` seems to be a parameter for the API according to #8, but it does nothing. **It does not set the CORS domain.** Therefore, it is not a parameter.

### Module Options

See [Common Options](../README.md#common-options).