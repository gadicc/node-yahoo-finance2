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
    1618531200,
    1621555200,
    1623974400,
    1629417600,
    1642723200,
    1674172800
  ],
  strikes: [
     50,  55,  60,  65,  70,  75,  80,
     85,  90,  95, 100, 105, 110, 115,
    120, 125, 130, 135, 140, 145, 150,
    155, 160, 165, 170
  ],
  hasMiniOptions: false,
  quote: {
    language: 'en-US',
    region: 'US',
    quoteType: 'EQUITY',
    quoteSourceName: 'Nasdaq Real Time Price',
    triggerable: true,
    currency: 'USD',
    postMarketChangePercent: 0.192234,
    postMarketTime: 2021-03-19T23:59:34.000Z,
    postMarketPrice: 83.39,
    postMarketChange: 0.159996,
    regularMarketChange: 1.25,
    regularMarketChangePercent: 1.524762,
    regularMarketTime: 1616184002,
    regularMarketPrice: 83.23,
    regularMarketDayHigh: 83.52,
    regularMarketDayRange: { low: 81.02, high: 83.52 },
    regularMarketDayLow: 81.02,
    regularMarketVolume: 1135345,
    regularMarketPreviousClose: 81.98,
    bid: 83.01,
    ask: 83.88,
    bidSize: 8,
    askSize: 11,
    fullExchangeName: 'NYSE',
    financialCurrency: 'USD',
    regularMarketOpen: 82.21,
    averageDailyVolume3Month: 1705891,
    averageDailyVolume10Day: 1627187,
    fiftyTwoWeekLowChange: 4.5,
    fiftyTwoWeekLowChangePercent: 0.05715737,
    fiftyTwoWeekRange: { low: 78.73, high: 185.75 },
    fiftyTwoWeekHighChange: -102.52,
    fiftyTwoWeekHighChangePercent: -0.5519246,
    fiftyTwoWeekLow: 78.73,
    fiftyTwoWeekHigh: 185.75,
    earningsTimestamp: 2021-02-09T16:05:05.000Z,
    earningsTimestampStart: 2021-05-04T10:59:00.000Z,
    earningsTimestampEnd: 2021-05-10T12:00:00.000Z,
    epsTrailingTwelveMonths: -0.37,
    epsForward: 0.51,
    twoHundredDayAverageChangePercent: -0.2914284,
    epsCurrentYear: 0.02,
    priceEpsCurrentYear: 4161.5005,
    sharesOutstanding: 54044800,
    bookValue: 7.144,
    fiftyDayAverage: 104.35114,
    fiftyDayAverageChange: -21.12114,
    fiftyDayAverageChangePercent: -0.20240448,
    twoHundredDayAverage: 117.46167,
    twoHundredDayAverageChange: -34.231667,
    marketCap: 5565074432,
    forwardPE: 163.19609,
    priceToBook: 11.650336,
    sourceInterval: 15,
    exchangeDataDelayedBy: 0,
    tradeable: false,
    firstTradeDateMilliseconds: 2017-03-24T13:30:00.000Z,
    priceHint: 2,
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
    displayName: 'Alteryx',
    symbol: 'AYX'
  },
  options: [
    {
      expirationDate: 1618531200,
      hasMiniOptions: false,
      calls: [
        {
          contractSymbol: 'AYX210416C00115000',
          strike: 115,
          currency: 'USD',
          lastPrice: 0.42,
          change: -0.14000002,
          percentChange: -25.000004,
          volume: 122,
          openInterest: 794,
          bid: 0.4,
          ask: 0.47,
          contractSize: 'REGULAR',
          expiration: 1618531200,
          lastTradeDate: 1616176562,
          impliedVolatility: 0.7216824707031251,
          inTheMoney: false
        },
        {
          contractSymbol: 'AYX210416C00145000',
          strike: 145,
          currency: 'USD',
          lastPrice: 0.25,
          change: 0,
          percentChange: 0,
          volume: 1,
          openInterest: 37,
          bid: 0.1,
          ask: 0.73,
          contractSize: 'REGULAR',
          expiration: 1618531200,
          lastTradeDate: 1616091299,
          impliedVolatility: 1.0849655126953124,
          inTheMoney: false
        },
      ],
      puts: [
        {
          contractSymbol: 'AYX210416P00050000',
          strike: 50,
          currency: 'USD',
          lastPrice: 0.21,
          change: 0.059999987,
          percentChange: 39.99999,
          volume: 76,
          openInterest: 21,
          bid: 0.1,
          ask: 0.21,
          contractSize: 'REGULAR',
          expiration: 1618531200,
          lastTradeDate: 1616183395,
          impliedVolatility: 0.9355475195312499,
          inTheMoney: false
        },
        {
          contractSymbol: 'AYX210416P00055000',
          strike: 55,
          currency: 'USD',
          lastPrice: 0.38,
          change: 0,
          percentChange: 0,
          volume: 1,
          openInterest: 1,
          bid: 0.04,
          ask: 0.46,
          contractSize: 'REGULAR',
          expiration: 1618531200,
          lastTradeDate: 1614954918,
          impliedVolatility: 0.84961087890625,
          inTheMoney: false
        },
      ]
    }
  ]
}
```

## API

```js
await yahooFinance.options(query, queryOptions, moduleOptions);
```

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  You can find it
using [autoc](./auto.md) or [search](./search.md).  You can also provide
an array of symbols, and you'll receive an array of results back.

### Query Options

| Name        | Type   | Default | Description                                                       |
| ----------- | ------ | ------- | ----------------------------------------------------------------- |
| `formatted` | number | 5       | The max amount of symbols that can be returned.                   |
| `lang`      | string | "en-US" |                                                                   |
| `region`    | string | "US"    |                                                                   |

### Module Options

See [Common Options](../README.md#common-options).