import { IActionTree, IModule, IMutationTree } from '..';

export enum PERMISSION_MUTATIONS {
  setPermCodeList = 'setPermCodeList'
}

export enum PERMISSION_ACTIONS {
  changePermCodeList = 'changePermCodeList'
}

export interface PermissionState {
  /**
   * 权限code列表
   */
  permCodeList: string[];
}

const state = (): PermissionState => ({
  permCodeList: []
});

const mutations: IMutationTree<PERMISSION_MUTATIONS ,PermissionState> = {
  [PERMISSION_MUTATIONS.setPermCodeList]: (state, permCodeList) => {
    state.permCodeList = permCodeList;
  }
}

const actions: IActionTree<PERMISSION_ACTIONS ,PermissionState> = {
  [PERMISSION_ACTIONS.changePermCodeList]: () => {}
}

const permissionModule: IModule<PermissionState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default permissionModule;
