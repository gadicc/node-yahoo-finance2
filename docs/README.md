# yahoo-finance docs

## Table of Contents

1. [Common Options](#common-options)

1. Modules
    1. [autoc](./modules/autoc.md)
    1. [historical](./modules/historical.md)
    1. [quote](./modules/quote.md)
    1. [quoteSummary](./modules/quoteSummary.md)
    1. [search](./modules/search.md)

1. [Errors Handling](#error-handling)

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



<a name="error-handling"></name>
## Error Handling and Validation.

Coming soon.

See also: [Validation](./validation.md)

## Validation

See the [Validation docs](./validation.md).
