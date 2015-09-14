'use strict';
/**
 * @file exclude test
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
describe(
  'exclude',
  function() {

    describe(
      'xml',
      function() {

        describe(
          'cache',
          function() {

            it('should return empty "__dirname" dir', function(done) {

              var xml = dir(__dirname, {
                exclude: /.js$/,
                cache: true
              });
              assert.equal(xml,
                '<?xml version="1.0" encoding="UTF-8"?><home></home>');
              done();
            });
            it(
              'should return 1 file into "__dirname" dir',
              function(done) {

                var xml = dir(__dirname, {
                  exclude: /(exclude.js|dotfiles.js)$/,
                  cache: true
                });
                assert
                    .equal(
                      /^<\?xml version="1.0" encoding="UTF-8"\?><home><file id="0"><name>sync.js<\/name><ctime>[^ ]+<\/hash><\/file><\/home>$/
                          .test(xml), true);
                assert.equal(/sync.js/.test(xml), true);
                assert.equal(/exclude.js/.test(xml), false);
                done();
              });
          });

        it('should return empty "__dirname" dir', function(done) {

          var xml = dir(__dirname, {
            exclude: /.js$/,
            cache: false
          });
          assert.equal(xml,
            '<?xml version="1.0" encoding="UTF-8"?><home></home>');
          done();
        });
        it(
          'should return 1 file into "__dirname" dir',
          function(done) {

            var xml = dir(__dirname, {
              exclude: /(exclude.js|dotfiles.js)$/,
              cache: false
            });
            assert
                .equal(
                  /^<\?xml version="1.0" encoding="UTF-8"\?><home><file id="0"><name>sync.js<\/name><ctime>[^ ]+<\/hash><\/file><\/home>$/
                      .test(xml), true);
            assert.equal(/sync.js/.test(xml), true);
            assert.equal(/exclude.js/.test(xml), false);
            done();
          });
      });

    describe('json', function() {

      describe('cache', function() {

        it('should return empty "__dirname" dir', function(done) {

          var json = JSON.stringify(dir(__dirname, {
            exclude: /.js$/,
            json: true,
            cache: true
          }));
          assert.equal(json, '{}');
          done();
        });
        it('should return 1 file into "__dirname" dir', function(done) {

          var json = JSON.stringify(dir(__dirname, {
            exclude: /(exclude.js|dotfiles.js)$/,
            json: true,
            cache: true
          }));
          assert.equal(/^{"[^ ]+","type":"file"}}}$/.test(json), true);
          assert.equal(/sync.js/.test(json), true);
          assert.equal(/exclude.js/.test(json), false);
          done();
        });
      });

      it('should return empty "__dirname" dir', function(done) {

        var json = JSON.stringify(dir(__dirname, {
          exclude: /.js$/,
          json: true,
          cache: false
        }));
        assert.equal(json, '{}');
        done();
      });
      it('should return 1 file into "__dirname" dir', function(done) {

        var json = JSON.stringify(dir(__dirname, {
          exclude: /(exclude.js|dotfiles.js)$/,
          json: true,
          cache: false
        }));
        assert.equal(/^{"[^ ]+","type":"file"}}}$/.test(json), true);
        assert.equal(/sync.js/.test(json), true);
        assert.equal(/exclude.js/.test(json), false);
        done();
      });
    });
  });
