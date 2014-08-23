"use strict";
/**
 * @file dir2xml main
 * @module dir2xml
 * @package dir2xml
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var PATH = require('path');
    var crypto = require('crypto').createHash;
    var fs = require('fs');
    var resolve = PATH.resolve;
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}
// load
var STORY = Object.create(null);
var header = '<?xml version="1.0" encoding="UTF-8"?><home>';
var footer = '</home>';

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
                    && STORY.json === my.json) {
                return STORY.body;
            }
            STORY = Object.create(null);
        }
        // build
        var body;
        if (my.sync) {
            body = dir_sync(my.root, h, '');
        } else {
            body = dir_callback(my.root, h, '');
        }
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
        if (my.sync) {
            body = dir_sync(my.root, h, '');
        } else {
            body = dir_callback(my.root, h, '');
        }
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
        try {
            o = head[root][index] = Object.create(null);
        } catch (e) {
            head[root] = Object.create(null);
            o = head[root][index] = Object.create(null);
        }
        o.name = name;
        o.ctime = stats.ctime.getTime();
        o.mtime = stats.mtime.getTime();
        if (dir) {
            o.type = 'dir';
        } else {
            var checksum = crypto('md5');
            var ff = fs.readFileSync(abs);
            checksum.update(ff);
            o.atime = stats.atime.getTime();
            o.size = stats.size;
            o.hash = checksum.digest('hex');
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
            var checksum = crypto('md5');
            var ff = fs.readFileSync(abs);
            checksum.update(ff);
            h += '<atime>' + stats.atime.getTime() + '</atime>';
            h += '<size>' + stats.size + '</size>';
            h += '<hash>' + checksum.digest('hex') + '</hash>';
            h += '</file>';
        }
        return [ head + h, after + a ];
    }

    // start sync
    /**
     * body
     * 
     * @function dir_sync
     * @param {String} prova - dir pathname
     * @param {String} head - header
     * @param {String} after - post header
     * @return {String}
     */
    function dir_sync(prova, head, after) {

        var stat = fs.statSync(prova);
        if (stat) {
            var files = fs.readdirSync(prova);
            if (files) {
                for (var i = 0, ii = files.length; i < ii; i++) {
                    var file = files[i];
                    if (my.exclude && my.exclude.test(file)) {
                        continue;
                    }
                    if (my.dotfiles && file[0] === '.') {
                        continue;
                    }
                    var root = prova + PATH.sep + file;
                    var stats = fs.statSync(root);
                    if (stats) {
                        var hea;
                        var afte;
                        if (stats.isDirectory()) {
                            var r = build(head, after, file, root, stats, true,
                                    prova);
                            hea = r[0];
                            afte = r[1];
                            var head = dir_sync(root, hea, afte); // recursive
                            var after = '';
                        } else {
                            var r = build(head, after, file, root, stats,
                                    false, prova);
                            var head = r[0];
                            var after = r[1];
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
    // end sync

    // start callback
    /**
     * body
     * 
     * @function dir_callback
     * @param {String} prova - dir pathname
     * @param {String} head - header
     * @param {String} after - post header
     * @return {String}
     */
    // function dir_callback(prova, head, after) {
    //
    // fs.stat(prova, function(err, stat) {
    //
    // if (err) {
    // return;
    // }
    // fs.readdir(prova, function(err, files) {
    //
    // if (err) {
    // return;
    // }
    // for (var i = 0, ii = files.length; i < ii; i++) {
    // !function(file) {
    //
    // if (my.exclude && my.exclude.test(file)) {
    // return;
    // }
    // if (my.dotfiles && file[0] === '.') {
    // return;
    // }
    // var root = prova + PATH.sep + file;
    // fs.stat(root, function(err, stats) {
    //
    // if (err) {
    // return;
    // }
    // var hea;
    // var afte;
    // if (stats.isDirectory()) {
    // var r = build(head, after, file, root, stats,
    // true);
    // hea = r[0];
    // afte = r[1];
    // var head = mod_sync(root, hea, afte); // recursive
    // } else {
    // var r = build(head, after, file, root, stats,
    // false);
    // var head = r[0];
    // var after = r[1];
    // }
    // return;
    // });
    //
    // }(files[i]);
    // }
    // return;
    //
    // });
    // return;
    //
    // });
    // return head + after;
    // }
    // end callback
    var CCdir = 0;
    var CCfile = 0;

    var end = simple;
    if (my.cache) {
        end = cached;
    }

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
 * @param {Object} [options] - various options. Check README.md
 * @return {Object}
 */
module.exports = function dir(root, options) {

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
    var options = options || Object.create(null);
    var my = {
        root: r,
        exclude: options.exclude || false,
        dotfiles: options.dotfiles == false ? false : true,
        cache: options.cache == false ? false : true,
        /**
         * @todo: dir_callback. Boolean(options.sync)
         */
        sync: true,
        json: Boolean(options.json)
    };
    return wrapper(my);
};
