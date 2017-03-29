/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:true, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:11, maxcomplexity:3 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1, array-callback-return: 1, no-unused-vars: 1,
   no-new-func: 1 */

/* global JSON:true, expect, module, require, describe, it, xit, returnExports */

;(function () { // eslint-disable-line no-extra-semi

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
      return new Function('return (x, y) => {return this;};')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsFatit = getFat() ? it : xit;

  var getGF = function getGeneratoFunc() {
    try {
      return new Function('return function* idMaker(x, y){};')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsGFit = getGF() ? it : xit;

  var getC = function getClassFunc() {
    try {
      return new Function('"use strict"; return class My { constructor (x,y) {} };')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsCit = getC() ? it : xit;

  var getAF = function getAsyncFunc() {
    try {
      return new Function('return async function wait(x, y) {}')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsAFit = getAF() ? it : xit;

  describe('Basic tests', function () {
    it('should return `undefined` for everything', function () {
      var values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];
      var expected = values.map(function () {});
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
        /* jscs:disable */
        function () {},
        /* jshint unused:false */
        function test(a) {},
        /* jshint evil:true */
        new Function(),
        /* jshint evil:false */
        function test1(a, b) {},
        function test2(a/* , foo*/) {},
        function test3(a/* , foo*/, b) { },
        function test4(a/* , foo*/, b) { },
        function/* foo*/test5(a/* , foo*/, b) {},
        function/* foo*/test6/* bar*/(a/* , foo*/, b) {},
        function/* foo*/test7/* bar*/(/* baz*/) {},
        /* fum*/function/* foo*/ // blah
            test8(/* baz*/a
             ) {}
        /* jscs:enable */
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
      var classes1 = new Function('"use strict"; return class My {};')();
      expect(getFunctionArgs(classes1)).toEqual([]);
    });
  });
}());
