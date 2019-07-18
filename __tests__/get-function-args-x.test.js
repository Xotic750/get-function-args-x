import getFunctionArgs from '../src/get-function-args-x';

const getFat = function getFatFunc() {
  try {
    return new Function('return (x, y) => {return this;};')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsFatit = getFat() ? it : xit;

const getGF = function getGeneratoFunc() {
  try {
    return new Function('return function* idMaker(x, y){};')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsGFit = getGF() ? it : xit;

const getC = function getClassFunc() {
  try {
    return new Function('"use strict"; return class My { constructor (x,y) {} };')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsCit = getC() ? it : xit;

const getAF = function getAsyncFunc() {
  try {
    return new Function('return async function wait(x, y) {}')();
  } catch (ignore) {
    // empty
  }

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
      function test(a) {
        return [a];
      },

      new Function(),
      function test1(a, b) {
        return [a, b];
      },
      function test2(a /* , foo */) {
        return [a];
      },
      function test3(a /* , foo */, b) {
        return [a, b];
      },
      function test4(a /* , foo */, b) {
        return [a, b];
      },
      function /* foo */ test5(a /* , foo */, b) {
        return [a, b];
      },
      function /* foo */ test6 /* bar */(a /* , foo */, b) {
        return [a, b];
      },
      function /* foo */ test7 /* bar */(/* baz */) {},
      /* fum */ function /* foo */ // blah
      test8(/* baz */ a) {
        return [a];
      },
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
    expect.assertions(2);
    const classes = getC();
    expect(getFunctionArgs(classes)).toStrictEqual(['x', 'y']);

    const classes1 = new Function('"use strict"; return class My {};')();
    expect(getFunctionArgs(classes1)).toStrictEqual([]);
  });
});
