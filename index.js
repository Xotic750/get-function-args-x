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
 * Get the named args of a function.
 *
 * Requires ES3 or above.
 *
 * @version 1.1.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

/* eslint strict: 1 */

/* global module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isFunction = require('is-function-x');
  var forEach = require('foreach');
  var trim = require('string.prototype.trim');
  var fToString = Function.prototype.toString;
  var ARROW_ARG = /^([^(]+?)=>/;
  var FN_ARGS = new RegExp('^[^\\(]*\\([' + require('white-space-x').ws + ']*([^\\)]*)\\)', 'm');
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

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
      return void 0;
    }
    var str = fToString.call(fn).replace(STRIP_COMMENTS, ' ');
    var match = str.match(ARROW_ARG) || str.match(FN_ARGS);
    var arr = [];
    if (match) {
      forEach(match[1].split(','), function (item) {
        var a = trim(item);
        if (a) {
          arr.push(a);
        }
      });
    }
    return arr;
  };
}());
