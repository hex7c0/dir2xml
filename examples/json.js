"use strict";
/**
 * @file json example
 * @module di2xml
 * @package di2xml
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var dir = require('../index.min.js'); // use require('di2xml') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var DIR = __dirname + '/..';

// index
require('fs').writeFileSync('json.json', JSON.stringify(dir(DIR, {
    json: true,
    exclude: /node_modules/
})));
