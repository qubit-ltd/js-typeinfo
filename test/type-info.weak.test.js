////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { WEAKMAP_EXISTS, WEAKREF_EXISTS, WEAKSET_EXISTS } from '@qubit-ltd/type-detect/src/feature-detect';
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for WeakRef object', () => {
  if (WEAKREF_EXISTS) {
    test('WeakRef', () => {
      const expected = {
        type: 'object',
        subtype: 'WeakRef',
        category: 'weak',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: WeakRef,
      };
      const obj = {};
      expect(typeInfo(new WeakRef(obj))).toEqual(expected);
    });

    test('WeakRef across realms', () => {
      const weakRef = runInNewContext('const obj = {}; new WeakRef(obj)');
      const result = typeInfo(weakRef);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('WeakRef');
      expect(result.category).toBe('weak');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (WEAKMAP_EXISTS) {
    test('WeakMap', () => {
      const expected = {
        type: 'object',
        subtype: 'WeakMap',
        category: 'weak',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: WeakMap,
      };
      expect(typeInfo(new WeakMap())).toEqual(expected);
    });

    test('WeakMap across realms', () => {
      const weakMap = runInNewContext('new WeakMap()');
      const result = typeInfo(weakMap);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('WeakMap');
      expect(result.category).toBe('weak');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (WEAKSET_EXISTS) {
    test('WeakSet', () => {
      const expected = {
        type: 'object',
        subtype: 'WeakSet',
        category: 'weak',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: WeakSet,
      };
      expect(typeInfo(new WeakSet())).toEqual(expected);
    });

    test('WeakSet across realms', () => {
      const weakSet = runInNewContext('new WeakSet()');
      const result = typeInfo(weakSet);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('WeakSet');
      expect(result.category).toBe('weak');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
});
