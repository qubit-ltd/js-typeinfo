////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ASYNC_FUNCTION_EXISTS } from '@qubit-ltd/type-detect/src/feature-detect';
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for function values', () => {
  test('function', () => {
    const expected = {
      type: 'function',
      subtype: 'Function',
      category: 'function',
      isPrimitive: false,
      isBuiltIn: true,
      isWebApi: false,
    };
    expect(typeInfo(() => {})).toEqual(expected);
  });

  test('function across realms', () => {
    const fn = runInNewContext('() => {}');
    const result = typeInfo(fn);
    expect(result.type).toBe('function');
    expect(result.subtype).toBe('Function');
    expect(result.category).toBe('function');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(true);
    expect(result.isWebApi).toBe(false);
  });

  test('generator function', () => {
    const expected = {
      type: 'function',
      subtype: 'GeneratorFunction',
      category: 'function',
      isPrimitive: false,
      isBuiltIn: true,
      isWebApi: false,
    };
    function* foo() {
      yield 'a';
      yield 'b';
      yield 'c';
    }
    expect(typeInfo(foo)).toEqual(expected);
  });

  test('generator function across realms', () => {
    const genFn = runInNewContext('function* foo() { yield "a"; yield "b"; yield "c"; }; foo');
    const result = typeInfo(genFn);
    expect(result.type).toBe('function');
    expect(result.subtype).toBe('GeneratorFunction');
    expect(result.category).toBe('function');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(true);
    expect(result.isWebApi).toBe(false);
  });

  if (ASYNC_FUNCTION_EXISTS) {
    test('async function', async () => {
      const expected = {
        type: 'function',
        subtype: 'AsyncFunction',
        category: 'function',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
      };
      async function myFunc() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('foo');
          }, 300);
        });
      }
      expect(typeInfo(myFunc)).toEqual(expected);
    });

    test('async function across realms', async () => {
      const asyncFn = runInNewContext('async function myFunc() { await new Promise(resolve => { setTimeout(() => { resolve("foo"); }, 300); }); }; myFunc');
      const result = typeInfo(asyncFn);
      expect(result.type).toBe('function');
      expect(result.subtype).toBe('AsyncFunction');
      expect(result.category).toBe('function');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
    });

    test('async generator function', () => {
      const expected = {
        type: 'function',
        subtype: 'AsyncGeneratorFunction',
        category: 'function',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
      };
      async function* foo() {
        yield await Promise.resolve('a');
        yield await Promise.resolve('b');
        yield await Promise.resolve('c');
      }
      expect(typeInfo(foo)).toEqual(expected);
    });

    test('async generator function across realms', () => {
      const asyncGenFn = runInNewContext('async function* foo() { yield await Promise.resolve("a"); yield await Promise.resolve("b"); yield await Promise.resolve("c"); }; foo');
      const result = typeInfo(asyncGenFn);
      expect(result.type).toBe('function');
      expect(result.subtype).toBe('AsyncGeneratorFunction');
      expect(result.category).toBe('function');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
    });
  }

  test('function with null constructor', () => {
    const f = function f() {};
    Object.defineProperty(f, 'constructor', { value: null, configurable: true });
    const result = typeInfo(f);
    expect(result.subtype).toBe('Function');
    expect(result.category).toBe('function');
  });
});
