'use strict';
/**
 * @file dir2xml main
 * @module dir2xml
 * @subpackage main
 * @version 1.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var path = require('path');
var fs = require('fs');

/*
 * functions
 */
/**
 * function wrapper for multiple require
 * 
 * @function wrapper
 * @param {Object} my - options
 * @return {Object}
 */
function wrapper(my) {

  var crypto = require('crypto').createHash;
  var STORY = Object.create(null);
  var header = '<?xml version="1.0" encoding="UTF-8"?><home>';
  var footer = '</home>';

  /**
   * calculate hash of file
   * 
   * @function checksum
   * @param {Object|false} obj - object output
   * @param {String} file - absolute path name
   * @return {Object|String}
   */
  function checksum(obj, file) {

    var check = crypto(my.hash);
    var ff = fs.readFileSync(file);
    check.update(ff);
    if (obj) {
      obj.hash = check.digest('hex');
      return obj;
    }
    return '<hash>' + check.digest('hex') + '</hash>';
  }

  /**
   * end of work with cache
   * 
   * @function cached
   * @param {String|Object} h - header
   * @param {String|null} f - footer
   * @return {String}
   */
  function cached(h, f) {

    var stat;
    // cache
    if (my.cache && STORY.root === my.root) {

      stat = fs.statSync(my.root);
      if (stat && STORY.mtime === stat.mtime.getTime()
        && STORY.json === my.json && STORY.hash === my.hash) {
        return STORY.body;
      }
      STORY = Object.create(null);
    }
    // build
    var body;
    body = dir_sync(my.root, h, '');
    if (f) {
      body += f;
    }
    if (my.cache) {
      stat = fs.statSync(my.root);
      if (stat) {
        STORY.root = my.root;
        STORY.body = body;
        STORY.mtime = stat.mtime.getTime();
        STORY.json = my.json;
        STORY.hash = my.hash;
      }
    }
    return body;
  }

  /**
   * end of work
   * 
   * @function simple
   * @param {String|Object} h - header
   * @param {String|null} f - footer
   * @return {String}
   */
  function simple(h, f) {

    // build
    var body;
    body = dir_sync(my.root, h, '');
    if (f) {
      body += f;
    }
    return body;
  }

  /**
   * json builder
   * 
   * @function json
   * @param {String} head - header
   * @param {String} after - post header
   * @param {String} name - path name
   * @param {String} abs - absolute path name
   * @param {Object} stats - stats of file
   * @param {Boolean} dir - flag for directory
   * @param {String} root - root name
   * @return {Array}
   */
  function json(head, after, name, abs, stats, dir, root) {

    var index;
    var o;
    if (dir) {
      index = CCdir++;
    } else {
      index = CCfile++;
    }
    if (head[root]) {
      o = head[root][index] = Object.create(null);
    } else {
      head[root] = Object.create(null);
      o = head[root][index] = Object.create(null);
    }
    o.name = name;
    o.ctime = stats.ctime.getTime();
    o.mtime = stats.mtime.getTime();
    if (dir) {
      o.type = 'dir';
    } else {
      o.atime = stats.atime.getTime();
      o.size = stats.size;
      o = hash(o, abs);
      o.type = 'file';
    }
    return [ head, null ];
  }

  /**
   * xml builder
   * 
   * @function xml
   * @param {String} head - header
   * @param {String} after - post header
   * @param {String} name - path name
   * @param {String} abs - absolute path name
   * @param {Object} stats - stats of file
   * @param {Boolean} dir - flag for directory
   * @return {Array}
   */
  function xml(head, after, name, abs, stats, dir) {

    var h = '';
    var a = '';
    if (dir) {
      h = '<dir id="' + CCdir++ + '">';
    } else {
      h = '<file id="' + CCfile++ + '">';
    }
    h += '<name>' + name + '</name>';
    h += '<ctime>' + stats.ctime.getTime() + '</ctime>';
    h += '<mtime>' + stats.mtime.getTime() + '</mtime>';
    if (dir) {
      a = '</dir>';
    } else {
      h += '<atime>' + stats.atime.getTime() + '</atime>';
      h += '<size>' + stats.size + '</size>';
      h += hash(false, abs);
      h += '</file>';
    }
    return [ head + h, after + a ];
  }

  /**
   * body
   * 
   * @function dir_sync
   * @param {String} prova - dir pathname
   * @param {String} heads - header
   * @param {String} afters - post header
   * @return {String}
   */
  function dir_sync(prova, heads, afters) {

    var head = heads;
    var after = afters;
    var stat = fs.statSync(prova);
    if (stat) {
      var files = fs.readdirSync(prova);
      if (files) {
        for (var i = 0, ii = files.length; i < ii; ++i) {
          var file = files[i];
          if (my.exclude && my.exclude.test(file)) {
            continue;
          } else if (my.dotfiles && file[0] === '.') {
            continue;
          }
          var root = prova + path.sep + file;
          var stats = fs.statSync(root);
          if (stats) {
            var r;
            var hea;
            var afte;
            if (stats.isDirectory()) {
              r = build(head, after, file, root, stats, true, prova);
              hea = r[0];
              afte = r[1];
              head = dir_sync(root, hea, afte); // recursive
              after = '';
            } else {
              r = build(head, after, file, root, stats, false, prova);
              head = r[0];
              after = r[1];
            }
          }
        }
      }
    }
    if (after) {
      head += after;
    }
    return head;
  }

  var CCdir = 0;
  var CCfile = 0;

  // cache or not
  var end = simple;
  if (my.cache) {
    end = cached;
  }

  // hash
  var hash = checksum;
  if (!my.hash) {
    hash = function(obj) {

      return obj || '';
    };
  }

  // output
  var build = xml;
  if (my.json) {
    build = json;
    return end(Object.create(null), null);
  }
  return end(header, footer);
}

/**
 * options setting
 * 
 * @exports dir
 * @function dir
 * @param {String} root - root path
 * @param {Object} [opt] - various options. Check README.md
 * @return {Object}
 */
function dir(root, opt) {

  var resolve = path.resolve;

  if (!root) {
    throw new TypeError('root path required');
  }
  var r = resolve(root);
  if (r[r.length - 1] == '/') {
    r = r.substr(0, r.length - 1);
  }
  if (!fs.existsSync(root)) {
    throw new Error('path not exists');
  }
  if (!fs.statSync(r).isDirectory()) {
    throw new Error('path is not a directory');
  }
  var options = opt || Object.create(null);
  var my = {
    root: r,
    exclude: options.exclude || false,
    dotfiles: options.dotfiles === false ? false : true,
    cache: options.cache === false ? false : true,
    json: Boolean(options.json),
    hash: options.hash === false ? false : String(options.hash || 'md5')
  };
  return wrapper(my);
}
module.exports = dir;
