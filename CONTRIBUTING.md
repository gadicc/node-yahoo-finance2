# Contributing to yahoo-finance2

## General Guidelines

**editorconfig**

We have an [`.editorconfig.js`](./editorconfig) which specifies our
requirements for indentation, newlines, etc.  If you're not sure, please
check at https://editorconfig.org/ if your editor has built in support
for this format or if you need to download a plugin (e.g. for
[Atom](https://atom.io/packages/editorconfig)).

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

## Specific Guidelines

### Fixing a bug

TODO

### Adding a new module

TODO
