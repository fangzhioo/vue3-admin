import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import ElementPlus from 'element-plus';

// 导入element-plus的样式 
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

// 注册store
setupStore(app);

// 注册router
setupRouter(app);
// 注册router guard
setupRouterGuard();

// 注册element-plus
app.use(ElementPlus, { size: 'small' })

app.mount('#app');
