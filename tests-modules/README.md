# tests/modules

This directory contains tests for specific module systems.  Each subdirectory
(`esm`, `cjs`) is a "project" containing it's own `package.json` with options
to ensure the correct yahoo-finance module is loaded.

Tests are run against the appropriate `dist` builds, and *not* against source
files.  To run the relevant tests, use:

`yarn test:esm`
`yarn test:cjs`

or for all tests:

`yarn test:modules`
