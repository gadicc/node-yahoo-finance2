## [1.7.2](https://github.com/gadicc/node-yahoo-finance2/compare/v1.7.1...v1.7.2) (2021-02-17)


### Bug Fixes

* **browser:** mv fetchDevel to _env, fixes issues w/ `ng build` ([#50](https://github.com/gadicc/node-yahoo-finance2/issues/50)) ([7528580](https://github.com/gadicc/node-yahoo-finance2/commit/75285807114062ea96ba2c74ddf0df01bee393cd))
* **quote:** add additional properties ([4ab73c1](https://github.com/gadicc/node-yahoo-finance2/commit/4ab73c16a27c0d034a539cb1451e5110f3915fd2))
* **quote:** make certain properties optional ([1881bcb](https://github.com/gadicc/node-yahoo-finance2/commit/1881bcbdde4b4229585a00e2eecdbf317314e335))
* **quote:** more optional properties ([#51](https://github.com/gadicc/node-yahoo-finance2/issues/51)) ([631ed45](https://github.com/gadicc/node-yahoo-finance2/commit/631ed459125cbe2ae2381f16adef2e513f4887e6))
* **quoteSummary:** more optionality, enum types, to fix tests ([#51](https://github.com/gadicc/node-yahoo-finance2/issues/51)) ([bc47bdf](https://github.com/gadicc/node-yahoo-finance2/commit/bc47bdfd781a7f7d4013c01848820ec929ccaeae))
* **types:** more optionality in quoteSummary,search for newer stocks ([b230635](https://github.com/gadicc/node-yahoo-finance2/commit/b230635e15dd3801761dc9211989cbf01c8e98e0))
* **validate:** stricter nulls, number|null type, better errors ([#51](https://github.com/gadicc/node-yahoo-finance2/issues/51)) ([93dafc6](https://github.com/gadicc/node-yahoo-finance2/commit/93dafc63c1a2ee3dbec423513a89376348915ccd))
* QuoteSummary & Search validation ([28f0487](https://github.com/gadicc/node-yahoo-finance2/commit/28f04871a1140d0a337bb777454afdb8467c67fd))

## [1.7.1](https://github.com/gadicc/node-yahoo-finance2/compare/v1.7.0...v1.7.1) (2021-02-12)


### Bug Fixes

* **search:** ETF/Fund types, ?shortname, more tests ([#31](https://github.com/gadicc/node-yahoo-finance2/issues/31)) ([28a9b03](https://github.com/gadicc/node-yahoo-finance2/commit/28a9b03ff62c0305ec2b28b8945088050a1ed84c))

# [1.7.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.6.0...v1.7.0) (2021-02-10)


### Bug Fixes

* **index:** uhhhh s/_options/_opts/ like it's called everywhere else ([4492993](https://github.com/gadicc/node-yahoo-finance2/commit/44929939aed693c95b65f2e266014692695ad76d))
* **moduleExec:** pass correct object to validation ([#27](https://github.com/gadicc/node-yahoo-finance2/issues/27)) ([8b0f9c7](https://github.com/gadicc/node-yahoo-finance2/commit/8b0f9c7a109cbcb2a30943ccb43f04653238380c))
* **modules:** change overloading order specificy (fixes [#21](https://github.com/gadicc/node-yahoo-finance2/issues/21)) ([1806e61](https://github.com/gadicc/node-yahoo-finance2/commit/1806e61940f30ceaf53f6af50dbd7230df511759))
* **quote:** extend marketState property ([0c36a60](https://github.com/gadicc/node-yahoo-finance2/commit/0c36a60362e180045b867277d2126800e22d3035))
* **quote:** interface fixes, 10am UTC tests ([#35](https://github.com/gadicc/node-yahoo-finance2/issues/35)) ([1c256c7](https://github.com/gadicc/node-yahoo-finance2/commit/1c256c7d67ca2b4d4728c8044a095e047c118914))


### Features

* new module recommendationsBySymbol ([#28](https://github.com/gadicc/node-yahoo-finance2/issues/28)) ([b467acb](https://github.com/gadicc/node-yahoo-finance2/commit/b467acb9bdca7c12ee23c9949985c6e703e064d1))

# [1.6.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.5.2...v1.6.0) (2021-02-08)


### Features

* **quote:** add quote module ([e0f8d35](https://github.com/gadicc/node-yahoo-finance2/commit/e0f8d35f857826d394c6e3e811fc054e53540533))

## [1.5.2](https://github.com/gadicc/node-yahoo-finance2/compare/v1.5.1...v1.5.2) (2021-02-06)


### Bug Fixes

* **modules:** don't log errors when {validateResult:false} ([#16](https://github.com/gadicc/node-yahoo-finance2/issues/16)) ([29f23dc](https://github.com/gadicc/node-yahoo-finance2/commit/29f23dcf64d6b72a7d1d96c6baf8b70ff5f1c5bf))

## [1.5.1](https://github.com/gadicc/node-yahoo-finance2/compare/v1.5.0...v1.5.1) (2021-02-06)


### Bug Fixes

* **quoteSummary/iface:** additional fixes for mutual fund types ([#20](https://github.com/gadicc/node-yahoo-finance2/issues/20)) ([4d19692](https://github.com/gadicc/node-yahoo-finance2/commit/4d19692dc80cca136eb97c88602a9f759b692195))
* **quoteSummary/iface:** more optional fields, new Fund types ([#20](https://github.com/gadicc/node-yahoo-finance2/issues/20)) ([15bb4a1](https://github.com/gadicc/node-yahoo-finance2/commit/15bb4a109d96890ce9862bbeccb688689667478c))
* **validate:** init ajv with { allErrors: true } ([9793718](https://github.com/gadicc/node-yahoo-finance2/commit/979371892967d2d61f9533f4fc4f37748b667110))

# [1.5.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.4.2...v1.5.0) (2021-02-05)


### Bug Fixes

* **search:** change longname to be an optional property ([9b8128d](https://github.com/gadicc/node-yahoo-finance2/commit/9b8128d1abc33b1487264826454913f15fc90b3c))
* **validate:** honor _opts: { validation: { logErrors: true }} ([1e0ebae](https://github.com/gadicc/node-yahoo-finance2/commit/1e0ebae2b516e15242ef592c814519e9a75bdf06))
* **validate:** show errors by default ([ab87ad3](https://github.com/gadicc/node-yahoo-finance2/commit/ab87ad30dc4594b256940aebbe074baa8c4c55a8))


### Features

* **modules:** allow { validateResult: false } to not throw ([#16](https://github.com/gadicc/node-yahoo-finance2/issues/16)) ([dc199b5](https://github.com/gadicc/node-yahoo-finance2/commit/dc199b50d46dae26222ccf75bc5efa2c8eff7dcc))

## [1.4.2](https://github.com/gadicc/node-yahoo-finance2/compare/v1.4.1...v1.4.2) (2021-02-04)


### Bug Fixes

* **csv2json:** throw on invalid input.  add tests ([9a4d31a](https://github.com/gadicc/node-yahoo-finance2/commit/9a4d31ad7849b485e88b20a73e6436bdd30d67d8))
* **readme:** show correct usage instructions (and update on npm) ([03afec8](https://github.com/gadicc/node-yahoo-finance2/commit/03afec81e617a744186451801d72124ac74e10b8))

## [1.4.1](https://github.com/gadicc/node-yahoo-finance2/compare/v1.4.0...v1.4.1) (2021-02-03)


### Bug Fixes

* **quoteSummary:** iface fixes, TopHoldings ([904934a](https://github.com/gadicc/node-yahoo-finance2/commit/904934acfe05c21424daad21da93ab2141214de6))
* **quoteSummary:** more optional props, more tests ([3fa958c](https://github.com/gadicc/node-yahoo-finance2/commit/3fa958c255bb374b71915a063b4f3d783fb39a50))
* **quoteSummary:** remove non-existant "symbol" submodule ([eae40e2](https://github.com/gadicc/node-yahoo-finance2/commit/eae40e2c2a98c7bd17d431474bf70d9da5fdd94b))
* **quoteSummary/assetProfile:** make *Risk fields optional ([08561c7](https://github.com/gadicc/node-yahoo-finance2/commit/08561c749f732757794447a543b6385ba9666f9b))
* **search:** add SearchQuoteYahooOption type ([cf8dbdb](https://github.com/gadicc/node-yahoo-finance2/commit/cf8dbdb5cc86e7567ad89f5443374609d23f356e))
* **search:** restore default query options ([e0169d1](https://github.com/gadicc/node-yahoo-finance2/commit/e0169d138724bf960623dc7491401ffbc2e679be))
* **validate:** edge case, Date object w/ invalid raw field; add tests ([a98d306](https://github.com/gadicc/node-yahoo-finance2/commit/a98d30694dc4a7022cf57d409cd7d5c4b34295a2))
* **validate:** use new ajv.addKeyword syntax ([f00a14e](https://github.com/gadicc/node-yahoo-finance2/commit/f00a14e86145dcd489fe393a60fa63f8d517d72c))

# [1.4.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.3.1...v1.4.0) (2021-02-02)


### Features

* **env:** multiple environments, browser entry point ([e18aa67](https://github.com/gadicc/node-yahoo-finance2/commit/e18aa67278ae613e8c7ecd93aedb5abcaeda2592))

## [1.3.1](https://github.com/gadicc/node-yahoo-finance2/compare/v1.3.0...v1.3.1) (2021-02-01)


### Bug Fixes

* **quoteSummary:** rename conflicting typedefs ([f824f88](https://github.com/gadicc/node-yahoo-finance2/commit/f824f886ffc5d507f57f3e2fdd8da4d485f20b7a))

# [1.3.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.2.0...v1.3.0) (2021-02-01)


### Bug Fixes

* **index:** default export ([ae50993](https://github.com/gadicc/node-yahoo-finance2/commit/ae5099310c6685cdce73780c76516f53d92e3740))
* **quoteSummary:** s/EndDate/DateObj, and have DateObj json -> Date ([#7](https://github.com/gadicc/node-yahoo-finance2/issues/7)) ([d5f834f](https://github.com/gadicc/node-yahoo-finance2/commit/d5f834f8c2fe242106416fd167a86d7cab13b9e1))
* **quoteSummary:** schema updates and transform fixes ([0930f33](https://github.com/gadicc/node-yahoo-finance2/commit/0930f3307ab4487a9ec8680eb1a945f7f94afb21))


### Features

* **quoteSummary:** all submodules, using validation type coercion ([3970132](https://github.com/gadicc/node-yahoo-finance2/commit/39701320e4606fe2549138a5f661c57c04b5529e))
* **quoteSummary/assetProfile:** complete ([#7](https://github.com/gadicc/node-yahoo-finance2/issues/7)) ([e95dbc8](https://github.com/gadicc/node-yahoo-finance2/commit/e95dbc8c28b731818b347e570054e0a28fa3ae7e))

# [1.2.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.1.1...v1.2.0) (2021-01-30)


### Bug Fixes

* **errors:** tsc needs static errors ([d2c734e](https://github.com/gadicc/node-yahoo-finance2/commit/d2c734e2aa12929b1d99638850d6cace84d0fb66))
* **fetch:** s/throw new error/throw error/ ([084990d](https://github.com/gadicc/node-yahoo-finance2/commit/084990d447b930ac66d6e6c797ae5032aedf4c71))


### Features

* **modules:** better runtime option checking ([dffa79a](https://github.com/gadicc/node-yahoo-finance2/commit/dffa79abac9493d59067a76d4cfb99ae6293ea68))

## [1.1.1](https://github.com/gadicc/node-yahoo-finance2/compare/v1.1.0...v1.1.1) (2021-01-29)


### Bug Fixes

* **package:** generateSchema -> yarn generateSchema ([896b2cd](https://github.com/gadicc/node-yahoo-finance2/commit/896b2cdbd241580ec17fbe6db8b9c4e011a2ddc0))

# [1.1.0](https://github.com/gadicc/node-yahoo-finance2/compare/v1.0.3...v1.1.0) (2021-01-29)


### Bug Fixes

* **autoc/search:** do typescript arrays properly, nonYahooQuotes ([28a2fd2](https://github.com/gadicc/node-yahoo-finance2/commit/28a2fd290e8a095e0ff5c844a7f10ea3c4512171))
* **fetch:** prefer JSON errors where possible ([2b14f15](https://github.com/gadicc/node-yahoo-finance2/commit/2b14f153a5ba468e8d727a2a3d7a73264c316a40))
* **historical:** add missing 'high', improve types ([91be9dc](https://github.com/gadicc/node-yahoo-finance2/commit/91be9dc8c1dd41ca1839b277c32837fe2ee793e7))
* **index:** revert back to non-class re-export approach ([3954244](https://github.com/gadicc/node-yahoo-finance2/commit/3954244badf775646a590f53070c53142abcbc3e))
* **search:** transform dates ([52b585c](https://github.com/gadicc/node-yahoo-finance2/commit/52b585c50eabb064ac248e57629f7a7f8352e1da))


### Features

* **bin:** use console.dir with colors on tty, JSON otherwise ([6db79e5](https://github.com/gadicc/node-yahoo-finance2/commit/6db79e580e4717374ca4b17bf1e29e10c7436053))
* **historical:** module and supporting csv code ([5b6eac4](https://github.com/gadicc/node-yahoo-finance2/commit/5b6eac4ef5103b12a30041426d2c0ec46f5b8651))
* **quoteSummary:** more work.  package: add dot-prop ([edc1554](https://github.com/gadicc/node-yahoo-finance2/commit/edc1554145af670e1ec7691089f01a66a883cdd7))

## [1.0.3](https://github.com/gadicc/node-yahoo-finance2/compare/v1.0.2...v1.0.3) (2021-01-24)


### Bug Fixes

* **package:** prepublish, typescript defs, exports; mv index; ([8a40888](https://github.com/gadicc/node-yahoo-finance2/commit/8a40888abebb20e792644d88455db46e03355505))

## [1.0.2](https://github.com/gadicc/node-yahoo-finance2/compare/v1.0.1...v1.0.2) (2021-01-24)


### Bug Fixes

* **semantic:** create changelog? ([fb5f6c9](https://github.com/gadicc/node-yahoo-finance2/commit/fb5f6c92207729622606d314876797e1b9082b91))
