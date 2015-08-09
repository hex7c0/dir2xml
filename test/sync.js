'use strict';
/**
 * @file sync test
 * @module dir2xml
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var dir = require('..');
var assert = require('assert');

/*
 * test module
 */
describe('sync', function() {

  var cache;

  describe('xml', function() {

    it('should return XML string', function(done) {

      cache = dir(__dirname);
      assert.notDeepEqual(cache, '');
      done();
    });

    it('should return same object', function(done) {

      var c = dir(__dirname);
      assert.deepEqual(cache, c);
      done();
    });
  });

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
