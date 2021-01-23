# node-yahoo-finance2

Community API for Yahoo-Finance

Copyright (c) 2021 by Gadi Cohen <dragon@wastelands.net>.  MIT licensed.

## Unofficial API

This project is neither created nor endorsed by Yahoo Inc.  Yahoo does not
provide any official API to developers, nor makes any guarantees regarding
service availability or API consistency.  In practice however, the open
source community has kept this project (and it's predecessor) working well
since 2013.

Nevertheless, we make no guarantees and you use this package at your own risk.
The developers (and obviously Yahoo) cannot be held responsible for any losses
you may incur as a result of using this service.  Use of this package is
considered acknowledgement and acceptance of these terms and of it's license.

## Quickstart

The library can be imported into your project or used directly as a CLI.

**Importing**

```js
// Import the entire library or the specific module you need
import { search } from 'yahoo-finance2';
import search from 'yahoo-finance2/api/search';

const results = await search('AAPL');
```

**CLI** (Command line interface)

```bash
$ npm install -g yahoo-finance2
$ yahoo-finance search AAPL
$ yahoo-finance search AAPL { }
```

For the full list of modules, see the [Documentation](./docs/docs.md).
