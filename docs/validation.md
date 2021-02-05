# Validation

`yahoo-finance2` validates all results returned from Yahoo before returning
them.  This document explains why this is import, but also how you can
side-step this if you understand the risks.

1. [Why Validate](#why-validate)
1. [Using Unvalidated Data](#using-unvalidated-data)
1. [Skip Validation Completely](#using-unvalidated-data)
1. [Don't Log Validation Fails](#dont-log-validation-fails)

<a name="why-validate"></a>
## Why Validate

Validation ensures that your code receives expected input and will not crash
unexpectedly in the future with unexpected results.

Say I have some typical code like:

```js
function calculateStockHoldingValue(symbol) {
  const { qty } = await db.holdings.findOne({ symbol });
  const { price } = await yahooFinance.quoteSummary(symbol, { modules: "price" });

  return qty * price.regularMarketPrice;
}
```

Say `qty = 50` and unexpectedly, `price.regularMarketPrice` is undefined.

`const result = 50 * undefined; // NaN`

In the best case scenario, this will crash my app somewhere else.  In the worst case scenario, the NaN will be used with other calculations, which will also be NaNs, which could then crash all other unrelated parts of my app.

Or with dates:

```js
const { price: { regularMarketTime }} = await yahooFinance.quoteSummary('AAPL');

// Uncaught TypeError: Cannot read property 'getTime' of undefined
regularMarketTime.getTime();  //  "But it worked fine in development!!"

// Even worse is it IS defined, but is not a Date.  That *won't* throw an error in my code,
// instead, I'll be making a comparison that will be true when it should be false, etc.
const goodTimeToTrade = regularMarketTime > anotherDateObject;
```

By catching errors you can keep your code safe from unexpected input:

```js
let result;
try {
  result = await yahooFinance.search('gold');
} catch(e) {
  // i.e. do nothing with invalid result
  return;
}
// Everything below here will be safe and won't throw unexpected errors
$('input').value(result.Result[0].name);
```

<a name="using-unvalidated-data"></a>
## Using Unvalidated Data

You can decide to catch the error and continue regardless.

```js
let result;
try {
  result = await yahooFinance.search('gold');
} catch(error) {
  // i'll take responsibility for this
  result = error.result;
}
// and will do my own validation
if (result
    && isArray(result.Result)
    && result.Result[0]
    && typeof result.Result[0].name === 'string')
  $('input').value(result.Result[0].name);
```

You also have access to `error.errors` which is an array of schema validation
errors.  You could decide that some errors are ok to ignore but others not.

<a name="using-unvalidated-data"></a>
## Skip Validation Completely

Following on from the above, if you really don't care for validation, you can
use the `{ validateResult: false }` module option to prevent throwing errors
altogether on results that don't pass validation.

```js
const result = await yahooFinance.search('gold', {}, { validateResult: false });

if (result
    && isArray(result.Result)
    && result.Result[0]
    && typeof result.Result[0].name === 'string')
  $('input').value(result.Result[0].name);

```

<a name="dont-log-validation-fails"></a>
## Don't Log Validation Fails
