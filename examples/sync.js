'use strict';
/**
 * @file sync example
 * @module di2xml
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var dir = require('..'); // use require('di2xml') instead

var DIR = __dirname + '/..';

// index
require('fs').writeFileSync('sync.xml', dir(DIR, {
  sync: true,
  exclude: /node_modules/,
  hash: 'sha1'
}));
