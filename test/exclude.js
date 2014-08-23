"use strict";
/**
 * @file exclude test
 * @module dir2xml
 * @package dir2xml
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var dir = require('../index.min.js'); // use require('dir2xml') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('exclude', function() {

    it('should return empty "__dirname" dir', function(done) {

        var xml = dir(__dirname, {
            exclude: /.js$/,
            cache: false
        });

        if (/<?xml version=\"1.0\" encoding=\"UTF-8\"\?><home><\/home>/
                .test(xml)) {
            done();
        }
        return;
    });
});
