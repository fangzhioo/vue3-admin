import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'

const app = createApp(App);

// 注册router
setupRouter(app);
// 注册router guard
setupRouterGuard();

app.mount('#app')
