////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  INTL_COLLATOR_EXISTS,
  INTL_DATETIMEFORMAT_EXISTS,
  INTL_DISPLAYNAMES_EXISTS,
  INTL_DURATIONFORMAT_EXISTS,
  INTL_LISTFORMAT_EXISTS,
  INTL_LOCALE_EXISTS,
  INTL_NUMBERFORMAT_EXISTS,
  INTL_PLURALRULES_EXISTS,
  INTL_RELATIVETIMEFORMAT_EXISTS,
  INTL_SEGMENTER_EXISTS,
} from '@qubit-ltd/type-detect/src/feature-detect';
import { runInNewContext } from 'node:vm';
import typeInfo from '../src';

/**
 * Unit test of the `typeInfo()` function.
 *
 * @author Haixing Hu
 */
describe('Test the `typeInfo()` function for objects under the Intl namespace', () => {
  if (INTL_COLLATOR_EXISTS) {
    test('Intl.Collator', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.Collator',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.Collator,
      };
      expect(typeInfo(new Intl.Collator('zh'))).toEqual(expected);
    });

    test('Intl.Collator across realms', () => {
      const collator = runInNewContext('new Intl.Collator("zh")');
      const result = typeInfo(collator);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.Collator');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_DATETIMEFORMAT_EXISTS) {
    test('Intl.DateTimeFormat', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.DateTimeFormat',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.DateTimeFormat,
      };
      expect(typeInfo(new Intl.DateTimeFormat('zh'))).toEqual(expected);
    });

    test('Intl.DateTimeFormat across realms', () => {
      const dateTimeFormat = runInNewContext('new Intl.DateTimeFormat("zh")');
      const result = typeInfo(dateTimeFormat);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.DateTimeFormat');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_DISPLAYNAMES_EXISTS) {
    test('Intl.DisplayNames', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.DisplayNames',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.DisplayNames,
      };
      expect(typeInfo(new Intl.DisplayNames('zh', { type: 'region' })))
        .toEqual(expected);
    });

    test('Intl.DisplayNames across realms', () => {
      const displayNames = runInNewContext('new Intl.DisplayNames("zh", { type: "region" })');
      const result = typeInfo(displayNames);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.DisplayNames');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_DURATIONFORMAT_EXISTS) {
    test('Intl.DurationFormat', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.DurationFormat',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.DurationFormat,
      };
      expect(typeInfo(new Intl.DurationFormat('zh', { style: 'long' })))
        .toEqual(expected);
    });

    test('Intl.DurationFormat across realms', () => {
      const durationFormat = runInNewContext('new Intl.DurationFormat("zh", { style: "long" })');
      const result = typeInfo(durationFormat);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.DurationFormat');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_LISTFORMAT_EXISTS) {
    test('Intl.ListFormat', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.ListFormat',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.ListFormat,
      };
      expect(typeInfo(new Intl.ListFormat('zh'))).toEqual(expected);
    });

    test('Intl.ListFormat across realms', () => {
      const listFormat = runInNewContext('new Intl.ListFormat("zh")');
      const result = typeInfo(listFormat);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.ListFormat');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_LOCALE_EXISTS) {
    test('Intl.Locale', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.Locale',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.Locale,
      };
      expect(typeInfo(new Intl.Locale('zh'))).toEqual(expected);
    });

    test('Intl.Locale across realms', () => {
      const locale = runInNewContext('new Intl.Locale("zh")');
      const result = typeInfo(locale);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.Locale');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_NUMBERFORMAT_EXISTS) {
    test('Intl.NumberFormat', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.NumberFormat',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.NumberFormat,
      };
      expect(typeInfo(new Intl.NumberFormat('zh'))).toEqual(expected);
    });

    test('Intl.NumberFormat across realms', () => {
      const numberFormat = runInNewContext('new Intl.NumberFormat("zh")');
      const result = typeInfo(numberFormat);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.NumberFormat');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_PLURALRULES_EXISTS) {
    test('Intl.PluralRules', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.PluralRules',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.PluralRules,
      };
      expect(typeInfo(new Intl.PluralRules('zh'))).toEqual(expected);
    });

    test('Intl.PluralRules across realms', () => {
      const pluralRules = runInNewContext('new Intl.PluralRules("zh")');
      const result = typeInfo(pluralRules);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.PluralRules');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_RELATIVETIMEFORMAT_EXISTS) {
    test('Intl.RelativeTimeFormat', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.RelativeTimeFormat',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.RelativeTimeFormat,
      };
      expect(typeInfo(new Intl.RelativeTimeFormat('zh'))).toEqual(expected);
    });

    test('Intl.RelativeTimeFormat across realms', () => {
      const relativeTimeFormat = runInNewContext('new Intl.RelativeTimeFormat("zh")');
      const result = typeInfo(relativeTimeFormat);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.RelativeTimeFormat');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }
  if (INTL_SEGMENTER_EXISTS) {
    test('Intl.Segmenter', () => {
      const expected = {
        type: 'object',
        subtype: 'Intl.Segmenter',
        category: 'intl',
        isPrimitive: false,
        isBuiltIn: true,
        isWebApi: false,
        constructor: Intl.Segmenter,
      };
      expect(typeInfo(new Intl.Segmenter('zh'))).toEqual(expected);
    });

    test('Intl.Segmenter across realms', () => {
      const segmenter = runInNewContext('new Intl.Segmenter("zh")');
      const result = typeInfo(segmenter);
      expect(result.type).toBe('object');
      expect(result.subtype).toBe('Intl.Segmenter');
      expect(result.category).toBe('intl');
      expect(result.isPrimitive).toBe(false);
      expect(result.isBuiltIn).toBe(true);
      expect(result.isWebApi).toBe(false);
      expect(result.constructor).toBeDefined();
    });
  }

  test('Intl object with null constructor', () => {
    const collator = new Intl.Collator('zh');
    Object.defineProperty(collator, 'constructor', { value: null, configurable: true });
    const result = typeInfo(collator);
    expect(result.subtype).toBe('');
    expect(result.category).toBe('intl');
  });
});

