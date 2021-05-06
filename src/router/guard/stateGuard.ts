import type { Router } from 'vue-router';
import { PageRouterName } from '..';

const resetState = () => {
  localStorage.removeItem('APP_TOKEN');
}

export function createStateGuard(router: Router) {

  router.afterEach((to) => {
    // 跳转登录页，清空用户信息
    if(to.name === PageRouterName.Login) {
      resetState()
    }
  })
}