import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';

import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    // vueJsx(),
  ];

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    console.log('vite plugin in build env')
  }

  return vitePlugins;
}
