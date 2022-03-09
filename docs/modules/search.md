# search

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'GOO';
const result = await yahooFinance.search(query, /* queryOptions */);

{
  explains: [],
  count: 3,
  quotes: [
    {
      exchange: 'NMS',
      shortname: 'Alphabet Inc.',
      quoteType: 'EQUITY',
      symbol: 'GOOG',
      index: 'quotes',
      score: 597831,
      typeDisp: 'Equity',
      longname: 'Alphabet Inc.',
      isYahooFinance: true
    },
    {
      index: '5167b830a941ed08d275f74473d13e91',
      name: 'Google for Startups',
      permalink: 'google-for-entrepreneurs',
      isYahooFinance: false
    },
    {
      index: '26e6817312a98f234d2fcf80fa1abc1c',
      name: 'Google Cloud Platform',
      permalink: 'google-cloud-platform',
      isYahooFinance: false
    }
  ],
  news: [],
  nav: [],
  lists: [],
  researchReports: [],
  totalTime: 20,
  timeTakenForQuotes: 414,
  timeTakenForNews: 0,
  timeTakenForAlgowatchlist: 400,
  timeTakenForPredefinedScreener: 400,
  timeTakenForCrunchbase: 400,
  timeTakenForNav: 400,
  timeTakenForResearchReports: 0
}
```

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). For an exhausting list of everything we cover and that you might get back, please see the TypeScript interface in https://github.com/gadicc/node-yahoo-finance2/blob/devel/src/modules/search.ts

See also: [autoc](./autoc.md) (auto complete).

## API

```js
await yahooFinance.search(query, queryOptions, moduleOptions);
```

### Query term

Anything you'd put in the search box at the top of https://finance.yahoo.com/.
The text there is "Search for news, symbols, companies".


Useful things we've found include: listing SEDOL.

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `lang`        | string    | "en-US"
| `region`      | string    | "US"
| `quotesCount` | number    | 6          | Max no. of quotes to return
| `newsCount`   | number    | 4          | Max no. of news items to return
| `enableFuzzyQuery`  | boolean | false
| `quotesQueryId`     | string  | "tss_match_phrase_query"
| `multiQuoteQueryId` | string  | "multi_quote_single_token_query"
| `newsQueryId`       | string  | "news_cie_vespa"
| `enableCb`          | boolean | true,
| `enableNavLinks`    | boolean | true,
| `enableEnhancedTrivialQuery` | boolean | true

### Module Options

See [Common Options](../README.md#common-options).
