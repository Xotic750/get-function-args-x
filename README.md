<a
  href="https://travis-ci.org/Xotic750/get-function-args-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/get-function-args-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/get-function-args-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/get-function-args-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/get-function-args-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/get-function-args-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/get-function-args-x"
  title="npm version">
<img src="https://badge.fury.io/js/get-function-args-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/get-function-args-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/get-function-args-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/get-function-args-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/get-function-args-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/get-function-args-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/get-function-args-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_get-function-args-x"></a>

## get-function-args-x

Get the args of the function.
 
<a name="exp_module_get-function-args-x--module.exports"></a>

### `module.exports(fn)` ⇒ <code>undefined</code> \| <code>Array</code> ⏏

This method returns the args of the function, or `undefined` if not
a function.

**Kind**: Exported function  
**Returns**: <code>undefined</code> \| <code>Array</code> - The args of the function, or `undefined` if
not a function.

| Param | Type                  | Description                      |
| ----- | --------------------- | -------------------------------- |
| fn    | <code>function</code> | The function to get the args of. |

**Example**

```js
import getFunctionArgs from 'get-function-args-x';

getFunctionArgs(); // undefined
getFunctionArgs(Number.MIN_VALUE); // undefined
getFunctionArgs('abc'); // undefined
getFunctionArgs(true); // undefined
getFunctionArgs({name: 'abc'}); // undefined
getFunctionArgs(function() {}); // []
getFunctionArgs(new Function()); // []
getFunctionArgs(function test() {}); // []
getFunctionArgs(function test(a, b) {}); // ['a', 'b']
getFunctionArgs(function* test(a, b) {}); // ['a', 'b']
getFunctionArgs((a, b) => {}); // ['a', 'b']
getFunctionArgs(async function test(a, b) {}); // ['a', 'b']
```
