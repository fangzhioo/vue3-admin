import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    viteMockServe({ supportTs: true })
  ],
  css: {
    preprocessorOptions: {
      // scss，全局变量引入
      scss: {
        // additionalData: `@import "src/assets/styles/init.scss";`
      }
    }
  },
  resolve: {
    // 别名
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
    }
  },
})
