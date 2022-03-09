# yahoo-finance docs

## Table of Contents

1. [Common Options](#common-options)
1. [Modules](#modules)
1. [Other Methods](#other)
1. [Util Methods](#utils)
1. [Error Handling](#error-handling)
1. [Validation](./validation.md)
1. [Concurrency](./concurrency.md)
1. [Upgrading from v1](./UPGRADING.md)

<a name="common-options"></a>
## Common Options

Coming soon. Briefly:

```js
const queryOpts = {};     // query options specific to the module

const moduleOpts = {
  devel: boolean|string,  // see the main README
  fetchOptions: {},       // options to pass to fetch
  validateResult:boolean, // READ SUPER NB VALIDATION DOC BEFORE TURNING THIS OFF
}

const result = await yahooFinance.module(query, queryOpts, moduleOpts);
```

<a name="modules"></a>
## Modules

1. ~[autoc](./modules/autoc.md)~ - decomissioned, use [search](./modules/search.md) instead.
1. [_chart](./modules/chart.md) - chart, like historical on steroids.
1. [historical](./modules/historical.md) - historical market prices.
1. [quote](./modules/quote.md) - essential symbol info.
1. [quoteSummary](./modules/quoteSummary.md) - comprehensive symbol info.
1. [search](./modules/search.md) - symbol lookup, news and articles.
1. [recommendationsBySymbol](./modules/recommendationsBySymbol.md) - similar symbols.
1. [trendingSymbols](./modules/trendingSymbols.md) - symbols trending in a country.
1. [options](./modules/options.md) - options trading (call/put).
1. [insights](./modules/insights.md) - insights and scores.

<a name="other"></a>
## Other Methods

1. [quoteCombine](./other/quoteCombine.md) - debounce and combine multiple quote calls.

<a name="utils"></a>
1. [setGlobalConfig](./other/setGlobalConfig.md) - set global config options.

<a name="error-handling"></a>
## Error Handling

The modules rely on external services and *things can go wrong*.  Therefore,
it's important to wrap your use of this library in try...catch statements,
e.g.:

```js
let result;
try {
  result = await yahooFinance.quote(symbol);
} catch (error) {
  // Inspect error and decide what to do; often, you may want to just abort:
  console.warn(`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`);
  return;
}

doSomethingWith(result); // safe to use in the way you expect
```

So what can go wrong?

* Network errors: request timeouts, no response, etc.
* HTTP errors: internal errors, etc.
* Missing resources, e.g. asking for fund data for a stock.
* Validation errors.
* **Delisted stocks.**  If a stock gets delisted, a query that worked
  previously (for a particular symbol) will begin to throw an error.
  This includes historical (and chart) data from *before* the delisting
  occured.  This is how Yahoo treats delisted stocks and there is
  nothing we can do about it.

The library goes to great lengths to ensure that if there are no errors,
the result you receive will be in an expected format and structure, that
is safe to use, put in your database, perform calculations with, etc
(but please do let us know if you come across any edge cases).

There is a list of specific errors at [lib/errors.ts](../src/lib/errors.ts),
accessible via `yahooFinance.errors`, but many of these will require further
inspection at runtime.  For example:

* `FailedYahooValidationError` - see the [Validation](./validation.md) section
on how to handle these correctly.

* `HTTPError` - the `message` property will be the HTTP Response statusText.

* `Error` - thrown after a "successful" HTTP request that returns JSON with an
  `{ error: { name: "ErrorName", description: "string" } }` shape, and where
  we don't have an "ErrorName" class.  The `message` property will be the
  `description`.

Example:

```js
import yahooFinance from 'yahoo-finance2';

let result;
try {
  result = await yahooFinance.quote(symbol);
} catch (error) {
  if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
    // See the validation docs for examples of how to handle this
    // error.result will be a partially validated / coerced result.
  } else if (error instanceof yahooFinance.errors.HTTPError) {
    // Probably you just want to log and skip these
    console.warn(`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`);
    return;
  } else {
    // Same here
    console.warn(`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`);
    return;
  }
}

doSomethingWith(result); // safe to use in the way you expect
```


If you run into any problems with error handling, feel free to open an issue
so we can make these docs clearer.

## Validation

As per the previous section, if you do receive a result (i.e. if no error is
thrown), it should reliably be in the format you expect.  As such, every
received result is validated against the schema we've developed for each
module.

See the [Validation docs](./validation.md) for more info, including how to
continue past validation errors or skip validation entirely, as long as you
understand the risks.

## Concurrency

See [Concurrency Docs](./concurrency.md).

## Upgrading from v1

See [Upgrading from v1](./UPGRADING.md).
