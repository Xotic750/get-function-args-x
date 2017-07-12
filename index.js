/**
 * @file Get the args of the function.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

'use strict';

var forEach = require('for-each');
var trim = require('trim-x');
var fToString = Function.prototype.toString;
var ARROW_ARG = /^([^(]+?)=>/;
var s = require('white-space-x').ws;
var FN_ARGS = new RegExp('^[^\\(]*\\([' + s + ']*([^\\)]*)\\)', 'm');
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var isFunctionLike;
try {
  // eslint-disable-next-line no-new-func
  new Function('"use strict"; return class My {};')();
  isFunctionLike = function _isFunctionLike(value) {
    return typeof value === 'function';
  };
} catch (ignore) {
  isFunctionLike = require('is-function-x');
}

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
  if (isFunctionLike(fn) === false) {
    return void 0;
  }

  var str;
  try {
    str = fToString.call(fn).replace(STRIP_COMMENTS, ' ');
  } catch (ignore) {
    return '';
  }

  var match = str.match(ARROW_ARG) || str.match(FN_ARGS);
  var arr = [];
  if (match) {
    forEach(match[1].split(','), function reducer(item) {
      var a = trim(item);
      if (a) {
        arr.push(a);
      }
    });
  }

  return arr;
};
