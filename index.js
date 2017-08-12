/**
 * @file Get the args of the function.
 * @version 2.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

'use strict';

var reduce = require('array-reduce-x');
var replaceComments = require('replace-comments-x');
var normalise = require('normalize-space-x');
var trim = require('trim-x');
var fToString = Function.prototype.toString;
var ARROW_ARG = /^([^(]+?)=>/;
var FN_ARGS = /^[^(]*\( *([^)]*)\)/m;
var isFunction = require('is-function-x');

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

  var str;
  try {
    str = normalise(replaceComments(fToString.call(fn), ' '));
  } catch (ignore) {
    return '';
  }

  var match = str.match(ARROW_ARG) || str.match(FN_ARGS);
  return reduce(match ? match[1].split(',') : [], function reducer(acc, item) {
    var a = trim(item);
    if (a) {
      acc.push(a);
    }

    return acc;
  }, []);
};
