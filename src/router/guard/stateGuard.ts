import type { Router } from 'vue-router';
import { PageRouterName } from '..';
import store from '@/store'
import { getNamespace, IModules } from '@/store';
import { USER_ACTIONS } from '@/store/modules/user';

const resetState = () => {
  // localStorage.removeItem('APP_TOKEN');
  store.dispatch(getNamespace(IModules.User, USER_ACTIONS.changeUserLogout))
  
}

export function createStateGuard(router: Router) {

  router.afterEach((to) => {
    // 跳转登录页，清空用户信息
    if(to.name === PageRouterName.Login) {
      resetState()
    }
  })
}