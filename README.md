# [dir2xml](http://supergiovane.tk/#/dir2xml)

[![NPM version](https://badge.fury.io/js/dir2xml.svg)](http://badge.fury.io/js/dir2xml)
[![Build Status](https://travis-ci.org/hex7c0/dir2xml.svg)](https://travis-ci.org/hex7c0/dir2xml)
[![Dependency Status](https://david-dm.org/hex7c0/dir2xml/status.svg)](https://david-dm.org/hex7c0/dir2xml)

Generating XML file or JSON object that represents a directory structure, with memorization and others customization

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

### dir(root,[options])

#### root

 - `root`- **String** Directory path *(default "required")*

#### [options]

 - `exclude` - **RegExp** Regular expression for files/dirs exclude *(default "disabled")*
 - `dotfiles`- **Boolean** Flag for hide dotfiles *(default "enabled")*
 - `cache` - **Boolean** Flag for using cache (depends from mtime dir) *(default "enabled")*
 - `sync` - **Boolean** Flag for using "Sync" methods instead of callback only *(default "disabled")*
 - `json` - **Boolean** Flag for display json output instead of html only *(default "disabled")*
 - `hash` - **String | false** Set your [hashes](http://nodejs.org/api/crypto.html#crypto_crypto_gethashes) or disable *(default "md5")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/dir2xml/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)
