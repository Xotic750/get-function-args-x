/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:17, maxcomplexity:5 */

/*global JSON:true, expect, module, require, describe, it, returnExports */

(function () {
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
    getFunctionArgs = require('../../index.js');
  } else {
    getFunctionArgs = returnExports;
  }

  describe('Basic tests', function () {
    it('should return `undefined` for everything', function () {
      var values = [true, 'abc', 1, null, undefined, new Date(), [], /r/],
          expected = values.map(function () {}),
          actual = values.map(getFunctionArgs);
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
            /*jshint unused:false */
            function test(a) {},
            /*jshint evil:true */
            new Function(),
            /*jshint evil:false */
            function test1(a, b){},
            function test2 (a/*, foo*/){},
            function test3( a/*, foo*/, b ) { },
            function test4 ( a/*, foo*/, b  ) { },
            function/*foo*/test5( a/*, foo*/, b ){},
            function/*foo*/test6/*bar*/(a/*, foo*/, b ){},
            function/*foo*/test7/*bar*/(/*baz*/){},
            /*fum*/function/*foo*/ // blah
            test8/*bar*/ // wizz
            (/*baz*/a
             ){}
            /* jscs:enable */
          ],
          expected = [
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
          ],
          actual = values.map(getFunctionArgs);
      expect(actual).toEqual(expected);

      var fat;
      try {
        /*jshint evil:true */
        fat = new Function('return (x, y) => {return this}')();
        expect(getFunctionArgs(fat)).toEqual(['x', 'y']);
      } catch (ignore) {}

      var gen;
      try {
        /*jshint evil:true */
        gen = new Function('return function* idMaker(x, y){}')();
        expect(getFunctionArgs(gen)).toEqual(['x', 'y']);
      } catch (ignore) {}

      var classes;
      try {
        /*jshint evil:true */
        classes = new Function('"use strict"; return class My {};')();
        expect(getFunctionArgs(classes)).toEqual([]);
      } catch (ignore) {}

      try {
        /*jshint evil:true */
        classes = new Function('"use strict"; return class My { constructor (a,b) {} };')();
        expect(getFunctionArgs(classes)).toEqual(['a', 'b']);
      } catch (ignore) {}
    });
  });
}());
