
import { App } from 'vue';
import { Action, createStore, Module, Mutation, Store, useStore as useVuexStore } from "vuex";
import permissionModule, { PermissionState } from './modules/permission';
import userModule, { UserState } from './modules/user';

export type IMutationTree<K extends string | number, S> = {
  [key in K]: Mutation<S>
}

export type IActionTree<K extends string | number, S> = {
  [key in K]: Action<S, IRootState>
}

export type IModule<S> = Module<S, IRootState>

export enum IModules {
  Permission = 'permission',
  User = 'user',
}

export type IRootState = {
  [IModules.Permission]: PermissionState,
  [IModules.User]: UserState
}

export const getNamespace = (moduleName: IModules, target: string) => `${moduleName}/${target}`;
export type IRootStore = Store<IRootState>;

// app store
const store = createStore<IRootState>({
  modules: {
    [IModules.Permission]: permissionModule,
    [IModules.User]: userModule
  },
});

export const useStore = () => useVuexStore<IRootState>()

// config store
export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
