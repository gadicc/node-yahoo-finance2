# insights

## Usage:

```js
import yahooFinance from 'yahoo-finance2';
const queryOptions = { lang: 'en-US', reportsCount: 2, region: 'US' };
const result = await yahooFinance.insights('AYX', queryOptions);
```
Example Result (Arrays are shortened so the docs aren't long):
```js
{
  symbol: 'AMD',
  instrumentInfo: {
    technicalEvents: {
      provider: 'Trading Central',
      sector: 'Technology',
      shortTermOutlook: {
        stateDescription: 'Recent bearish events outweigh bullish events.',
        direction: 'Bearish',
        score: 4,
        scoreDescription: 'Very Strong Bearish Evidence',
        sectorDirection: 'Bearish',
        sectorScore: 3,
        sectorScoreDescription: 'Strong Bearish Evidence',
        indexDirection: 'Bearish',
        indexScore: 1,
        indexScoreDescription: 'Weak Bearish Evidence'
      },
      intermediateTermOutlook: {
        stateDescription: 'Recent bearish events outweigh bullish events.',
        direction: 'Bearish',
        score: 3,
        scoreDescription: 'Strong Bearish Evidence',
        sectorDirection: 'Bearish',
        sectorScore: 3,
        sectorScoreDescription: 'Strong Bearish Evidence',
        indexDirection: 'Bearish',
        indexScore: 2,
        indexScoreDescription: 'Bearish Evidence'
      },
      longTermOutlook: {
        stateDescription: 'All events are bearish.',
        direction: 'Bearish',
        score: 3,
        scoreDescription: 'Strong Bearish Evidence',
        sectorDirection: 'Neutral',
        sectorScore: 0,
        sectorScoreDescription: 'No Evidence',
        indexDirection: 'Bullish',
        indexScore: 1,
        indexScoreDescription: 'Weak Bullish Evidence'
      }
    },
    keyTechnicals: {
      provider: 'Trading Central',
      support: 78.69,
      resistance: 79.3221,
      stopLoss: 72.206776
    },
    valuation: {
      color: 0.5,
      description: 'Near Fair Value',
      discount: '8%',
      provider: 'Trading Central'
    }
  },
  companySnapshot: {
    sectorInfo: 'Technology',
    company: {
      innovativeness: 0.7504000000000001,
      hiring: 0.8876999999999999,
      insiderSentiments: 0.19949999999999998,
      earningsReports: 0.8223
    },
    sector: {
      innovativeness: 0.5,
      hiring: 0.5,
      sustainability: 0.5,
      insiderSentiments: 0.5,
      earningsReports: 0.5,
      dividends: 0.5
    }
  },
  recommendation: { targetPrice: 106, provider: 'Argus Research', rating: 'BUY' },
  events: [
    {
      eventType: 'Short-term KST',
      pricePeriod: 'D',
      tradingHorizon: 'S',
      tradeType: 'S',
      imageUrl: 'https://s.yimg.com/uc/fin/img/assets/generic.svg',
      startDate: new Date('2021-05-06T13:30:00.000Z'),
      endDate: new Date('2021-05-06T13:30:00.000Z')
    }
  ],
  reports: [
    {
      id: 'MS_0P0000006A_AnalystReport_1619733948000',
      headHtml: 'Analyst Report: Advanced Micro Devices, Inc.',
      provider: 'Morningstar',
      reportDate: '2021-04-29T22:05:48Z',
      reportTitle: "Advanced Micro Devices designs microprocessors for the computer and consumer electronics industries. The majority of the firm's sales are in the personal computer and data center markets via CPUs and GPUs. Additionally, the firm supplies the chips found in prominent game consoles such as the Sony PlayStation and Microsoft Xbox. AMD acquired graphics processor and chipset maker ATI in 2006 in an effort to improve its positioning in the PC food chain. In 2009, the firm 
spun out its manufacturing operations to form the foundry GlobalFoundries. In 2020, the firm agreed to acquire FPGA-leader 
Xilinx to diversify its business and augment its opportunities in key end markets such as the data center.",
      reportType: 'Analyst Report'
    },
    {
      id: 'ARGUS_29751_ThematicPortfolio_1619622483000',
      headHtml: 'The Argus ESG Model Portfolio',
      provider: 'Argus Research',
      reportDate: '2021-04-28T15:08:03Z',
      reportTitle: `Sustainable Impact Investing is gaining traction with the global investment community. In January 2020, BlackRock CEO Lawrence Fink, who oversees approximately $9 trillion in assets, announced that his firm would be investing 
in companies that are making progress on sustainability. He doubled down in his January 2021 letter, calling on company managements to disclose their plans for making their businesses "compatible with a net-zero economy" by 2050. As assets have flowed in over the past 40 years, Sustainable Impact Investing has evolved. The discipline, originally known as Socially Responsible Investing, focused at first on excluding companies that conducted business in South Africa, or participated in industries such as tobacco, alcohol, and firearms. But the performance of these initial strategies lagged, and the approach has been modified. Now, instead of merely identifying industries to avoid, the discipline promotes "sustainable" business practices across all industries that can have an "impact" on global issues such as the climate, hunger, poverty, disease, shelter, and workers' rights.`,
      reportType: 'Thematic Portfolio'
    }
  ],
  sigDevs: [
    {
      headline: 'AMD Reports Q1 EPS $0.45',
      date: new Date('2021-04-27T00:00:00.000Z')
    }
  ]
}
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/insights.ts

## API

```js
await yahooFinance.insights(query, queryOptions, moduleOptions);
```

### Query Options

| Name        | Type   | Default | Description                                                       |
| ----------- | ------ | ------- | ----------------------------------------------------------------- |
| `reportsCount` | number | 5       | The max amount of reports that can be returned.                   |
| `lang`      | string | "en-US" |                                                                   |
| `region`    | string | "US"    |                                                                   |

### Module Options

See [Common Options](../README.md#common-options).