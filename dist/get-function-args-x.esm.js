import attempt from 'attempt-x';
import reduce from 'array-reduce-x';
import replaceComments from 'replace-comments-x';
import normalise from 'normalize-space-x';
import trim from 'trim-x';
import methodize from 'simple-methodize-x';
var fToString = methodize(attempt.toString);
var SPACE = ' ';
var sMatch = methodize(SPACE.match);
var sSplit = methodize(SPACE.split);
var ARROW_ARG = /^([^(]+?)=>/;
var FN_ARGS = /^[^(]*\( *([^)]*)\)/m;

var reducer = function reducer(acc, item) {
  var a = trim(item);

  if (a) {
    acc[acc.length] = a;
  }

  return acc;
};

var attemptee = function attemptee(fn) {
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


var getFunctionArgs = function getFunctionArgs(fn) {
  var result = attempt(attemptee, fn);

  if (result.threw) {
    /* eslint-disable-next-line no-void */
    return void 0;
  }

  var str = normalise(replaceComments(result.value, SPACE));
  var match = sMatch(str, ARROW_ARG) || sMatch(str, FN_ARGS);
  return reduce(match ? sSplit(match[1], ',') : [], reducer, []);
};

export default getFunctionArgs;

//# sourceMappingURL=get-function-args-x.esm.js.map