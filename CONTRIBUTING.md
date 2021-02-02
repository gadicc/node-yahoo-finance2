# Contributing to yahoo-finance2

## Development Guidelines

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
