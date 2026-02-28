////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { FINALIZATIONREGISTRY_EXISTS } from '@qubit-ltd/type-detect/src/feature-detect';
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for the FinalizationRegistry object', () => {
  if (FINALIZATIONREGISTRY_EXISTS) {
    test('FinalizationRegistry', () => {
      const expected = {
        type: 'object',
        subtype: 'FinalizationRegistry',
        category: 'finalization-registry',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: FinalizationRegistry,
      };
      const registry = new FinalizationRegistry((value) => {
        console.log('An object was finalized. The value is:', value);
      });
      expect(typeInfo(registry)).toEqual(expected);
    });

    test('FinalizationRegistry across realms', () => {
      const registry = runInNewContext('new FinalizationRegistry((value) => { console.log("An object was finalized. The value is:", value); })');
      const result = typeInfo(registry);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('FinalizationRegistry');
      expect(result.category).toBe('finalization-registry');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
});
