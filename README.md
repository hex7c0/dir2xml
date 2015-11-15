# [dir2xml](https://github.com/hex7c0/dir2xml)

[![NPM version](https://img.shields.io/npm/v/dir2xml.svg)](https://www.npmjs.com/package/dir2xml)
[![Linux Status](https://img.shields.io/travis/hex7c0/dir2xml.svg?label=linux)](https://travis-ci.org/hex7c0/dir2xml)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/dir2xml.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/dir2xml)
[![Dependency Status](https://img.shields.io/david/hex7c0/dir2xml.svg)](https://david-dm.org/hex7c0/dir2xml)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/dir2xml.svg)](https://coveralls.io/r/hex7c0/dir2xml)

Generating XML file or JSON object that represents a sync directory structure, with memoization and others customizations

my original [python code](https://github.com/hex7c0/Dir2Xmlpy)

## Installation

Install through NPM

```bash
npm install dir2xml
```
or
```bash
git clone git://github.com/hex7c0/dir2xml.git
```

## API

inside nodejs project
```js
var dir = require('dir2xml');

dir('node_modules');
```

### dir(root [, options])

#### root

 - `root`- **String** Directory path *(default "required")*

#### [options]

 - `exclude` - **RegExp** Regular expression for files/dirs exclude *(default "disabled")*
 - `dotfiles`- **Boolean** Flag for hide dotfiles *(default "enabled")*
 - `cache` - **Boolean** Flag for using cache (depends from mtime dir) *(default "enabled")*
 - `json` - **Boolean** Flag for display json object instead of xml string *(default "disabled")*
 - `hash` - **String | false** Set your [hashes](http://nodejs.org/api/crypto.html#crypto_crypto_gethashes) or disable *(default "md5")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
