import { RoleEnum } from '@/constants/role';
import { UserInfo } from '@/constants/user';
import { IActionTree, IModule, IMutationTree } from '..';
import router, { PageRouterName } from '@/router';
import { getCurrentUserInfo, postUserLogin } from '@/api/user';

const APP_TOKEN_KEY = 'APP_TOKEN_KEY';
const getAppToken = () => localStorage.getItem(APP_TOKEN_KEY) || undefined;
const setAppToken = (token: string) => localStorage.setItem(APP_TOKEN_KEY, token);

export enum USER_MUTATIONS {
  setToken = 'setToken',
  setUserInfo = 'setUserInfo',
  setRoleList = 'setRoleList',
}

export enum USER_ACTIONS {
  fetchCurrentUserInfo = 'fetchCurrentUserInfo',
  fetchUserLogin = 'fetchUserLogin',
  changeUserLogout = 'changeUserLogout',
}

export interface UserState {
  /**
   * 用户信息
   */
  userInfo: Nullable<UserInfo>;
  /**
   * 用户token
   */
  token?: string;
  /**
   * 用户角色列表
   */
  roleList: RoleEnum[];
}

const state = (): UserState => ({
  token: getAppToken(),
  userInfo: null,
  roleList: [],
});

const mutations: IMutationTree<USER_MUTATIONS, UserState> = {
  [USER_MUTATIONS.setToken]: (state, token) => {
    state.token = token;
  },
  [USER_MUTATIONS.setRoleList]: (state, roles) => {
    state.roleList = roles;
  },
  [USER_MUTATIONS.setUserInfo]: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};

const actions: IActionTree<USER_ACTIONS, UserState> = {
  [USER_ACTIONS.fetchCurrentUserInfo]: ({ commit }) => {
    getCurrentUserInfo().then((res) => {
      if (res.code === 200) {
        setAppToken(res.data.token);
        commit(USER_MUTATIONS.setToken, res.data.token);
        commit(USER_MUTATIONS.setRoleList, res.data.roleList);
        commit(USER_MUTATIONS.setUserInfo, res.data.userInfo);
      } else {
        throw new Error(res.message);
      }
    })
    .catch(() => {
      commit(USER_ACTIONS.changeUserLogout);
      router.replace({
        name: PageRouterName.Login,
      });
    });
  },
  [USER_ACTIONS.fetchUserLogin]: ({ commit }, payload) => {
    return postUserLogin(payload).then((res) => {
        console.log(res);
        if (res.code === 200) {
          setAppToken(res.data.token);
          commit(USER_MUTATIONS.setToken, res.data.token);
          commit(USER_MUTATIONS.setRoleList, res.data.roleList);
          commit(USER_MUTATIONS.setUserInfo, res.data.userInfo);
        } else {
          throw new Error(res.message);
        }
      });
  },
  [USER_ACTIONS.changeUserLogout]: ({ commit }) => {
    commit(USER_MUTATIONS.setToken, undefined);
    commit(USER_MUTATIONS.setRoleList, []);
    commit(USER_MUTATIONS.setUserInfo, null);
  },
};

const userModule: IModule<UserState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default userModule;
