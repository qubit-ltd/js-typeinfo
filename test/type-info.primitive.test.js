////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { BIGINT_EXISTS, SYMBOL_EXISTS, SYMBOL_TO_STRING_TAG_EXISTS } from '@qubit-ltd/type-detect/src/feature-detect';
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for primitive values', () => {
  test('primitive boolean', () => {
    const expected = {
      type: 'boolean',
      category: 'boolean',
      isPrimitive: true,
      isBuiltIn: true,
      isWebApi: false,
    };
    expect(typeInfo(true)).toEqual(expected);
    expect(typeInfo(false)).toEqual(expected);
  });

  test('primitive boolean across realms', () => {
    const trueVal = runInNewContext('true');
    const falseVal = runInNewContext('false');

    const resultTrue = typeInfo(trueVal);
    expect(resultTrue.type).toBe('boolean');
    expect(resultTrue.category).toBe('boolean');
    expect(resultTrue.isPrimitive).toBe(true);
    expect(resultTrue.isBuiltIn).toBe(true);
    expect(resultTrue.isWebApi).toBe(false);

    const resultFalse = typeInfo(falseVal);
    expect(resultFalse.type).toBe('boolean');
    expect(resultFalse.category).toBe('boolean');
    expect(resultFalse.isPrimitive).toBe(true);
    expect(resultFalse.isBuiltIn).toBe(true);
    expect(resultFalse.isWebApi).toBe(false);
  });

  test('primitive number', () => {
    const expected = {
      type: 'number',
      category: 'numeric',
      isPrimitive: true,
      isBuiltIn: true,
      isWebApi: false,
    };
    expect(typeInfo(0)).toEqual(expected);
    expect(typeInfo(+0)).toEqual(expected);
    expect(typeInfo(-0)).toEqual(expected);
    expect(typeInfo(1)).toEqual(expected);
    expect(typeInfo(-1)).toEqual(expected);
    expect(typeInfo(1.5)).toEqual(expected);
    expect(typeInfo(-1.5)).toEqual(expected);
    expect(typeInfo(Infinity)).toEqual(expected);
    expect(typeInfo(-Infinity)).toEqual(expected);
    expect(typeInfo(NaN)).toEqual(expected);
  });

  test('primitive number across realms', () => {
    const num1 = runInNewContext('42');
    const num2 = runInNewContext('-3.14');
    const numInfinity = runInNewContext('Infinity');
    const numNaN = runInNewContext('NaN');

    const result1 = typeInfo(num1);
    expect(result1.type).toBe('number');
    expect(result1.category).toBe('numeric');
    expect(result1.isPrimitive).toBe(true);
    expect(result1.isBuiltIn).toBe(true);
    expect(result1.isWebApi).toBe(false);

    const result2 = typeInfo(num2);
    expect(result2.type).toBe('number');
    expect(result2.category).toBe('numeric');
    expect(result2.isPrimitive).toBe(true);
    expect(result2.isBuiltIn).toBe(true);
    expect(result2.isWebApi).toBe(false);

    const resultInf = typeInfo(numInfinity);
    expect(resultInf.type).toBe('number');
    expect(resultInf.category).toBe('numeric');
    expect(resultInf.isPrimitive).toBe(true);
    expect(resultInf.isBuiltIn).toBe(true);
    expect(resultInf.isWebApi).toBe(false);

    const resultNaN = typeInfo(numNaN);
    expect(resultNaN.type).toBe('number');
    expect(resultNaN.category).toBe('numeric');
    expect(resultNaN.isPrimitive).toBe(true);
    expect(resultNaN.isBuiltIn).toBe(true);
    expect(resultNaN.isWebApi).toBe(false);
  });

  test('primitive string', () => {
    const expected = {
      type: 'string',
      category: 'string',
      isPrimitive: true,
      isBuiltIn: true,
      isWebApi: false,
    };
    expect(typeInfo('')).toEqual(expected);
    expect(typeInfo('abc')).toEqual(expected);
  });

  test('primitive string across realms', () => {
    const str1 = runInNewContext('""');
    const str2 = runInNewContext('"hello world"');

    const result1 = typeInfo(str1);
    expect(result1.type).toBe('string');
    expect(result1.category).toBe('string');
    expect(result1.isPrimitive).toBe(true);
    expect(result1.isBuiltIn).toBe(true);
    expect(result1.isWebApi).toBe(false);

    const result2 = typeInfo(str2);
    expect(result2.type).toBe('string');
    expect(result2.category).toBe('string');
    expect(result2.isPrimitive).toBe(true);
    expect(result2.isBuiltIn).toBe(true);
    expect(result2.isWebApi).toBe(false);
  });

  if (SYMBOL_EXISTS) {
    test('primitive symbol', () => {
      const expected = {
        type: 'symbol',
        category: 'symbol',
        isPrimitive: true,
        isBuiltIn: true,
        isWebApi: false,
      };
      expect(typeInfo(Symbol(''))).toEqual(expected);
      expect(typeInfo(Symbol('xyz'))).toEqual(expected);
      if (SYMBOL_TO_STRING_TAG_EXISTS) {
        expect(typeInfo(Symbol.toStringTag)).toEqual(expected);
      }
    });

    test('primitive symbol across realms', () => {
      const sym1 = runInNewContext('Symbol("")');
      const sym2 = runInNewContext('Symbol("xyz")');

      const result1 = typeInfo(sym1);
      expect(result1.type).toBe('symbol');
      expect(result1.category).toBe('symbol');
      expect(result1.isPrimitive).toBe(true);
      expect(result1.isBuiltIn).toBe(true);
      expect(result1.isWebApi).toBe(false);

      const result2 = typeInfo(sym2);
      expect(result2.type).toBe('symbol');
      expect(result2.category).toBe('symbol');
      expect(result2.isPrimitive).toBe(true);
      expect(result2.isBuiltIn).toBe(true);
      expect(result2.isWebApi).toBe(false);

      if (SYMBOL_TO_STRING_TAG_EXISTS) {
        const symTag = runInNewContext('Symbol.toStringTag');
        const resultTag = typeInfo(symTag);
        expect(resultTag.type).toBe('symbol');
        expect(resultTag.category).toBe('symbol');
        expect(resultTag.isPrimitive).toBe(true);
        expect(resultTag.isBuiltIn).toBe(true);
        expect(resultTag.isWebApi).toBe(false);
      }
    });
  }

  if (BIGINT_EXISTS) {
    test('primitive bigint', () => {
      const expected = {
        type: 'bigint',
        category: 'numeric',
        isPrimitive: true,
        isBuiltIn: true,
        isWebApi: false,
      };
      expect(typeInfo(1n)).toEqual(expected);
      expect(typeInfo(BigInt(1))).toEqual(expected);
    });

    test('primitive bigint across realms', () => {
      const bigint1 = runInNewContext('1n');
      const bigint2 = runInNewContext('BigInt(123)');

      const result1 = typeInfo(bigint1);
      expect(result1.type).toBe('bigint');
      expect(result1.category).toBe('numeric');
      expect(result1.isPrimitive).toBe(true);
      expect(result1.isBuiltIn).toBe(true);
      expect(result1.isWebApi).toBe(false);

      const result2 = typeInfo(bigint2);
      expect(result2.type).toBe('bigint');
      expect(result2.category).toBe('numeric');
      expect(result2.isPrimitive).toBe(true);
      expect(result2.isBuiltIn).toBe(true);
      expect(result2.isWebApi).toBe(false);
    });
  }
});
