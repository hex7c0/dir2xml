'use strict';
/**
 * @file json example
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
require('fs').writeFileSync('json.json', JSON.stringify(dir(DIR, {
  json: true,
  exclude: /node_modules/
})));
