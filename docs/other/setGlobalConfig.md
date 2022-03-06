# setGlobalConfig

This util function sets global config options, merging with the defaults. These options are then the defaults used for every request. It is the **recommended** way of setting global config. Setting global config directly is not recommended.

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

yahooFinance.setGlobalConfig({
    queue: {
        // some options here
    }
});
```

Notes:

- Config provided to this function is validated.
- Options are merged infinite levels deep:

```js
import yahooFinance from 'yahoo-finance2';

yahooFinance.setGlobalConfig({
    queue: {
        concurrency: 2,
        // timeout is still set
    }
});
```

## Options not documented elsewhere

* `YF_QUERY_HOST`

  * Default: `query2.yahoo.finance.com`
  * Description: the host to use to query Yahoo's API.
  As per
  [this stackoverflow post](https://stackoverflow.com/questions/44030983/yahoo-finance-url-not-working/47505102#47505102):

    * `query1.finance.yahoo.com` serves `HTTP/1.0`
    * `query2.finance.yahoo.com` serves `HTTP/1.1`
    * [Differences between HTTP/1.0 and HTTP/1.1](https://stackoverflow.com/questions/246859/http-1-0-vs-1-1)

  * This option in particular may also be set with an environment variable of the same name.
