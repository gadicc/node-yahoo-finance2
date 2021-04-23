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
