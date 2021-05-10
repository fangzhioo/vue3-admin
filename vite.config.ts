import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';

import pkg from './package.json';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: Date.now(),
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // command 只有两个值 ‘serve’和 ‘build’
  // mode 一般也有两个 ‘development’ 和 ‘production’

  // 返回 Node.js 进程的当前工作目录。这里指 -> 项目根目录
  const root = process.cwd();
  // 获取对应mode下的配置，即文件.env、.env.development 、.env.production 等配置
  const env = loadEnv(mode, root);

  const isBuild = command === 'build';

  // loadEnv读取的布尔类型是一个字符串。该函数可以转换为布尔类型。
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    // 项目使用的vite插件。数量大，单独提取管理
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        // scss，全局变量引入
        scss: {
          // additionalData: `@import "src/assets/styles/init.scss";`
        },
      },
    },
    resolve: {
      // 别名
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          // 通过true以防止Infinity被压缩为1/0
          keep_infinity: true,
          //  用于删除生产环境中的console
          drop_console: false,
        }
      },
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。禁用就好。
      brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）。默认 500
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              // 设置需要独立打包的npm包
              const expansions = ['ant-design-vue'];
              const c = expansions.find(exp => id.includes(`/node_modules/${exp}`));
              if (c) {
                return `expansion-${c}`;
              } else {
                return 'vendor';
              }
            }
          }
        }
      }
    },
    // 定义全局变量替换方式。
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },

  };
};
