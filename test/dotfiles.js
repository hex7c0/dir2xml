'use strict';
/**
 * @file dotfiles test
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
  'dotfiles',
  function() {

    describe(
      'xml',
      function() {

        describe(
          'cache',
          function() {

            it('shouldn\'t return empty "__dirname" dir', function(done) {

              var xml = dir(__dirname, {
                exclude: /.js$/,
                dotfiles: false,
                cache: true
              });
              assert.notEqual(xml,
                '<?xml version="1.0" encoding="UTF-8"?><home></home>');
              assert.notEqual(xml.search('.gitignore'), -1);
              done();
            });
            it(
              'should return 1 file into "__dirname" dir',
              function(done) {

                var xml = dir(__dirname, {
                  exclude: /(exclude.js|dotfiles.js)$/,
                  dotfiles: false,
                  cache: true
                });
                assert
                    .notEqual(
                      /^<\?xml version="1.0" encoding="UTF-8"\?><home><file id="0"><name>sync.js<\/name><ctime>[^ ]+<\/hash><\/file><\/home>$/
                          .test(xml), true);
                assert.notEqual(xml.search('.gitignore'), -1);
                assert.equal(/sync.js/.test(xml), true);
                assert.equal(/exclude.js/.test(xml), false);
                done();
              });
          });

        it('should return empty "__dirname" dir', function(done) {

          var xml = dir(__dirname, {
            exclude: /.js$/,
            dotfiles: false,
            cache: false
          });
          assert.notEqual(xml,
            '<?xml version="1.0" encoding="UTF-8"?><home></home>');
          assert.notEqual(xml.search('.gitignore'), -1);
          done();
        });
        it(
          'should return 1 file into "__dirname" dir',
          function(done) {

            var xml = dir(__dirname, {
              exclude: /(exclude.js|dotfiles.js)$/,
              dotfiles: false,
              cache: false
            });
            assert
                .notEqual(
                  /^<\?xml version="1.0" encoding="UTF-8"\?><home><file id="0"><name>sync.js<\/name><ctime>[^ ]+<\/hash><\/file><\/home>$/
                      .test(xml), true);
            assert.notEqual(xml.search('.gitignore'), -1);
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
            dotfiles: false,
            json: true,
            cache: true
          }));
          assert.notEqual(json, '{}');
          assert.notEqual(json.search('.gitignore'), -1);
          done();
        });
        it('should return 1 file into "__dirname" dir', function(done) {

          var json = JSON.stringify(dir(__dirname, {
            exclude: /(exclude.js|dotfiles.js)$/,
            dotfiles: false,
            json: true,
            cache: true
          }));
          assert.equal(/^{"[^ ]+","type":"file"}}}$/.test(json), true);
          assert.notEqual(json.search('.gitignore'), -1);
          assert.equal(/sync.js/.test(json), true);
          assert.equal(/exclude.js/.test(json), false);
          done();
        });
      });

      it('should return empty "__dirname" dir', function(done) {

        var json = JSON.stringify(dir(__dirname, {
          exclude: /.js$/,
          dotfiles: false,
          json: true,
          cache: false
        }));
        assert.notEqual(json, '{}');
        assert.notEqual(json.search('.gitignore'), -1);
        done();
      });
      it('should return 1 file into "__dirname" dir', function(done) {

        var json = JSON.stringify(dir(__dirname, {
          exclude: /(exclude.js|dotfiles.js)$/,
          dotfiles: false,
          json: true,
          cache: false
        }));
        assert.equal(/^{"[^ ]+","type":"file"}}}$/.test(json), true);
        assert.notEqual(json.search('.gitignore'), -1);
        assert.equal(/sync.js/.test(json), true);
        assert.equal(/exclude.js/.test(json), false);
        done();
      });
    });
  });
