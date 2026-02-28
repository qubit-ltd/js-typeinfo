////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { runInNewContext } from 'node:vm';
import {
  ARRAYBUFFER_EXISTS,
  SHAREDARRAYBUFFER_EXISTS,
} from '@qubit-ltd/type-detect/src/feature-detect';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for buffer objects', () => {
  if (ARRAYBUFFER_EXISTS) {
    test('ArrayBuffer', () => {
      const expected = {
        type: 'object',
        subtype: 'ArrayBuffer',
        category: 'buffer',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: ArrayBuffer,
      };
      expect(typeInfo(new ArrayBuffer(2))).toEqual(expected);
    });

    test('ArrayBuffer across realms', () => {
      const buffer = runInNewContext('new ArrayBuffer(2)');
      const result = typeInfo(buffer);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('ArrayBuffer');
      expect(result.category).toBe('buffer');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (SHAREDARRAYBUFFER_EXISTS) {
    test('SharedArrayBuffer', () => {
      const expected = {
        type: 'object',
        subtype: 'SharedArrayBuffer',
        category: 'buffer',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: SharedArrayBuffer,
      };
      expect(typeInfo(new SharedArrayBuffer(2))).toEqual(expected);
    });

    test('SharedArrayBuffer across realms', () => {
      const buffer = runInNewContext('new SharedArrayBuffer(2)');
      const result = typeInfo(buffer);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('SharedArrayBuffer');
      expect(result.category).toBe('buffer');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
});
