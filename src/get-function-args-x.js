import attempt from 'attempt-x';
import reduce from 'array-reduce-x';
import replaceComments from 'replace-comments-x';
import normalise from 'normalize-space-x';
import trim from 'trim-x';
import isFunction from 'is-function-x';

const fToString = attempt.toString;
const SPACE = ' ';
const sMatch = SPACE.match;
const sSplit = SPACE.split;
const ARROW_ARG = /^([^(]+?)=>/;
const FN_ARGS = /^[^(]*\( *([^)]*)\)/m;

const reducer = function reducer(acc, item) {
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
 */
const getFunctionArgs = function getFunctionArgs(fn) {
  if (isFunction(fn, true) === false) {
    /* eslint-disable-next-line no-void */
    return void 0;
  }

  const result = attempt.call(fn, fToString);

  if (result.threw) {
    return '';
  }

  const str = normalise(replaceComments(result.value, SPACE));
  const match = sMatch.call(str, ARROW_ARG) || sMatch.call(str, FN_ARGS);

  return reduce(match ? sSplit.call(match[1], ',') : [], reducer, []);
};

export default getFunctionArgs;
