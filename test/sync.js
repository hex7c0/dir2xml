'use strict';
/**
 * @file sync test
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
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('sync', function() {

    var cache;
    describe('json', function() {

        it('should return JSON object', function(done) {

            cache = dir(__dirname, {
                json: true
            });
            assert.deepEqual(cache[__dirname][0]['name'], 'exclude.js');
            assert.deepEqual(cache[__dirname][1]['name'], 'sync.js');
            done();
        });

        it('should return same object', function(done) {

            var c = dir(__dirname, {
                json: true
            });
            assert.deepEqual(cache, c);
            done();
        });
    });

});
