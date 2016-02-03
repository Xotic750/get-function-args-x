/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/get-function-args-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/get-function-args-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/get-function-args-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-args-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/get-function-args-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-args-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/get-function-args-x" title="npm version">
 * <img src="https://badge.fury.io/js/get-function-args-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * getFunctionArgs module. Returns the named args of a function.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.7
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:1,
  maxstatements:15, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isFunction = require('is-function-x');
  var fToString = Function.prototype.toString;
  var aPush = Array.prototype.push;
  var aReduce = Array.prototype.reduce;
  var sMatch = String.prototype.match;
  var sTrim = String.prototype.trim;
  var sSplit = String.prototype.split;
  var sReplace = String.prototype.replace;
  var ARROW_ARG = /^([^\(]+?)=>/;
  var FN_ARGS = new RegExp(
    '^[^\\(]*\\([' + require('white-space-x')(false, true) + ']*([^\\)]*)\\)',
    'm'
  );
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  /**
   * The reduce mapper.
   *
   * @private
   * @param {Array} acc The array of args.
   * @param {string} arg The arg to be trimmed and added.
   * @return {Array} The args of the function.
   */
  function mapper(acc, arg) {
    var a = sTrim.call(arg);
    if (a) {
      aPush.call(acc, a);
    }
    return acc;
  }

  /**
   * This method returns the args of the function, or `undefined` if not
   * a function.
   *
   * @param {Function} fn The function to get the args of.
   * @return {undefined|Array} The args of the function, or `undefined` if
   *  not a function.
   * @example
   * var getFunctionArgs = require('get-function-args-x');
   *
   * getFunctionArgs(); // undefined
   * getFunctionArgs(Number.MIN_VALUE); // undefined
   * getFunctionArgs('abc'); // undefined
   * getFunctionArgs(true); // undefined
   * getFunctionArgs({ name: 'abc' }); // undefined
   * getFunctionArgs(function () {}); // []
   * getFunctionArgs(new Function ()); // []
   * getFunctionArgs(function test() {}); // []
   * getFunctionArgs(function test(a, b) {}); // ['a', 'b']
   */
  module.exports = function getFunctionArgs(fn) {
    if (!isFunction(fn)) {
      return;
    }
    var str = sReplace.call(fToString.call(fn), STRIP_COMMENTS, ' ');
    var match = sMatch.call(str, ARROW_ARG) || sMatch.call(str, FN_ARGS);
    return match ? aReduce.call(sSplit.call(match[1], ','), mapper, []) : [];
  };
}());
