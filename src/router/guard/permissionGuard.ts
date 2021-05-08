import type { Router } from 'vue-router';
import { PageRouterName } from '..';
import store from '@/store';

const getAppToken = () => store.state.user.token;

export function createPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 如果设置了页面无需登录，则直接跳转
    if (to.meta.ignoreAuth === true) {
      next();
      return;
    }

    // 登录页跳转到404页面时，重定向到首页
    if (from.name === PageRouterName.Login && to.name === PageRouterName.ErrorPage) {
      next({
        name: PageRouterName.Root,
      });
      // 这里的return是必须的，防止执行两次next
      return;
    }

    const isAuthenticated = getAppToken();
    // 判断登录
    if (to.name !== PageRouterName.Login && !isAuthenticated) {
      next({
        name: PageRouterName.Login,
      });
      return;
    }

    next();
  });
}
