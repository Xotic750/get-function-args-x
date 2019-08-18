import attempt from 'attempt-x';
import reduce from 'array-reduce-x';
import replaceComments from 'replace-comments-x';
import normalise from 'normalize-space-x';
import trim from 'trim-x';
import methodize from 'simple-methodize-x';

const fToString = methodize(attempt.toString);
const SPACE = ' ';
const sMatch = methodize(SPACE.match);
const sSplit = methodize(SPACE.split);
const ARROW_ARG = /^([^(]+?)=>/;
const FN_ARGS = /^[^(]*\( *([^)]*)\)/m;

const reducer = function reducer(acc, item) {
  const a = trim(item);

  if (a) {
    acc[acc.length] = a;
  }

  return acc;
};

const attemptee = function attemptee(fn) {
  return fToString(fn);
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
  const result = attempt(attemptee, fn);

  if (result.threw) {
    /* eslint-disable-next-line no-void */
    return void 0;
  }

  const str = normalise(replaceComments(result.value, SPACE));
  const match = sMatch(str, ARROW_ARG) || sMatch(str, FN_ARGS);

  return reduce(match ? sSplit(match[1], ',') : [], reducer, []);
};

export default getFunctionArgs;
