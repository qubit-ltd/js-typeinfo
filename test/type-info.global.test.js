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

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for global object', () => {
  test('global object', () => {
    const expected = {
      type: 'object',
      subtype: 'GlobalObject',
      category: 'global',
      constructor: Window,
      isPrimitive: false,
      isBuiltIn: true,
      isWebApi: false,
    };

    expect(typeInfo(globalThis)).toEqual(expected);
  });

  test('global object across realms', () => {
    const globalObj = runInNewContext('globalThis');
    const result = typeInfo(globalObj);
    expect(result.type).toBe('object');
    expect(result.subtype).toBe('GlobalObject');
    expect(result.category).toBe('global');
    expect(result.isPrimitive).toBe(false);
    expect(result.isBuiltIn).toBe(true);
    expect(result.isWebApi).toBe(false);
    expect(result.constructor).toBeDefined();
  });
});
