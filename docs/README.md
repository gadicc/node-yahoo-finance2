# yahoo-finance docs

## Table of Contents

1. [Common Options](#common-options)
1. [Modules](#modules)
1. [Other Methods](#other)
1. [Error Handling](#error-handling)
1. [Validation](./validation.md)

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

1. [autoc](./modules/autoc.md) - autocomplete, great for symbol lookup.
1. [historical](./modules/historical.md) - historical market prices.
1. [quote](./modules/quote.md) - essential symbol info.
1. [quoteSummary](./modules/quoteSummary.md) - comprehensive symbol info.
1. [search](./modules/search.md) - symbol lookup, news and articles.
1. [recommendationsBySymbol](./modules/recommendationsBySymbol.md) - similar symbols.
1. [trendingSymbols](./modules/trendingSymbols.md) - symbols trending in a country.
1. [options](./modules/options.md) - options trading (call/put).

<a name="other"></a>
## Other Methods

1. [quoteCombine](./other/quoteCombine.md) - debounce and combine multiple quote calls.

<a name="error-handling"></a>
## Error Handling

The modules rely on external services and *things can go wrong*.  Therefore,
it's important to wrap your use of this library in try..catch statements,
e.g.:

```js
let result;
try {
  result = await yahooFinance.quote(symbol);
} catch (error) {
  // Inspect error and decide what to do; often, you may want to just abort:
  return;
}

doSomethingWith(result); // safe to use in the way you expect
```

So what can go wrong?

* Network errors: request timeouts, no response, etc.
* HTTP errors: internal errors, etc.
* Missing resources, e.g. asking for fund data for a stock.
* Validation errors.

The library goes to great lengths to ensure that if there are no errors,
the result you receive will be in an expected format and structure, that
is safe to use, put in your database, perform calculations with, etc
(but please do let us know if you come across any edge cases).

There is a list of specific errors at [lib/errors.ts](../src/lib/errors.ts)
but generally we'll prevent you from making bad requests with invalid option,
etc.

See also: [Validation](./validation.md)

## Validation

As per the previous section, if you do receive a result (i.e. if no error is
thrown), it should reliably be in the format you expect.  As such, every
received result is validated against the schema we've developed for each
module.

See the [Validation docs](./validation.md) for more info, including how to
continue past validation errors or skip validation entirely, as long as you
understand the risks.
