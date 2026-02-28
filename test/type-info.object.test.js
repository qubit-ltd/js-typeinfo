////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/* eslint-disable no-new-object */

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for plain object', () => {
  test('plain object', () => {
    const expected = {
      type: 'object',
      subtype: 'Object',
      category: 'object',
      isPrimitive: false,
      isBuiltIn: false,
      isWebApi: false,
      constructor: Object,
    };
    expect(typeInfo({ x: 1 })).toEqual(expected);
  });

  test('plain object across realms', () => {
    const obj = runInNewContext('({ x: 1 })');
    const result = typeInfo(obj);
    expect(result.type).toBe('object');
    expect(result.subtype).toBe('Object');
    expect(result.category).toBe('object');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(false);
    expect(result.isWebApi).toBe(false);
    expect(result.constructor).toBeDefined();
  });

  test('normal object', () => {
    const expected = {
      type: 'object',
      subtype: 'Object',
      category: 'object',
      isPrimitive: false,
      isBuiltIn: false,
      isWebApi: false,
      constructor: Object,
    };
    const obj = new Object({ x: 1 });
    expect(typeInfo(obj)).toEqual(expected);
  });

  test('normal object across realms', () => {
    const obj = runInNewContext('new Object({ x: 1 })');
    const result = typeInfo(obj);
    expect(result.type).toBe('object');
    expect(result.subtype).toBe('Object');
    expect(result.category).toBe('object');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(false);
    expect(result.isWebApi).toBe(false);
    expect(result.constructor).toBeDefined();
  });

  test('normal object with customized toStringTag', () => {
    const expected = {
      type: 'object',
      subtype: 'MyObject',
      category: 'object',
      isPrimitive: false,
      isBuiltIn: false,
      isWebApi: false,
      constructor: Object,
    };
    const obj = new Object({ x: 1 });
    obj[Symbol.toStringTag] = 'MyObject';
    expect(typeInfo(obj)).toEqual(expected);
  });

  test('normal object with customized toStringTag across realms', () => {
    const obj = runInNewContext('const obj = new Object({ x: 1 }); obj[Symbol.toStringTag] = "MyObject"; obj');
    const result = typeInfo(obj);
    expect(result.type).toBe('object');
    expect(result.subtype).toBe('MyObject');
    expect(result.category).toBe('object');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(false);
    expect(result.isWebApi).toBe(false);
    expect(result.constructor).toBeDefined();
  });

  test('object with null prototype', () => {
    const expected = {
      type: 'object',
      subtype: 'Object',
      category: 'object',
      isPrimitive: false,
      isBuiltIn: false,
      isWebApi: false,
      constructor: undefined,
    };
    const obj = Object.create(null);
    expect(typeInfo(obj)).toEqual(expected);
  });
});
