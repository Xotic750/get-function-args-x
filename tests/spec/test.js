'use strict';

var getFunctionArgs;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  getFunctionArgs = require('../../index.js');
} else {
  getFunctionArgs = returnExports;
}

var getFat = function getFatFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return (x, y) => {return this;};')();
  } catch (ignore) {}
  return false;
};

var ifSupportsFatit = getFat() ? it : xit;

var getGF = function getGeneratoFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return function* idMaker(x, y){};')();
  } catch (ignore) {}
  return false;
};

var ifSupportsGFit = getGF() ? it : xit;

var getC = function getClassFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('"use strict"; return class My { constructor (x,y) {} };')();
  } catch (ignore) {}
  return false;
};

var ifSupportsCit = getC() ? it : xit;

var getAF = function getAsyncFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return async function wait(x, y) {}')();
  } catch (ignore) {}
  return false;
};

var ifSupportsAFit = getAF() ? it : xit;

describe('Basic tests', function () {
  it('should return `undefined` for everything', function () {
    var values = [
      true,
      'abc',
      1,
      null,
      undefined,
      new Date(),
      [],
      /r/
    ];

    var expected = new Array(values.length).fill();
    var actual = values.map(getFunctionArgs);
    expect(actual).toEqual(expected);
  });

  it('should return a correct args for everything', function () {
    var values = [
      Object,
      String,
      Boolean,
      Array,
      Function,
      function () {},
      // eslint-disable-next-line no-unused-vars
      function test(a) {},
      // eslint-disable-next-line no-new-func
      new Function(),
      // eslint-disable-next-line no-unused-vars
      function test1(a, b) {},
      // eslint-disable-next-line no-unused-vars
      function test2(a/* , foo*/) {},
      // eslint-disable-next-line no-unused-vars
      function test3(a/* , foo*/, b) { },
      // eslint-disable-next-line no-unused-vars
      function test4(a/* , foo*/, b) { },
      // eslint-disable-next-line no-unused-vars
      function/* foo*/test5(a/* , foo*/, b) {},
      // eslint-disable-next-line no-unused-vars
      function/* foo*/test6/* bar*/(a/* , foo*/, b) {},
      function/* foo*/test7/* bar*/(/* baz*/) {},
      /* fum*/function/* foo*/ // blah
      // eslint-disable-next-line no-unused-vars
      test8(/* baz*/a
      ) {}
    ];

    var expected = [
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
      ['a']
    ];
    var actual = values.map(getFunctionArgs);
    expect(actual).toEqual(expected);
  });

  ifSupportsFatit('should return a correct string for everything', function () {
    var fat = getFat();
    expect(getFunctionArgs(fat)).toEqual(['x', 'y']);
  });

  ifSupportsGFit('should return a correct string for everything', function () {
    var gen = getGF();
    expect(getFunctionArgs(gen)).toEqual(['x', 'y']);
  });

  ifSupportsAFit('should return a correct string for everything', function () {
    var classes = getAF();
    expect(getFunctionArgs(classes)).toEqual(['x', 'y']);
  });

  ifSupportsCit('should return a correct string for everything', function () {
    var classes = getC();
    expect(getFunctionArgs(classes)).toEqual(['x', 'y']);
    // eslint-disable-next-line no-new-func
    var classes1 = new Function('"use strict"; return class My {};')();
    expect(getFunctionArgs(classes1)).toEqual([]);
  });
});
