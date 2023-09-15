# options

## Usage:

```js
import yahooFinance from 'yahoo-finance2';
const queryOptions = { lang: 'en-US', formatted: false, region: 'US' };
const result = await yahooFinance.options('AYX', queryOptions);
```
Example Result (Arrays are shortened so the docs aren't long):
```js
{
  underlyingSymbol: 'AYX',
  expirationDates: [
    new Date('2021-04-16T00:00:00.000Z'),
    new Date('2021-05-21T00:00:00.000Z'),
    new Date('2021-06-18T00:00:00.000Z'),
    new Date('2021-08-20T00:00:00.000Z'),
    new Date('2021-11-19T00:00:00.000Z'),
    new Date('2022-01-21T00:00:00.000Z'),
    new Date('2023-01-20T00:00:00.000Z'),
  ],
  strikes: [
     45,  50,  55,  60,  65,  70,  75,
     80,  85,  90,  95, 100, 105, 110,
    115, 120, 125, 130, 135, 140, 145,
    150, 155, 160, 165, 170
  ],
  hasMiniOptions: false,
  quote: {
    language: 'en-US',
    region: 'US',
    quoteType: 'EQUITY',
    quoteSourceName: 'Delayed Quote',
    triggerable: true,
    currency: 'USD',
    firstTradeDateMilliseconds: new Date('2017-03-24T13:30:00.000Z'),
    exchange: 'NYQ',
    shortName: 'Alteryx, Inc.',
    longName: 'Alteryx, Inc.',
    messageBoardId: 'finmb_8548197',
    exchangeTimezoneName: 'America/New_York',
    exchangeTimezoneShortName: 'EDT',
    gmtOffSetMilliseconds: -14400000,
    market: 'us_market',
    esgPopulated: false,
    marketState: 'CLOSED',
    postMarketChangePercent: 0.34013456,
    postMarketTime: new Date('2021-03-26T23:56:50.000Z'),
    postMarketPrice: 82.6,
    postMarketChange: 0.27999878,
    regularMarketChange: 0.3199997,
    regularMarketChangePercent: 0.39024353,
    regularMarketTime: 1616788802,
    regularMarketPrice: 82.32,
    regularMarketDayHigh: 83.7,
    regularMarketDayRange: { low: 79.71, high: 83.7 },
    regularMarketDayLow: 79.71,
    regularMarketVolume: 1275079,
    regularMarketPreviousClose: 82,
    bid: 81.66,
    ask: 82.5,
    bidSize: 11,
    askSize: 11,
    fullExchangeName: 'NYSE',
    financialCurrency: 'USD',
    regularMarketOpen: 82.59,
    averageDailyVolume3Month: 1707374,
    averageDailyVolume10Day: 1400837,
    fiftyTwoWeekLowChange: 3.5899963,
    fiftyTwoWeekLowChangePercent: 0.045598835,
    fiftyTwoWeekRange: { low: 78.73, high: 185.75 },
    fiftyTwoWeekHighChange: -103.43,
    fiftyTwoWeekHighChangePercent: -0.5568237,
    fiftyTwoWeekLow: 78.73,
    fiftyTwoWeekHigh: 185.75,
    earningsTimestamp: new Date('2021-02-09T16:05:05.000Z'),
    earningsTimestampStart: new Date('2021-05-04T10:59:00.000Z'),
    earningsTimestampEnd: new Date('2021-05-10T12:00:00.000Z'),
    epsTrailingTwelveMonths: -0.37,
    epsForward: 0.51,
    epsCurrentYear: 0.02,
    priceEpsCurrentYear: 4116,
    sharesOutstanding: 54044800,
    bookValue: 7.144,
    fiftyDayAverage: 97.982285,
    fiftyDayAverageChange: -15.662285,
    fiftyDayAverageChangePercent: -0.15984812,
    twoHundredDayAverage: 116.20604,
    twoHundredDayAverageChange: -33.88604,
    twoHundredDayAverageChangePercent: -0.2916031,
    marketCap: 5504227840,
    forwardPE: 161.41177,
    priceToBook: 11.522956,
    sourceInterval: 15,
    exchangeDataDelayedBy: 0,
    priceHint: 2,
    tradeable: false,
    displayName: 'Alteryx',
    symbol: 'AYX'
  },
  options: [
    {
      expirationDate: new Date('2021-04-16T00:00:00.000Z'),
      hasMiniOptions: false,
      calls: [
        {
          contractSymbol: 'AYX210416C00155000',
          strike: 155,
          currency: 'USD',
          lastPrice: 0.13,
          change: 0,
          percentChange: 0,
          volume: 2,
          openInterest: 5,
          bid: 0,
          ask: 0.86,
          contractSize: 'REGULAR',
          expiration: new Date('2021-04-16T00:00:00.000Z'),
          lastTradeDate: new Date('2021-03-22T15:24:10.000Z'),
          impliedVolatility: 1.3984405078125,
          inTheMoney: false
        },
      ],
      puts: [
        {
          contractSymbol: 'AYX210416P00045000',
          strike: 45,
          currency: 'USD',
          lastPrice: 0.16,
          change: 0,
          percentChange: 0,
          volume: 8,
          openInterest: 118,
          bid: 0,
          ask: 0.32,
          contractSize: 'REGULAR',
          expiration: new Date('2021-04-16T00:00:00.000Z'),
          lastTradeDate: new Date('2021-03-18T14:15:59.000Z'),
          impliedVolatility: 1.2656286718749998,
          inTheMoney: false
        },
      ]
    }
  ]
}
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/options.ts

## API

```js
await yahooFinance.options(query, queryOptions, moduleOptions);
```

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  You can find it
using [autoc](./autoc.md) or [search](./search.md).  You can also provide
an array of symbols, and you'll receive an array of results back.

### Query Options

| Name        | Type   | Default | Description                                                       |
| ----------- | ------ | ------- | ----------------------------------------------------------------- |
| `formatted` | number | `5`       | The max amount of symbols that can be returned.                   |
| `lang`      | string | `"en-US"` |                                                                   |
| `region`    | string | `"US"`    |                                                                   |
| `date`      | Date*  | `undefined` | The expiration date of the options chain to be fetched.           |

Date* can be:

* A **Date** instance, e.g. `new Date(something)`
* A **string** that can be parsed by `Date()`, e.g. `"2020-01-01"`.
* A **number** representing unix timestamp WITHOUT milliseconds (as Yahoo expects)

### Module Options

See [Common Options](../README.md#common-options).
