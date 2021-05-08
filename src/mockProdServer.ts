//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
const modules = import.meta.globEager('../mock/**/*.ts');
// import testModule from '../mock/test';
// import userModule from '../mock/user';
const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

export function setupProdMockServer() {
  createProdMockServer([...mockModules ]);
}