# Contributing to yahoo-finance2

1. [Local Development](#local-dev)
1. General Guidelines
    1. [Editing](#editing)
    1. [Code](#code)
1. Testing
    1. [Devel Mode](#devel-mode)
1. Specific Guidelines
    1. [Fixing a bug](#fix-bug)
    1. [Adding a module](#new-module)

<a name="local-dev"></a>
## Local Development

The following instructions will help you run the latest development release
locally.  If you plan to make changes to the code and submit them back to us
(in pull requests), please first FORK our repo and clone YOUR FORK instead
of the URL used below.

1. Install [git](https://git-scm.com/) if you haven't already.
1. Change to the directory where you want to keep these files.
1. `git clone https://github.com/gadicc/node-yahoo-finance2.git`
1. `cd node-yahoo-finance2`
1. `yarn tsc`
1. `yarn link`

And now, in any of your own projects where you use `node-yahoo-finance2`:

  `yarn link yahoo-finance2`

Now your project will use the latest development version instead of the version
on npm.  You can revert this for your project by typing:

  `yarn unlink yahoo-finance2`.

To update your local development copy at any time:

1. `cd node-yahoo-finance2`
1. `git pull`
1. `yarn tsc`

## General Guidelines

<a name="editing"></a>
## Editing

**editorconfig**

We have an [`.editorconfig`](./editorconfig) which specifies our
requirements for indentation, newlines, etc.  If you're not sure, please
check at https://editorconfig.org/ if your editor has built in support
for this format or if you need to download a plugin (e.g. for
[Atom](https://atom.io/packages/editorconfig)).  Alternatively, just read
[.editorconfig](./editorconfig) and keep to this on your own.

**prettier**

We use [prettior](https://prettier.io/) to save time and energy otherwise
wasted on styling and discussion thereof.  See their section on
[editor integrations](https://prettier.io/docs/en/editors.html)
if you haven't before - we suggest the configuration options to "run
prettier on save", but "only if a prettierrc exists in the project".
Alternatively, just run `yarn prettier --write .` before committing your
work and submitting your PR.

<a name="">code</a>
## Code

**Default branch: devel**

All PRs should be submitted against the `devel` branch (github default).

**Changing TypeScript Interfaces**

Run `yarn generateSchema` after changing any interfaces, this will regenerate
the `schema.json` file which is used for run-time tests.

**Commit Messages**

Commit messages should follow the
[conventionalcommits](https://www.conventionalcommits.org/) standard
(basically Angular).  This is important as we use
[semantic-release](https://github.com/semantic-release/semantic-release)
to automate releases and [CHANGELOG](./CHANGELOG.md) entries when we merge
back to master.

## Testing

<a name="devel-mode"></a>
### Devel Mode

In "devel" mode, any URL will only be fetched *once* and cached in memory
and on the disk.  All future requests (for the rest of time) will return the
cached result. This is very helpful to speed up development and is used
extensively for our tests.

```js
await search('AAPL', {}, { devel: true });                // uses sha1 from URL
await search('AAPL', {}, { devel: 'search-AAPL.json' });  // fixed filename
```

Note: `require('yahooFinanceFetchDevel')` is called conditionally when
`devel: true`.  It also uses packages from `devDependencies`.  As such,
deployment to production is not supported.

Note: Even with fixed filename, URLs are verified and fetchDevel will
throw if they don't match.  If you're returning a fake result, name
your file `.fake.json`.

Occasionally we want to skip caching and only return live results, e.g.
to check if our validation pasts at different times of the day (when
different markets are open):

```bash
$ FETCH_DEVEL="nocache" yarn test
```

**NOTE:** Setting the `devel` option to true will not work in the browser, as
it requires a filesystem and some modules only available in node.

## Specific Guidelines

<a name="fix-bug"></a>
### Fixing a bug

It's greatly appreciated when bug fix include a test that fails without
your fix and passes with it :pray:

TODO

### Adding a new module

Checklist:

1. Create it in `src/modules/myAmazingModule.ts`
1. Run `yarn generateSchema` (and on any future interface changes)
1. Test it in `src/modules/myAmazingModule.spec.ts`
1. Add it to `src/index-common.ts`
1. Docs in `docs/modules/myAmazingModule.md`
1. Link these docs in `README.md` and `docs/README.md`.
1. Commit all the above and any `tests/http/*` created in your tests.

For a model example, see the
[recommendationsBySymbol PR](https://github.com/gadicc/node-yahoo-finance2/pull/28)
by [@pudgereyem](https://github.com/pudgereyem).  However, always base your work
on the most current code.

Things to be aware of:

1. Some Yahoo results vary by time, e.g. when particular markets are open,
closed, in pre-trading etc.  It may help to run your validation tests with
`FETCH_DEVEL=nocache` (see [Devel Mode](#devel-mode), above) at different
times of the day to make sure you've covered all cases.  If you find something
that doesn't pass, please add another permanent/cached test for it in the
spec file.

<a name="new-module"></a>
TODO
