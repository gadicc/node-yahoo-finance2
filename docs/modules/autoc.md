# autoc (auto complete)

## Usage:

```js
import yahooFinance from 'yahoo-finance2';

const query = 'GOO';
const result = await yahooFinance.autoc(query, /* queryOptions */);

{
  Query: 'GOO',
  Result: [
    {
      symbol: 'GDRX',
      name: 'GoodRx Holdings, Inc.',
      exch: 'NMS',
      type: 'S',
      exchDisp: 'NASDAQ',
      typeDisp: 'Equity'
    },
    {
      symbol: 'GOOG',
      name: 'Alphabet Inc.',
      exch: 'NMS',
      type: 'S',
      exchDisp: 'NASDAQ',
      typeDisp: 'Equity'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      exch: 'NAS',
      type: 'S',
      exchDisp: 'NASDAQ',
      typeDisp: 'Equity'
    },
    // ....
}
```

See also: [search](./search.md).

## API

```js
await yahooFinance.autoc(query, queryOptions, fetchOptions);
```

### Query term

Symbol, company name, SEDOL, etc.

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `region`      | number    | 1          |                                   |
| `lang`        | string    | "en"       |                                   |
