/**
 * @file Get the args of the function.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

'use strict';

var attempt = require('attempt-x');
var reduce = require('array-reduce-x');
var replaceComments = require('replace-comments-x');
var normalise = require('normalize-space-x');
var trim = require('trim-x');
var fToString = Function.prototype.toString;
var sMatch = String.prototype.match;
var sSplit = String.prototype.split;
var ARROW_ARG = /^([^(]+?)=>/;
var FN_ARGS = /^[^(]*\( *([^)]*)\)/m;
var isFunction = require('is-function-x');

var reducer = function _reducer(acc, item) {
  var a = trim(item);
  if (a) {
    acc[acc.length] = a;
  }

  return acc;
};

/**
 * This method returns the args of the function, or `undefined` if not
 * a function.
 *
 * @param {Function} fn - The function to get the args of.
 * @returns {undefined|Array} The args of the function, or `undefined` if
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
 * getFunctionArgs(function* test(a, b) {}); // ['a', 'b']
 * getFunctionArgs((a, b) => {}); // ['a', 'b']
 * getFunctionArgs(async function test(a, b) {}); // ['a', 'b']
 */
module.exports = function getFunctionArgs(fn) {
  if (isFunction(fn, true) === false) {
    return void 0;
  }

  var result = attempt.call(fn, fToString);
  if (result.threw) {
    return '';
  }

  var str = normalise(replaceComments(result.value, ' '));
  var match = sMatch.call(str, ARROW_ARG) || sMatch.call(str, FN_ARGS);
  return reduce(match ? sSplit.call(match[1], ',') : [], reducer, []);
};
