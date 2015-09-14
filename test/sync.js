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

  describe('cache', function() {

    var cache;

    describe('xml', function() {

      describe('no cache ', function() {

        it('should return XML string', function(done) {

          cache = dir(__dirname, {
            cache: false
          });
          assert.notDeepEqual(cache, '');
          done();
        });
        it('should return same object', function(done) {

          var c = dir(__dirname, {
            cache: false
          });
          assert.deepEqual(cache, c);
          done();
        });
      });

      it('should return XML string', function(done) {

        cache = dir(__dirname, {
          cache: true
        });
        assert.notDeepEqual(cache, '');
        done();
      });
      it('should return same object', function(done) {

        var c = dir(__dirname, {
          cache: true
        });
        assert.deepEqual(cache, c);
        done();
      });
    });

    describe('json', function() {

      describe('no cache', function() {

        it('should return JSON object', function(done) {

          cache = dir(__dirname, {
            json: true,
            cache: false
          });
          assert.deepEqual(cache[__dirname][0]['name'], 'exclude.js');
          assert.deepEqual(cache[__dirname][1]['name'], 'sync.js');
          done();
        });
        it('should return same object', function(done) {

          var c = dir(__dirname, {
            json: true,
            cache: false
          });
          assert.deepEqual(cache, c);
          done();
        });
      });

      it('should return JSON object', function(done) {

        cache = dir(__dirname, {
          json: true,
          cache: true
        });
        assert.deepEqual(cache[__dirname][0]['name'], 'exclude.js');
        assert.deepEqual(cache[__dirname][1]['name'], 'sync.js');
        done();
      });
      it('should return same object', function(done) {

        var c = dir(__dirname, {
          json: true,
          cache: true
        });
        assert.deepEqual(cache, c);
        done();
      });
    });
  });

  describe('hash', function() {

    var fs = require('fs');
    var ff = fs.readFileSync(__filename);
    var crypto = require('crypto').createHash;
    var md5Hash = crypto('md5');
    var shaHash = crypto('sha512');

    md5Hash.update(ff);
    md5Hash = md5Hash.digest('hex');
    shaHash.update(ff);
    shaHash = shaHash.digest('hex');

    var md5;

    describe('xml', function() {

      it('should build XML with "md5" (default) hash', function(done) {

        var xml = dir(__dirname);
        assert.notDeepEqual(xml, '');
        assert.notEqual(xml.search(md5Hash), -1);
        assert.equal(xml.search(shaHash), -1);
        done();
      });
      it('should build XML with "sha512" hash', function(done) {

        var xml = dir(__dirname, {
          hash: 'sha512'
        });
        assert.notDeepEqual(xml, '');
        assert.notEqual(xml.search(shaHash), -1);
        assert.equal(xml.search(md5Hash), -1);
        done();
      });
      it('shouldn\'t build XML with "foobar" hash', function(done) {

        assert.throws(function() {

          var xml = dir(__dirname, {
            hash: 'foobar'
          });
        },
          function(err) {

            if ((err instanceof Error)
              && /Digest method not supported/.test(err)) {
              return true;
            }
          }, "wrong hash");
        done();
      });
    });

    describe('json', function() {

      it('should build JSON with "md5" (default) hash', function(done) {

        var xml = dir(__dirname, {
          json: true
        });
        assert.notDeepEqual(xml, '');
        assert.equal(xml[__dirname][1]['name'], 'sync.js');
        assert.equal(xml[__dirname][1]['hash'].length, 32);
        assert.equal(xml[__dirname][1]['hash'], md5Hash);
        assert.notEqual(xml[__dirname][1]['hash'], shaHash);
        md5 = xml[__dirname][1]['hash'];
        done();
      });
      it('should build JSON with "sha512" hash', function(done) {

        var xml = dir(__dirname, {
          json: true,
          hash: 'sha512'
        });
        assert.notDeepEqual(xml, '');
        assert.equal(xml[__dirname][1]['name'], 'sync.js');
        assert.equal(xml[__dirname][1]['hash'].length, 128);
        assert.equal(xml[__dirname][1]['hash'], shaHash);
        assert.notEqual(xml[__dirname][1]['hash'], md5Hash);
        assert.notDeepEqual(xml[__dirname][1]['hash'], md5);
        done();
      });
      it('shouldn\'t build SJON with "foobar" hash', function(done) {

        assert.throws(function() {

          var xml = dir(__dirname, {
            json: true,
            hash: 'foobar'
          });
        },
          function(err) {

            if ((err instanceof Error)
              && /Digest method not supported/.test(err)) {
              return true;
            }
          }, "wrong hash");
        done();
      });
    });
  });
});
