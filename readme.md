# json-test-suite

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/json-test-suite.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/json-test-suite
[license_badge]: https://img.shields.io/npm/l/json-test-suite.svg?style=flat-square
[license_link]: https://github.com/fisker/json-test-suite/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/json-test-suite.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/json-test-suite

> JSON Parsing Test Suite.

[JSONTestSuite](https://github.com/nst/JSONTestSuite) data in JavaScript.

## Install

```bash
yarn add json-test-suite
```

## Usage

```js
import {parsing, transform} from 'json-test-suite'

console.log(parsing)
// =>
// [
//   {
//     name: 'i_number_double_huge_neg_exp.json',
//     input: '[123.456e-789]'
//   },
//   ...,
// ]

console.log(transform)
// =>
// [
//   {
//     name: 'number_-9223372036854775808.json',
//     input: '[-9223372036854775808]\n'
//   },
//   ...,
// ]
```

## Acknowledgments

Special thanks to [@utkarshkukreti](https://github.com/utkarshkukreti) for graciously transferring the `json-test-suite` name.
