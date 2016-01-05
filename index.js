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
 * getFunctionArgs module. Returns the name of the function.
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
 * @version 1.0.0
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
  maxstatements:6, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var ES = require('es-abstract/es6'),
    fToString = Function.prototype.toString,
    aPush = Array.prototype.push,
    aReduce = Array.prototype.reduce,
    sMatch = String.prototype.match,
    sTrim = String.prototype.trim,
    sSplit = String.prototype.split,
    sReplace = String.prototype.replace,
    ARROW_ARG = [/^([^\(]+?)=>/],
    FN_ARGS = [/^[^\(]*\(\s*([^\)]*)\)/m],
    STRIP_COMMENTS = [/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, ''],
    SPLIT_COMMA = [','];

  /**
   * The reduce mapper.
   *
   * @private
   * @param {Array} acc The array of args.
   * @param {string} arg The arg to be trimmed and added.
   * @return {Array} The args of the function.
   */
  function mapper(acc, arg) {
    var a = ES.Call(sTrim, arg);
    if (a) {
      ES.Call(aPush, acc, [a]);
    }
    return acc;
  }

  /**
   * This method returns the args of the function, or `undefined` if not
   * a function.
   *
   * @param {Function} fn The function to get the args of.
   * @return {undefined|string} The args of the function, or `undefined` if
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
    var str, match;
    if (!ES.IsCallable(fn)) {
      return;
    }
    str = ES.Call(sReplace, ES.Call(fToString, fn), STRIP_COMMENTS);
    match = ES.Call(sMatch, str, ARROW_ARG) || ES.Call(sMatch, str, FN_ARGS);
    return match ?
      ES.Call(aReduce, ES.Call(sSplit, match[1], SPLIT_COMMA), [mapper, []]) :
      [];
  };
}());
