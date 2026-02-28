////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isGlobalObject } from '@qubit-ltd/type-detect';
import getObjectTypeInfo from './get-object-type-info';

/**
 * Gets the information about the type of the specified value.
 *
 * This function returns the information about the precise type of the specified
 * value. The returned information is an object with the following properties:
 * - `type: string`: the name of the type of the specified value. This is the
 *   same as the value returned by the built-in `typeof` operator, except that
 *   the type of `null` is `'null'` instead of `'object'`.
 * - `subtype: string`: the name of the subtype of the specified value. This
 *   property is only present when the type of the specified value is `'object'`
 *   or `'function'`.
 * - `category: string`: the category of ths specified value. This property is
 *   present for all type of values.
 * - `isPrimitive: boolean`: whether the specified value is a primitive value.
 * - `isBuiltIn: boolean`: whether the specified value is a JavaScript built-in
 *    primitive or built-in object.
 * - `isWebApi: boolean`: whether the specified value is a Web API built-in object.
 * - `constructor: function`: the constructor function of the specified value.
 *   This property is only present when the type of the specified value is
 *   `'object'`.
 *
 * The possible `type` values are:
 *
 * - `'undefined'`: if the value is `undefined`.
 * - `'null'`: if the value is `null`.
 * - `'boolean'`: if the value is a primitive boolean value.
 * - `'number'`: if the value is a primitive number value.
 * - `'string'`: if the value is a primitive string value.
 * - `'symbol'`: if the value is a symbol value.
 * - `'bigint'`: if the value is a primitive bigint value.
 * - `'function'`: if the value is a function.
 * - `'object'`: if the value is a plain object.
 *
 * If the value is of the type `function` or `object`, the type information
 * object returned by `typeInfo()` has a `subtype` property, which is the name
 * of the detailed subtype of the specified value.
 *
 * The possible `subtype` names of the `'function'` type are:
 *
 * - `'Function'`: if the value is a sync function.
 * - `'GeneratorFunction'`: if the value is a sync generator function.
 * - `'AsyncFunction'`: if the value is an async function.
 * - `'AsyncGeneratorFunction'`: if the value is an async generator function.
 *
 * Note that the `'AsyncFunction'` and `'AsyncGeneratorFunction'` subtypes are
 * only available in the JavaScript engine that support the async functions.
 *
 * The possible `subtype` names of the `'object'` type are:
 *
 * - `'Boolean'`: if the value is a JavaScript built-in `Boolean` object.
 * - `'Number'`: if the value is a JavaScript built-in `Number` object.
 * - `'String'`: if the value is a JavaScript built-in `String` object.
 * - `'RegExp'`: if the value is a regular expression, i.e., the JavaScript
 *   built-in `RegExp` object.
 * - `'Date'`: if the value is a JavaScript built-in `Date` object.
 * - `'Map'`: if the value is a JavaScript built-in `Map` object.
 * - `'WeakMap'`: if the value is a JavaScript built-in `WeakMap` object.
 * - `'Set'`: if the value is a JavaScript built-in `Set` object.
 * - `'WeakSet'`: if the value is a JavaScript built-in `WeakSet` object.
 * - `'Array'`: if the value is a JavaScript built-in `Array` object.
 * - `'Int8Array'`: if the value is a JavaScript built-in `Int8Array` object.
 * - `'Uint8Array'`: if the value is a JavaScript built-in `Uint8Array` object.
 * - `'Uint8ClampedArray'`: if the value is a JavaScript built-in
 *   `Uint8ClampedArray` object.
 * - `'Int16Array'`: if the value is a JavaScript built-in `Int16Array` object.
 * - `'Uint16Array'`: if the value is a JavaScript built-in `Uint16Array` object.
 * - `'Int32Array'`: if the value is a JavaScript built-in `Int32Array` object.
 * - `'Uint32Array'`: if the value is a JavaScript built-in `Uint32Array` object.
 * - `'BigInt64Array'`: if the value is a JavaScript built-in `BigInt64Array` object.
 * - `'BigUint64Array'`: if the value is a JavaScript built-in `BigUint64Array` object.
 * - `'Float32Array'`: if the value is a JavaScript built-in `Float32Array` object.
 * - `'Float64Array'`: if the value is a JavaScript built-in `Float64Array` object.
 * - `'ArrayBuffer'`: if the value is a JavaScript built-in `ArrayBuffer` object.
 * - `'SharedArrayBuffer'`: if the value is a JavaScript built-in
 *   `SharedArrayBuffer` object.
 * - `'DataView'`: if the value is a JavaScript built-in `DataView` object.
 * - `'WeakRef'`: if the value is a JavaScript built-in `WeakRef` object.
 * - `'Promise'`: if the value is a JavaScript built-in `Promise` object.
 * - `'Error'`: if the value is an object of the JavaScript built-in `Error` class.
 * - `'EvalError'`: if the value is an object of the JavaScript built-in
 *   `EvalError` class.
 * - `'RangeError'`: if the value is an object of the JavaScript built-in
 *   `RangeError` class.
 * - `'ReferenceError'`: if the value is an object of the JavaScript built-in
 *   `ReferenceError` class.
 * - `'SyntaxError'`: if the value is an object of the JavaScript built-in
 *   `SyntaxError` class.
 * - `'TypeError'`: if the value is an object of the JavaScript built-in
 *   `TypeError` class.
 * - `'URIError'`: if the value is an object of the JavaScript built-in
 *   `URIError` class.
 * - `'AggregateError'`: if the value is an object of the JavaScript built-in
 *   `AggregateError` class.
 * - `'InternalError'`: if the value is an object of the JavaScript built-in
 *   `InternalError` class.
 * - `'Intl.Collator'`: if the value is a JavaScript built-in
 *   `Intl.Collator` object.
 * - `'Intl.DateTimeFormat'`: if the value is a JavaScript built-in
 *   `Intl.DateTimeFormat` object.
 * - `'Intl.DisplayNames'`: if the value is a JavaScript built-in
 *   `Intl.DisplayNames` object.
 * - `'Intl.DurationFormat'`: if the value is a JavaScript built-in
 *   `Intl.DurationFormat` object.
 * - `'Intl.ListFormat'`: if the value is a JavaScript built-in
 *   `Intl.ListFormat` object.
 * - `'Intl.Locale'`: if the value is a JavaScript built-in `Intl.Locale`
 *   object.
 * - `'Intl.NumberFormat'`: if the value is a JavaScript built-in
 *   `Intl.NumberFormat` object.
 * - `'Intl.PluralRules'`: if the value is a JavaScript built-in
 *   `Intl.PluralRules` object.
 * - `'Intl.RelativeTimeFormat'`: if the value is a JavaScript built-in
 *   `Intl.RelativeTimeFormat` object.
 * - `'Intl.Segmenter'`: if the value is a JavaScript built-in
 *   `Intl.Segmenter` object.
 * - `'MapIterator'`: if the value is a Map Iterator returned by
 *     - `Map.prototype.values()`,
 *     - `Map.prototype.keys()`,
 *     - `Map.prototype.entries()`, and
 *     - `Map.prototype[@@iterator]()`.
 * - `'SetIterator'`: if the value is a Set Iterator returned by
 *     - `Set.prototype.values()`,
 *     - `Set.prototype.keys()`,
 *     - `Set.prototype.entries()`, and
 *     - `Set.prototype[@@iterator]()`.
 * - `'ArrayIterator'`: if the value is a `Array` iterator returned by
 *     - `Array.prototype.values()`,
 *     - `Array.prototype.keys()`,
 *     - `Array.prototype.entries()`,
 *     - `Array.prototype[@@iterator]()`,
 *     - `TypedArray.prototype.values()`,
 *     - `TypedArray.prototype.keys()`, and
 *     - `TypedArray.prototype.entries()`.
 * - `'StringIterator'`: if the value is a String Iterator returned by
 *     - `String.prototype[@@iterator]()`.
 * - `'RegExpStringIterator'`: if the value is a RegExp String Iterator returned by
 *     - `RegExp.prototype[@@matchAll]()`, and
 *     - `String.prototype.matchAll()`.
 * - `'SegmenterStringIterator'`: if the value is a Segments Iterator returned by
 *     - the `[@@iterator]()` method of the Segments object returned by
 *       `Intl.Segmenter.prototype.segment()`.
 * - `FinalizationRegistry`: if the value is an instance of the `FinalizationRegistry`
 *   class.
 * - `'Arguments`: if the value is the JavaScript built-in `arguments` object,
 *   which is a special array-like object storing the calling arguments of a
 *   function.
 * - `'Generator'`: if the value is a generator object, i.e., the object returned
 *   by a sync generator function.
 * - `'AsyncGenerator'`: if the value is an async generator object, i.e., the
 *   object returned by an async generator function.
 * - `'GlobalObject'`: if the value is the global object. A global object is an
 *   object that always exists in the global scope.
 * - `'Object'`: if the value is a plain JavaScript object, i.e., an object defined
 *   by the syntax of `obj = { ... }`.
 * - `''` (empty string): if the value is an instance of a user defined anonymous class.
 * - `value[Symbol.toStringTag]`: if the value has a customized `Symbol.toStringTag`
 *   property.
 * - `value.constructor.name`: if the value has a constructor with a name, and
 *   the name is not `'Object'`. That is, if the value is an instance of a user
 *   defined class, and the class has a name, the `subtype` is the name of that
 *   class.
 * - the name extracted from `value.toString()`: if the value does not match
 *   any of the above cases, the `subtype` is the name extracted from the
 *   `value.toString()` result (usually a string of the form `'[object XXX]'`),
 *   and removes any inner spaces in the name. For example, if the `value.toString()`
 *   result is `'[object My Class ]'`, the `subtype` is `'MyClass'`.
 *
 * The type information object returned by `typeInfo()` has a `category` property,
 * which is a string that describes the category of the value. The possible values
 * of the `category` property are:
 *
 * - `'null'`: if the value is `null`.
 * - `'undefined'`: if the value is `undefined`.
 * - `'boolean'`: if the value is a primitive `boolean` value or a built-in
 *   `Boolean` object.
 * - `'numeric'`: if the value is a primitive `number` value, or a primitive
 *   `bigint` value, or a built-in `Number` object.
 * - `'string'`: if the value is a primitive `string` value, or a built-in
 *   `String` object.
 * - `'symbol'`: if the value is a primitive `symbol` value.
 * - `'function'`: if the value is a function, including sync functions, async
 *   functions, sync generator functions, and async generator functions.
 * - `'regexp'`: if the value is a regular expression, i.e., the JavaScript
 *   built-in `RegExp` object.
 * - `'date'`: if the value is a JavaScript built-in `Date` object.
 * - `'map'`: if the value is a JavaScript built-in `Map` object.
 * - `'set'`: if the value is a JavaScript built-in `Set` object.
 * - `'array'`: if the value is a JavaScript built-in `Array` object.
 * - `'typed-array'`: if the value is a JavaScript built-in typed array object,
 *   including `'Int8Array'`, `'Uint8Array'`, `'Uint8ClampedArray'`,
 *   `'Int16Array'`, `'Uint16Array'`, `'Int32Array'`, `'Uint32Array'`,
 *   `'BigInt64Array'`, `'BigUint64Array'`, `'Float32Array'`, and `'Float64Array'`.
 * - `'buffer'`: if the value is a JavaScript built-in buffer object, including
 *     `'ArrayBuffer'` and `'SharedArrayBuffer'`.
 * - `'data-view'`: if the value is a JavaScript built-in `DataView` object.
 * - `'weak'`: if the value is a JavaScript built-in `WeakMap`, `WeakSet`, or
 *   `WeakRef` object. Note that weak referenced objects cannot be cloned.
 * - `'promise'`: if the value is a JavaScript built-in `Promise` object.
 * - `'error'`: if the value is an object of the JavaScript built-in `Error` class,
 *   or an object of a subclass of the `Error` class.
 * - `'intl'`: if the value is a JavaScript built-in object under the `Intl`
 *   namespace, including `'Intl.Collator'`, `'Intl.DateTimeFormat'`,
 *   `'Intl.DisplayNames'`, `'Intl.DurationFormat'`, `'Intl.ListFormat'`,
 *   `'Intl.Locale'`, `'Intl.NumberFormat'`, `'Intl.PluralRules'`, and
 *   `'Intl.RelativeTimeFormat'`.
 * - `'iterator'`: if the value is an iterator object, including `'MapIterator'`,
 *   `'SetIterator'`, `'ArrayIterator'`, `'StringIterator'`, `'RegExpStringIterator'`,
 *   and `'SegmenterStringIterator'`.
 * - `'finalization-registry'`: if the value is an instance of the JavaScript built-in
 *   `FinalizationRegistry` class. A `FinalizationRegistry` object lets you request
 *   a callback when a value is garbage-collected.
 * - `'global'`: if the value is the [global object].
 * - `'arguments'`: if the value is the JavaScript built-in `arguments` object.
 * - `'generator'`: if the value is a generator object, i.e., the object returned
 *   by a sync generator function, including `'Generator'` and `'AsyncGenerator'`.
 * - `'DOM'`: if the value is a DOM object, e.g., the `document`, `window`, `Element`, etc.
 * - `'CSSOM'`: if the value is a CSSOM object, e.g., the `document.styleSheets`, etc.
 * - `'event'`: if the value is a event object, i.e., the `Event` and all its subclasses.
 * - `'file'`: if the value is a File API object, i.e., the `File`, `Blob`, `FileList`, etc.
 * - `'console'`: if the value is the `window.console` object.
 * - `'object'`: if the value is a plain JavaScript object.
 * - `'class'`: if the value is an instance of a user defined class.
 *
 * @param {any} value
 *     the specified value.
 * @returns {object}
 *     the information about the type of the specified value.
 * @author Haixing Hu
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
 */
function typeInfo(value) {
  if (value === null) {
    return {
      type: 'null',
      category: 'null',
      isPrimitive: true,
      isBuiltIn: true,
      isWebApi: false,
    };
  }
  const type = typeof value;
  switch (type) {
    case 'number':
    case 'bigint':
      return {
        type,
        category: 'numeric',
        isPrimitive: true,
        isBuiltIn: true,
        isWebApi: false,
      };
    case 'string':
    case 'boolean':
    case 'symbol':
    case 'undefined':
      return {
        type,
        category: type,
        isPrimitive: true,
        isBuiltIn: true,
        isWebApi: false,
      };
    case 'function':
      return {
        type: 'function',
        subtype: value.constructor?.name || 'Function',
        category: 'function',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
      };
    case 'object':
      if (isGlobalObject(value)) {
        return {
          type: 'object',
          subtype: 'GlobalObject',
          category: 'global',
          isPrimitive: false,
          isBuiltIn: true,
          isWebApi: false,
          constructor: value.constructor,
        };
      }
      return getObjectTypeInfo(value);
    default:
      // should not reach here unless new types are added to JS
      return {
        type,
        category: type,
        isPrimitive: true,
        isBuiltIn: true,
        isWebApi: false,
      };
  }
}

export default typeInfo;
