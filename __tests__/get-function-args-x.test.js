let getFunctionArgs;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  getFunctionArgs = require('../../index.js');
} else {
  getFunctionArgs = returnExports;
}

const getFat = function getFatFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return (x, y) => {return this;};')();
  } catch (ignore) {}

  return false;
};

const ifSupportsFatit = getFat() ? it : xit;

const getGF = function getGeneratoFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return function* idMaker(x, y){};')();
  } catch (ignore) {}

  return false;
};

const ifSupportsGFit = getGF() ? it : xit;

const getC = function getClassFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('"use strict"; return class My { constructor (x,y) {} };')();
  } catch (ignore) {}

  return false;
};

const ifSupportsCit = getC() ? it : xit;

const getAF = function getAsyncFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return async function wait(x, y) {}')();
  } catch (ignore) {}

  return false;
};

const ifSupportsAFit = getAF() ? it : xit;

describe('basic tests', function() {
  it('should return `undefined` for everything', function() {
    expect.assertions(1);
    const values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];

    const expected = new Array(values.length).fill();
    const actual = values.map(getFunctionArgs);
    expect(actual).toStrictEqual(expected);
  });

  it('should return a correct args for everything', function() {
    expect.assertions(1);
    const values = [
      Object,
      String,
      Boolean,
      Array,
      Function,
      function() {},
      // eslint-disable-next-line no-unused-vars
      function test(a) {},
      // eslint-disable-next-line no-new-func
      new Function(),
      // eslint-disable-next-line no-unused-vars
      function test1(a, b) {},
      // eslint-disable-next-line no-unused-vars
      function test2(a /* , foo */) {},
      // eslint-disable-next-line no-unused-vars
      function test3(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function test4(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function /* foo */ test5(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function /* foo */ test6 /* bar */(a /* , foo */, b) {},
      function /* foo */ test7 /* bar */(/* baz */) {},
      /* fum */ function /* foo */ // blah
      // eslint-disable-next-line no-unused-vars
      test8(/* baz */ a) {},
    ];

    const expected = [
      [],
      [],
      [],
      [],
      [],
      [],
      ['a'],
      [],
      ['a', 'b'],
      ['a'],
      ['a', 'b'],
      ['a', 'b'],
      ['a', 'b'],
      ['a', 'b'],
      [],
      ['a'],
    ];
    const actual = values.map(getFunctionArgs);
    expect(actual).toStrictEqual(expected);
  });

  ifSupportsFatit('should return a correct string for everything', function() {
    expect.assertions(1);
    const fat = getFat();
    expect(getFunctionArgs(fat)).toStrictEqual(['x', 'y']);
  });

  ifSupportsGFit('should return a correct string for everything', function() {
    expect.assertions(1);
    const gen = getGF();
    expect(getFunctionArgs(gen)).toStrictEqual(['x', 'y']);
  });

  ifSupportsAFit('should return a correct string for everything', function() {
    expect.assertions(1);
    const classes = getAF();
    expect(getFunctionArgs(classes)).toStrictEqual(['x', 'y']);
  });

  ifSupportsCit('should return a correct string for everything', function() {
    expect.assertions(1);
    const classes = getC();
    expect(getFunctionArgs(classes)).toStrictEqual(['x', 'y']);
    // eslint-disable-next-line no-new-func
    const classes1 = new Function('"use strict"; return class My {};')();
    expect(getFunctionArgs(classes1)).toStrictEqual([]);
  });
});
