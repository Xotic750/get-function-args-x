<a name="module_get-function-args-x"></a>

## get-function-args-x
<a href="https://travis-ci.org/Xotic750/get-function-args-x"
title="Travis status">
<img
src="https://travis-ci.org/Xotic750/get-function-args-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/get-function-args-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/get-function-args-x.svg"
alt="Dependency status" height="18"/>
</a>
<a
href="https://david-dm.org/Xotic750/get-function-args-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/get-function-args-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/get-function-args-x" title="npm version">
<img src="https://badge.fury.io/js/get-function-args-x.svg"
alt="npm version" height="18">
</a>

getFunctionArgs module. Returns the named args of a function.

<h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
`es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
methods that can be faithfully emulated with a legacy JavaScript engine.

`es5-sham.js` monkey-patches other ES5 methods as closely as possible.
For these methods, as closely as possible to ES5 is not very close.
Many of these shams are intended only to allow code to be written to ES5
without causing run-time errors in older engines. In many cases,
this means that these shams cause many ES5 methods to silently fail.
Decide carefully whether this is what you want. Note: es5-sham.js requires
es5-shim.js to be able to work properly.

`json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.

`es6.shim.js` provides compatibility shims so that legacy JavaScript engines
behave as closely as possible to ECMAScript 6 (Harmony).

**Version**: 1.1.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_get-function-args-x--module.exports"></a>

### `module.exports(fn)` ⇒ <code>undefined</code> &#124; <code>Array</code> ⏏
This method returns the args of the function, or `undefined` if not
a function.

**Kind**: Exported function  
**Returns**: <code>undefined</code> &#124; <code>Array</code> - The args of the function, or `undefined` if
 not a function.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to get the args of. |

**Example**  
```js
var getFunctionArgs = require('get-function-args-x');

getFunctionArgs(); // undefined
getFunctionArgs(Number.MIN_VALUE); // undefined
getFunctionArgs('abc'); // undefined
getFunctionArgs(true); // undefined
getFunctionArgs({ name: 'abc' }); // undefined
getFunctionArgs(function () {}); // []
getFunctionArgs(new Function ()); // []
getFunctionArgs(function test() {}); // []
getFunctionArgs(function test(a, b) {}); // ['a', 'b']
```
