import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import Antd from 'ant-design-vue';

import "ant-design-vue/dist/antd.css"; 

const app = createApp(App);

// 注册store
setupStore(app);

// 注册router
setupRouter(app);
// 注册router guard
setupRouterGuard();

// 注册ant-design-vue
app.use(Antd);

app.mount('#app', true);

if (import.meta.env.DEV) {
  window.__APP__ = app;
}
