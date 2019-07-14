/**
 * @file Get the args of the function.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-args-x
 */

const attempt = require('attempt-x');
const reduce = require('array-reduce-x');
const replaceComments = require('replace-comments-x');
const normalise = require('normalize-space-x');
const trim = require('trim-x');

const fToString = Function.prototype.toString;
const sMatch = String.prototype.match;
const sSplit = String.prototype.split;
const ARROW_ARG = /^([^(]+?)=>/;
const FN_ARGS = /^[^(]*\( *([^)]*)\)/m;
const isFunction = require('is-function-x');

const reducer = function _reducer(acc, item) {
  const a = trim(item);

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

  const result = attempt.call(fn, fToString);

  if (result.threw) {
    return '';
  }

  const str = normalise(replaceComments(result.value, ' '));
  const match = sMatch.call(str, ARROW_ARG) || sMatch.call(str, FN_ARGS);

  return reduce(match ? sSplit.call(match[1], ',') : [], reducer, []);
};
