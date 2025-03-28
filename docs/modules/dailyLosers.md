# trendingSymbols

## Usage:

```js
import yahooFinance from 'yahoo-finance2';
const queryOptions = { count: 5, region: 'US', lang: 'en-US' };
const result = await yahooFinance.dailyLosers(queryOptions);
```
Result:
```js
{
  "id": "8ecefa87-a8b0-434a-9b39-e061a0baef9b",
  "title": "Day Losers",
  "description": "Discover the equities with the greatest losses in the trading day.",
  "canonicalName": "DAY_LOSERS",
  "criteriaMeta": {
    "size": 5,
    "offset": 0,
    "sortField": "percentchange",
    "sortType": "ASC",
    "quoteType": "EQUITY",
    "criteria": [
      {
        "field": "percentchange",
        "subField": null,
        "operators": [
          "LT"
        ],
        "values": [
          -2.5
        ],
        "labelsSelected": [],
        "dependentValues": []
      },
      {
        "field": "region",
        "subField": null,
        "operators": [
          "EQ"
        ],
        "values": [],
        "labelsSelected": [
          53
        ],
        "dependentValues": []
      },
      {
        "field": "intradaymarketcap",
        "subField": null,
        "operators": [
          "EQ"
        ],
        "values": [],
        "labelsSelected": [
          1,
          2,
          3
        ],
        "dependentValues": []
      },
      {
        "field": "intradayprice",
        "subField": null,
        "operators": [
          "GTE"
        ],
        "values": [
          5
        ],
        "labelsSelected": [],
        "dependentValues": []
      },
      {
        "field": "dayvolume",
        "subField": null,
        "operators": [
          "GT"
        ],
        "values": [
          20000
        ],
        "labelsSelected": [],
        "dependentValues": []
      }
    ],
    "topOperator": "AND"
  },
  "rawCriteria": "{\"offset\":0,\"size\":5,\"sortField\":\"percentchange\",\"sortType\":\"ASC\",\"quoteType\":\"EQUITY\",\"query\":{\"operator\":\"AND\",\"operands\":[{\"operator\":\"LT\",\"operands\":[\"percentchange\",-2.5]},{\"operator\":\"eq\",\"operands\":[\"region\",\"us\"]},{\"operator\":\"or\",\"operands\":[{\"operator\":\"BTWN\",\"operands\":[\"intradaymarketcap\",2000000000,10000000000]},{\"operator\":\"BTWN\",\"operands\":[\"intradaymarketcap\",10000000000,100000000000]},{\"operator\":\"GT\",\"operands\":[\"intradaymarketcap\",100000000000]}]},{\"operator\":\"gte\",\"operands\":[\"intradayprice\",5]},{\"operator\":\"gt\",\"operands\":[\"dayvolume\",20000]}]}}",
  "start": 0,
  "count": 5,
  "total": 247,
  "quotes": [
    {
      "language": "en-US",
      "region": "US",
      "quoteType": "EQUITY",
      "typeDisp": "Equity",
      "quoteSourceName": "Nasdaq Real Time Price",
      "triggerable": true,
      "customPriceAlertConfidence": "HIGH",
      "lastCloseTevEbitLtm": 78.371793,
      "lastClosePriceToNNWCPerShare": 91.44903149524256,
      "currency": "USD",
      "priceHint": 2,
      "preMarketChange": 1.8699951,
      "preMarketTime": 1739351875,
      "preMarketPrice": 154.59,
      "regularMarketChange": -24.449997,
      "regularMarketTime": 1739307600,
      "regularMarketPrice": 152.72,
      "regularMarketDayHigh": 172,
      "regularMarketDayRange": "148.0 - 172.0",
      "regularMarketDayLow": 148,
      "regularMarketVolume": 861959,
      "regularMarketPreviousClose": 177.17,
      "bid": 122.69,
      "ask": 191.52,
      "bidSize": 2,
      "askSize": 2,
      "market": "us_market",
      "messageBoardId": "finmb_34696",
      "fullExchangeName": "NasdaqGS",
      "longName": "SPS Commerce, Inc.",
      "financialCurrency": "USD",
      "regularMarketOpen": 171.2,
      "averageDailyVolume3Month": 201005,
      "averageDailyVolume10Day": 251570,
      "corporateActions": [],
      "fiftyTwoWeekLowChange": 4.720001,
      "fiftyTwoWeekLowChangePercent": 0.0318919,
      "fiftyTwoWeekRange": "148.0 - 218.61",
      "fiftyTwoWeekHighChange": -65.89,
      "fiftyTwoWeekHighChangePercent": -0.30140433,
      "fiftyTwoWeekChangePercent": -9.671664,
      "earningsTimestamp": 1739221200,
      "earningsTimestampStart": 1745438400,
      "earningsTimestampEnd": 1745870400,
      "earningsCallTimestampStart": 1739223000,
      "earningsCallTimestampEnd": 1739223000,
      "isEarningsDateEstimate": true,
      "trailingAnnualDividendRate": 0,
      "trailingPE": 74.49757,
      "trailingAnnualDividendYield": 0,
      "marketState": "PRE",
      "epsTrailingTwelveMonths": 2.05,
      "epsForward": 3.9,
      "epsCurrentYear": 3.86441,
      "priceEpsCurrentYear": 39.51962,
      "sharesOutstanding": 37946200,
      "bookValue": 22.077,
      "fiftyDayAverage": 188.8244,
      "fiftyDayAverageChange": -36.1044,
      "fiftyDayAverageChangePercent": -0.19120622,
      "twoHundredDayAverage": 190.0799,
      "twoHundredDayAverageChange": -37.359894,
      "twoHundredDayAverageChangePercent": -0.19654837,
      "marketCap": 5795143680,
      "forwardPE": 39.158974,
      "priceToBook": 6.917607,
      "sourceInterval": 15,
      "exchangeDataDelayedBy": 0,
      "exchangeTimezoneName": "America/New_York",
      "exchangeTimezoneShortName": "EST",
      "gmtOffSetMilliseconds": -18000000,
      "esgPopulated": false,
      "tradeable": false,
      "cryptoTradeable": false,
      "exchange": "NMS",
      "fiftyTwoWeekHigh": 218.61,
      "fiftyTwoWeekLow": 148,
      "averageAnalystRating": "1.8 - Buy",
      "shortName": "SPS Commerce, Inc.",
      "hasPrePostMarketData": true,
      "firstTradeDateMilliseconds": 1271943000000,
      "preMarketChangePercent": 1.2244599,
      "regularMarketChangePercent": -13.800303,
      "displayName": "SPS Commerce",
      "symbol": "SPSC"
    },
    {
      "language": "en-US",
      "region": "US",
      "quoteType": "EQUITY",
      "typeDisp": "Equity",
      "quoteSourceName": "Delayed Quote",
      "triggerable": false,
      "customPriceAlertConfidence": "LOW",
      "lastCloseTevEbitLtm": -9.913785,
      "lastClosePriceToNNWCPerShare": -11.301879840518035,
      "currency": "USD",
      "priceHint": 2,
      "preMarketChange": 0.019996643,
      "preMarketTime": 1739354509,
      "preMarketPrice": 32.85,
      "regularMarketChange": -4.95,
      "regularMarketTime": 1739307602,
      "regularMarketPrice": 32.83,
      "regularMarketDayHigh": 37.145,
      "regularMarketDayRange": "32.34 - 37.145",
      "regularMarketDayLow": 32.34,
      "regularMarketVolume": 3264806,
      "regularMarketPreviousClose": 37.78,
      "bid": 0,
      "ask": 0,
      "bidSize": 9,
      "askSize": 9,
      "market": "us_market",
      "messageBoardId": "finmb_318829603",
      "fullExchangeName": "NYSE",
      "longName": "Lemonade, Inc.",
      "financialCurrency": "USD",
      "regularMarketOpen": 36.98,
      "averageDailyVolume3Month": 2401066,
      "averageDailyVolume10Day": 1510940,
      "corporateActions": [],
      "fiftyTwoWeekLowChange": 18.800003,
      "fiftyTwoWeekLowChangePercent": 1.339986,
      "fiftyTwoWeekRange": "14.03 - 53.85",
      "fiftyTwoWeekHighChange": -21.019997,
      "fiftyTwoWeekHighChangePercent": -0.3903435,
      "fiftyTwoWeekChangePercent": 119.906876,
      "earningsTimestamp": 1740517200,
      "earningsTimestampStart": 1740517200,
      "earningsTimestampEnd": 1740517200,
      "earningsCallTimestampStart": 1740574800,
      "earningsCallTimestampEnd": 1740574800,
      "isEarningsDateEstimate": false,
      "trailingAnnualDividendRate": 0,
      "trailingAnnualDividendYield": 0,
      "marketState": "PRE",
      "epsTrailingTwelveMonths": -3.04,
      "epsForward": -2.51,
      "epsCurrentYear": -2.975,
      "priceEpsCurrentYear": -11.0352955,
      "sharesOutstanding": 71404496,
      "bookValue": 8.308,
      "fiftyDayAverage": 38.3938,
      "fiftyDayAverageChange": -5.563797,
      "fiftyDayAverageChangePercent": -0.14491394,
      "twoHundredDayAverage": 24.3567,
      "twoHundredDayAverageChange": 8.473301,
      "twoHundredDayAverageChangePercent": 0.34788376,
      "marketCap": 2344209664,
      "forwardPE": -13.079682,
      "priceToBook": 3.9516134,
      "sourceInterval": 15,
      "exchangeDataDelayedBy": 0,
      "exchangeTimezoneName": "America/New_York",
      "exchangeTimezoneShortName": "EST",
      "gmtOffSetMilliseconds": -18000000,
      "ipoExpectedDate": "2020-07-02T00:00:00.000Z",
      "esgPopulated": false,
      "tradeable": false,
      "cryptoTradeable": false,
      "exchange": "NYQ",
      "fiftyTwoWeekHigh": 53.85,
      "fiftyTwoWeekLow": 14.03,
      "averageAnalystRating": "3.3 - Hold",
      "shortName": "Lemonade, Inc.",
      "hasPrePostMarketData": true,
      "firstTradeDateMilliseconds": 1593696600000,
      "preMarketChangePercent": 0.060909662,
      "regularMarketChangePercent": -13.1022,
      "displayName": "Lemonade",
      "symbol": "LMND"
    },
    {
      "language": "en-US",
      "region": "US",
      "quoteType": "EQUITY",
      "typeDisp": "Equity",
      "quoteSourceName": "Delayed Quote",
      "triggerable": false,
      "customPriceAlertConfidence": "LOW",
      "lastCloseTevEbitLtm": 33.74131,
      "lastClosePriceToNNWCPerShare": -2.9146089313099535,
      "currency": "USD",
      "priceHint": 2,
      "preMarketChange": -0.1000061,
      "preMarketTime": 1739352823,
      "preMarketPrice": 73.06,
      "regularMarketChange": -9.5,
      "regularMarketTime": 1739307602,
      "regularMarketPrice": 73.16,
      "regularMarketDayHigh": 74.77,
      "regularMarketDayRange": "67.55 - 74.77",
      "regularMarketDayLow": 67.55,
      "regularMarketVolume": 19366729,
      "regularMarketPreviousClose": 82.66,
      "bid": 72.99,
      "ask": 74.5,
      "bidSize": 9,
      "askSize": 11,
      "market": "us_market",
      "messageBoardId": "finmb_10081196",
      "fullExchangeName": "NYSE",
      "longName": "Fidelity National Information Services, Inc.",
      "financialCurrency": "USD",
      "regularMarketOpen": 72,
      "averageDailyVolume3Month": 2784147,
      "averageDailyVolume10Day": 2255040,
      "corporateActions": [
        {
          "header": "Dividend",
          "message": "FIS announced a cash dividend of 0.40 with an ex-date of Mar. 11, 2025",
          "meta": {
            "eventType": "DIVIDEND",
            "dateEpochMs": 1741669200000,
            "amount": "0.40"
          }
        }
      ],
      "fiftyTwoWeekLowChange": 11.540005,
      "fiftyTwoWeekLowChangePercent": 0.18727694,
      "fiftyTwoWeekRange": "61.62 - 91.98",
      "fiftyTwoWeekHighChange": -18.82,
      "fiftyTwoWeekHighChangePercent": -0.20460969,
      "fiftyTwoWeekChangePercent": 31.960403,
      "dividendDate": 1742860800,
      "earningsTimestamp": 1739275201,
      "earningsTimestampStart": 1746442740,
      "earningsTimestampEnd": 1746792000,
      "earningsCallTimestampStart": 1739280600,
      "earningsCallTimestampEnd": 1739280600,
      "isEarningsDateEstimate": true,
      "trailingAnnualDividendRate": 0,
      "trailingPE": 51.52113,
      "dividendRate": 1.6,
      "trailingAnnualDividendYield": 0,
      "dividendYield": 1.94,
      "marketState": "PRE",
      "epsTrailingTwelveMonths": 1.42,
      "epsForward": 5.71,
      "epsCurrentYear": 5.72424,
      "priceEpsCurrentYear": 12.780737,
      "sharesOutstanding": 538353984,
      "bookValue": 30.514,
      "fiftyDayAverage": 81.72,
      "fiftyDayAverageChange": -8.559998,
      "fiftyDayAverageChangePercent": -0.10474789,
      "twoHundredDayAverage": 80.4493,
      "twoHundredDayAverageChange": -7.289299,
      "twoHundredDayAverageChangePercent": -0.09060736,
      "marketCap": 39385980928,
      "forwardPE": 12.81261,
      "priceToBook": 2.397588,
      "sourceInterval": 15,
      "exchangeDataDelayedBy": 0,
      "exchangeTimezoneName": "America/New_York",
      "exchangeTimezoneShortName": "EST",
      "gmtOffSetMilliseconds": -18000000,
      "esgPopulated": false,
      "tradeable": false,
      "cryptoTradeable": false,
      "exchange": "NYQ",
      "fiftyTwoWeekHigh": 91.98,
      "fiftyTwoWeekLow": 61.62,
      "averageAnalystRating": "2.3 - Buy",
      "shortName": "Fidelity National Information S",
      "hasPrePostMarketData": true,
      "firstTradeDateMilliseconds": 993043800000,
      "preMarketChangePercent": -0.13669506,
      "regularMarketChangePercent": -11.4929,
      "displayName": "Fidelity National Information Services",
      "symbol": "FIS"
    },
    {
      "language": "en-US",
      "region": "US",
      "quoteType": "EQUITY",
      "typeDisp": "Equity",
      "quoteSourceName": "Nasdaq Real Time Price",
      "triggerable": true,
      "customPriceAlertConfidence": "HIGH",
      "lastCloseTevEbitLtm": 13.698677,
      "lastClosePriceToNNWCPerShare": -36.088548695447486,
      "currency": "USD",
      "priceHint": 2,
      "preMarketChange": 0.14500046,
      "preMarketTime": 1739353261,
      "preMarketPrice": 21.74,
      "regularMarketChange": -2.7650013,
      "regularMarketTime": 1739307602,
      "regularMarketPrice": 21.595,
      "regularMarketDayHigh": 23.17,
      "regularMarketDayRange": "21.59 - 23.17",
      "regularMarketDayLow": 21.59,
      "regularMarketVolume": 5328781,
      "regularMarketPreviousClose": 24.36,
      "bid": 20.62,
      "ask": 23.08,
      "bidSize": 1,
      "askSize": 1,
      "market": "us_market",
      "messageBoardId": "finmb_124219",
      "fullExchangeName": "NasdaqGS",
      "longName": "Amkor Technology, Inc.",
      "financialCurrency": "USD",
      "regularMarketOpen": 22.27,
      "averageDailyVolume3Month": 1269472,
      "averageDailyVolume10Day": 1429010,
      "corporateActions": [],
      "fiftyTwoWeekLowChange": 0.0049991608,
      "fiftyTwoWeekLowChangePercent": 0.00023154983,
      "fiftyTwoWeekRange": "21.59 - 44.86",
      "fiftyTwoWeekHighChange": -23.265001,
      "fiftyTwoWeekHighChangePercent": -0.51861346,
      "fiftyTwoWeekChangePercent": -20.28796,
      "dividendDate": 1734912000,
      "earningsTimestamp": 1739221440,
      "earningsTimestampStart": 1745837940,
      "earningsTimestampEnd": 1746187200,
      "earningsCallTimestampStart": 1739224800,
      "earningsCallTimestampEnd": 1739224800,
      "isEarningsDateEstimate": true,
      "trailingAnnualDividendRate": 0,
      "trailingPE": 15.101398,
      "dividendRate": 0.32,
      "trailingAnnualDividendYield": 0,
      "dividendYield": 1.31,
      "marketState": "PRE",
      "epsTrailingTwelveMonths": 1.43,
      "epsForward": 1.91,
      "epsCurrentYear": 1.45056,
      "priceEpsCurrentYear": 14.887354,
      "sharesOutstanding": 246631008,
      "bookValue": 16.882,
      "fiftyDayAverage": 25.7678,
      "fiftyDayAverageChange": -4.1728,
      "fiftyDayAverageChangePercent": -0.16193855,
      "twoHundredDayAverage": 30.784,
      "twoHundredDayAverageChange": -9.189001,
      "twoHundredDayAverageChangePercent": -0.29849926,
      "marketCap": 5325996544,
      "forwardPE": 11.306283,
      "priceToBook": 1.279173,
      "sourceInterval": 15,
      "exchangeDataDelayedBy": 0,
      "exchangeTimezoneName": "America/New_York",
      "exchangeTimezoneShortName": "EST",
      "gmtOffSetMilliseconds": -18000000,
      "esgPopulated": false,
      "tradeable": false,
      "cryptoTradeable": false,
      "exchange": "NMS",
      "fiftyTwoWeekHigh": 44.86,
      "fiftyTwoWeekLow": 21.59,
      "averageAnalystRating": "2.1 - Buy",
      "shortName": "Amkor Technology, Inc.",
      "hasPrePostMarketData": true,
      "firstTradeDateMilliseconds": 894029400000,
      "preMarketChangePercent": 0.6714539,
      "regularMarketChangePercent": -11.350579,
      "displayName": "Amkor Technology",
      "symbol": "AMKR"
    },
    {
      "language": "en-US",
      "region": "US",
      "quoteType": "EQUITY",
      "typeDisp": "Equity",
      "quoteSourceName": "Nasdaq Real Time Price",
      "triggerable": true,
      "customPriceAlertConfidence": "HIGH",
      "lastCloseTevEbitLtm": -123.865548,
      "lastClosePriceToNNWCPerShare": 27.223296080467666,
      "currency": "USD",
      "priceHint": 2,
      "preMarketChange": 1.7399979,
      "preMarketTime": 1739355274,
      "preMarketPrice": 93.78,
      "regularMarketChange": -11.25,
      "regularMarketTime": 1739307601,
      "regularMarketPrice": 92.04,
      "regularMarketDayHigh": 105.88,
      "regularMarketDayRange": "91.75 - 105.88",
      "regularMarketDayLow": 91.75,
      "regularMarketVolume": 13977198,
      "regularMarketPreviousClose": 103.29,
      "bid": 91.83,
      "ask": 92.3,
      "bidSize": 7,
      "askSize": 6,
      "market": "us_market",
      "messageBoardId": "finmb_558258765",
      "fullExchangeName": "NasdaqGS",
      "longName": "Astera Labs, Inc.",
      "financialCurrency": "USD",
      "regularMarketOpen": 95.97,
      "averageDailyVolume3Month": 4920789,
      "averageDailyVolume10Day": 5856180,
      "corporateActions": [],
      "fiftyTwoWeekLowChange": 55.825,
      "fiftyTwoWeekLowChangePercent": 1.5414883,
      "fiftyTwoWeekRange": "36.215 - 147.39",
      "fiftyTwoWeekHighChange": -55.35,
      "fiftyTwoWeekHighChangePercent": -0.3755343,
      "fiftyTwoWeekChangePercent": 66.5162,
      "earningsTimestamp": 1739221501,
      "earningsTimestampStart": 1739221501,
      "earningsTimestampEnd": 1739221501,
      "earningsCallTimestampStart": 1739223000,
      "earningsCallTimestampEnd": 1739223000,
      "isEarningsDateEstimate": false,
      "trailingAnnualDividendRate": 0,
      "trailingAnnualDividendYield": 0,
      "marketState": "PRE",
      "epsTrailingTwelveMonths": -0.64,
      "epsForward": 1.15,
      "epsCurrentYear": 1.25992,
      "priceEpsCurrentYear": 73.05226,
      "sharesOutstanding": 158611008,
      "bookValue": 5.611,
      "fiftyDayAverage": 119.865,
      "fiftyDayAverageChange": -27.824997,
      "fiftyDayAverageChangePercent": -0.23213613,
      "twoHundredDayAverage": 76.00735,
      "twoHundredDayAverageChange": 16.032654,
      "twoHundredDayAverageChangePercent": 0.21093558,
      "marketCap": 14598557696,
      "forwardPE": 80.03478,
      "priceToBook": 16.403494,
      "sourceInterval": 15,
      "exchangeDataDelayedBy": 0,
      "exchangeTimezoneName": "America/New_York",
      "exchangeTimezoneShortName": "EST",
      "gmtOffSetMilliseconds": -18000000,
      "ipoExpectedDate": "2024-03-20T00:00:00.000Z",
      "esgPopulated": false,
      "tradeable": false,
      "cryptoTradeable": false,
      "exchange": "NMS",
      "fiftyTwoWeekHigh": 147.39,
      "fiftyTwoWeekLow": 36.215,
      "averageAnalystRating": "1.6 - Buy",
      "shortName": "Astera Labs, Inc.",
      "hasPrePostMarketData": true,
      "firstTradeDateMilliseconds": 1710941400000,
      "preMarketChangePercent": 1.89048,
      "regularMarketChangePercent": -10.8916645,
      "displayName": "Astera Labs",
      "symbol": "ALAB"
    }
  ],
  "useRecords": false,
  "predefinedScr": true,
  "versionId": 8,
  "creationDate": 1473801651414,
  "lastUpdated": 1699393574578,
  "isPremium": false,
  "iconUrl": "https://s.yimg.com/cv/apiv2/fin/img/assets/predefined_screeners/trendingDown.png"
}
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/trendingSymbols.ts

## API

```js
await yahooFinance.dailyLosers(queryOptions, moduleOptions);
```

### Query

While testing, the highest count returned was 247.
region does not seem to do anything when changed, always returns US

### Query Options

| Name     | Type   | Default | Description                                                       |
| -------- | ------ | ------- | ----------------------------------------------------------------- |
| `count`  | number | 5       | The max amount of symbols that can be returned.                   |
| `lang`   | string | "en-US" |                                                                   |
| `region` | string |         | The region/country. Will override the search country is provided. |

### Module Options

See [Common Options](../README.md#common-options).
