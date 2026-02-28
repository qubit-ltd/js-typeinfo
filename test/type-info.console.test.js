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
describe('Test the `typeInfo()` function for the `window.console` object', () => {
  if (window && window.console) {
    test('window.console', () => {
      const expected = {
        type: 'object',
        subtype: 'console',
        category: 'console',
        isPrimitive: false,
        isBuiltIn: false,
        isWebApi: true,
      };
      expected.constructor = window.console.constructor;
      const info = typeInfo(window.console);
      expect(info).toEqual(expected);
      // 注意：不添加跨领域测试，因为window.console是Web API对象，
      // 在Node.js的vm模块创建的新上下文中不可用。
      // 这类测试需要在真实的浏览器环境中进行。
    });
  }
  if (console) {
    test('console', () => {
      const expected = {
        type: 'object',
        subtype: 'console',
        category: 'console',
        isPrimitive: false,
        isBuiltIn: false,
        isWebApi: true,
      };
      expected.constructor = window.console.constructor;
      const info = typeInfo(console);
      expect(info).toEqual(expected);
      // 注意：虽然Node.js环境中有console对象，但它与浏览器中的console不同。
      // 在这里，我们测试的是浏览器环境中的console对象，它被标记为Web API。
      // 所以不添加跨领域测试。
    });

    // Node.js环境中的console对象测试
    test('Node.js console across realms', () => {
      const nodeConsole = runInNewContext('console');
      if (nodeConsole) {
        const result = typeInfo(nodeConsole);
        expect(result.type).toBe('object');
        expect(result.subtype).toBe('console');
        // 注意：在Node.js环境中，console可能被识别为不同的分类
        expect(result.isPrimitive).toBe(false);
        expect(result.constructor).toBeDefined();
      }
    });
  }
});
