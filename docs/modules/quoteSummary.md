# quoteSummary

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const symbol = 'OCDO.L';
const queryOptions = { modules: ['price', 'summaryDetail'] }; // defaults
const result = await yahooFinance.quoteSummary(symbol, queryOptions);

{
  summaryDetail: {
    maxAge: 1,
    priceHint: 2,
    previousClose: 2828,
    open: 2843,
    dayLow: 2776,
    dayHigh: 2853,
    regularMarketPreviousClose: 2828,
    regularMarketOpen: 2843,
    regularMarketDayLow: 2776,
    regularMarketDayHigh: 2853,
    payoutRatio: 0,
    beta: 0.693054,
    volume: 1004034,
    regularMarketVolume: 1004034,
    averageVolume: 1831257,
    averageVolume10days: 2115356,
    averageDailyVolume10Day: 2115356,
    bid: 2788,
    ask: 2790,
    bidSize: 0,
    askSize: 0,
    marketCap: 20966455296,
    fiftyTwoWeekLow: 994.012,
    fiftyTwoWeekHigh: 2914,
    priceToSalesTrailing12Months: 10.691171,
    fiftyDayAverage: 2477.3635,
    twoHundredDayAverage: 2397.2805,
    currency: 'GBp',
    fromCurrency: null,
    toCurrency: null,
    lastMarket: null,
    algorithm: null,
    tradeable: false
  },
  price: {
    maxAge: 1,
    regularMarketChangePercent: -0.00990099,
    regularMarketChange: -28,
    regularMarketTime: new Date("2021-02-02T16:35:44.000Z"),
    priceHint: 2,
    regularMarketPrice: 2800,
    regularMarketDayHigh: 2853,
    regularMarketDayLow: 2776,
    regularMarketVolume: 1004034,
    averageDailyVolume10Day: 2115356,
    averageDailyVolume3Month: 1831257,
    regularMarketPreviousClose: 2828,
    regularMarketSource: 'DELAYED',
    regularMarketOpen: 2843,
    exchange: 'LSE',
    exchangeName: 'LSE',
    exchangeDataDelayedBy: 20,
    marketState: 'PREPRE',
    quoteType: 'EQUITY',
    symbol: 'OCDO.L',
    underlyingSymbol: null,
    shortName: 'OCADO GROUP PLC ORD 2P',
    longName: 'Ocado Group plc',
    currency: 'GBp',
    quoteSourceName: 'Delayed Quote',
    currencySymbol: '£',
    fromCurrency: null,
    toCurrency: null,
    lastMarket: null,
    marketCap: 20966455296
  }
}
```

## API

```js
await yahooFinance.quoteSummary(symbol, queryOptions, fetchOptions);
```

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  You can find it
using [autoc](./auto.md) or [search](./search.md).

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `modules`     | `Array<string>`  | `["price","summaryDetail"]` | List of modules to query


The full list of submodules and their output:

* [assetProfile](#assetProfile)
* [balanceSheetHistory](#balanceSheetHistory)
* [balanceSheetHistoryQuarterly](#balanceSheetHistoryQuarterly)
* [calendarEvents](#calendarEvents)
* [cashflowStatementHistory](#cashflowStatementHistory)
* [cashflowStatementHistoryQuarterly](#cashflowStatementHistoryQuarterly)
* [defaultKeyStatistics](#defaultKeyStatistics)
* [earnings](#earnings)
* [earningsHistory](#earningsHistory)
* [earningsTrend](#earningsTrend)
* [financialData](#financialData)
* [fundOwnership](#fundOwnership)
* [fundPerformance](#fundPerformance)
* [fundProfile](#fundProfile)
* [incomeStatementHistory](#incomeStatementHistory)
* [incomeStatementHistoryQuarterly](#incomeStatementHistoryQuarterly)
* [indexTrend](#indexTrend)
* [industryTrend](#industryTrend)
* [insiderHolders](#insiderHolders)
* [insiderTransactions](#insiderTransactions)
* [institutionOwnership](#institutionOwnership)
* [majorDirectHolders](#majorDirectHolders)
* [majorHoldersBreakdown](#majorHoldersBreakdown)
* [netSharePurchaseActivity](#netSharePurchaseActivity)
* [price](#price)
* [quoteType](#quoteType)
* [recommendationTrend](#recommendationTrend)
* [secFilings](#secFilings)
* [sectorTrend](#sectorTrend)
* [summaryDetail](#summaryDetail)
* [summaryProfile](#summaryProfile)
* [symbol](#symbol)
* [topHoldings](#topHoldings)
* [upgradeDowngradeHistory](#upgradeDowngradeHistory)

<a name="assetProfile"></a>
### assetProfile

```js
await yahooFinance.quoteSummary('AAPL', { modules: [ "assetProfile" ] });

{
  assetProfile: {
    address1: 'One Apple Park Way',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014',
    country: 'United States',
    phone: '408-996-1010',
    website: 'http://www.apple.com',
    industry: 'Consumer Electronics',
    sector: 'Technology',
    longBusinessSummary: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories. It also provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store, that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It sells and delivers third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1977 and is headquartered in Cupertino, California.',
    fullTimeEmployees: 147000,
    companyOfficers: [
      {
        maxAge: 1,
        name: 'Mr. Timothy D. Cook',
        age: 59,
        title: 'CEO & Director',
        yearBorn: 1961,
        fiscalYear: 2020,
        totalPay: 14769259,
        exercisedValue: 0,
        unexercisedValue: 0
      },
      /* ... */
    ],
    auditRisk: 1,
    boardRisk: 1,
    compensationRisk: 3,
    shareHolderRightsRisk: 1,
    overallRisk: 1,
    governanceEpochDate: new Date("2021-01-22T00:00:00.000Z"),
    compensationAsOfEpochDate: new Date("2020-12-31T00:00:00.000Z"),
    maxAge: 86400
  }
}
```

<a name="balanceSheetHistory"></a>
### balanceSheetHistory

```js
await yahooFinance.quoteSummary('', { modules: [ "balanceSheetHistory" ] });


```

<a name="balanceSheetHistoryQuarterly"></a>
### balanceSheetHistoryQuarterly

```js
await yahooFinance.quoteSummary('', { modules: [ "balanceSheetHistoryQuarterly" ] });


```

<a name="calendarEvents"></a>
### calendarEvents

```js
await yahooFinance.quoteSummary('', { modules: [ "calendarEvents" ] });


```

<a name="cashflowStatementHistory"></a>
### cashflowStatementHistory

```js
await yahooFinance.quoteSummary('', { modules: [ "cashflowStatementHistory" ] });


```

<a name="cashflowStatementHistoryQuarterly"></a>
### cashflowStatementHistoryQuarterly

```js
await yahooFinance.quoteSummary('', { modules: [ "cashflowStatementHistoryQuarterly" ] });


```

<a name="defaultKeyStatistics"></a>
### defaultKeyStatistics

```js
await yahooFinance.quoteSummary('', { modules: [ "defaultKeyStatistics" ] });


```

<a name="earnings"></a>
### earnings

```js
await yahooFinance.quoteSummary('', { modules: [ "earnings" ] });


```

<a name="earningsHistory"></a>
### earningsHistory

```js
await yahooFinance.quoteSummary('', { modules: [ "earningsHistory" ] });


```

<a name="earningsTrend"></a>
### earningsTrend

```js
await yahooFinance.quoteSummary('', { modules: [ "earningsTrend" ] });


```

<a name="financialData"></a>
### financialData

```js
await yahooFinance.quoteSummary('', { modules: [ "financialData" ] });


```

<a name="fundOwnership"></a>
### fundOwnership

```js
await yahooFinance.quoteSummary('', { modules: [ "fundOwnership" ] });


```

<a name="fundPerformance"></a>
### fundPerformance

```js
await yahooFinance.quoteSummary('', { modules: [ "fundPerformance" ] });


```

<a name="fundProfile"></a>
### fundProfile

```js
await yahooFinance.quoteSummary('', { modules: [ "fundProfile" ] });


```

<a name="incomeStatementHistory"></a>
### incomeStatementHistory

```js
await yahooFinance.quoteSummary('', { modules: [ "incomeStatementHistory" ] });


```

<a name="incomeStatementHistoryQuarterly"></a>
### incomeStatementHistoryQuarterly

```js
await yahooFinance.quoteSummary('', { modules: [ "incomeStatementHistoryQuarterly" ] });


```

<a name="indexTrend"></a>
### indexTrend

```js
await yahooFinance.quoteSummary('', { modules: [ "indexTrend" ] });


```

<a name="industryTrend"></a>
### industryTrend

```js
await yahooFinance.quoteSummary('', { modules: [ "industryTrend" ] });


```

<a name="insiderHolders"></a>
### insiderHolders

```js
await yahooFinance.quoteSummary('', { modules: [ "insiderHolders" ] });


```

<a name="insiderTransactions"></a>
### insiderTransactions

```js
await yahooFinance.quoteSummary('', { modules: [ "insiderTransactions" ] });


```

<a name="institutionOwnership"></a>
### institutionOwnership

```js
await yahooFinance.quoteSummary('', { modules: [ "institutionOwnership" ] });


```

<a name="majorDirectHolders"></a>
### majorDirectHolders

```js
await yahooFinance.quoteSummary('', { modules: [ "majorDirectHolders" ] });


```

<a name="majorHoldersBreakdown"></a>
### majorHoldersBreakdown

```js
await yahooFinance.quoteSummary('', { modules: [ "majorHoldersBreakdown" ] });


```

<a name="netSharePurchaseActivity"></a>
### netSharePurchaseActivity

```js
await yahooFinance.quoteSummary('', { modules: [ "netSharePurchaseActivity" ] });


```

<a name="price"></a>
### price

```js
await yahooFinance.quoteSummary('', { modules: [ "price" ] });


```

<a name="quoteType"></a>
### quoteType

```js
await yahooFinance.quoteSummary('', { modules: [ "quoteType" ] });


```

<a name="recommendationTrend"></a>
### recommendationTrend

```js
await yahooFinance.quoteSummary('', { modules: [ "recommendationTrend" ] });


```

<a name="secFilings"></a>
### secFilings

```js
await yahooFinance.quoteSummary('', { modules: [ "secFilings" ] });


```

<a name="sectorTrend"></a>
### sectorTrend

```js
await yahooFinance.quoteSummary('', { modules: [ "sectorTrend" ] });


```

<a name="summaryDetail"></a>
### summaryDetail

```js
await yahooFinance.quoteSummary('', { modules: [ "summaryDetail" ] });


```

<a name="summaryProfile"></a>
### summaryProfile

```js
await yahooFinance.quoteSummary('', { modules: [ "summaryProfile" ] });


```

<a name="symbol"></a>
### symbol

```js
await yahooFinance.quoteSummary('', { modules: [ "symbol" ] });


```

<a name="topHoldings"></a>
### topHoldings

```js
await yahooFinance.quoteSummary('', { modules: [ "topHoldings" ] });


```

<a name="upgradeDowngradeHistory"></a>
### upgradeDowngradeHistory

```js
await yahooFinance.quoteSummary('', { modules: [ "upgradeDowngradeHistory" ] });


```
