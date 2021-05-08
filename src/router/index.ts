import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const LayoutRoot = () => import('@/layouts/root/index.vue');

// 页面name枚举
export enum PageRouterName {
  Root = 'Root',
  Login = 'Login',
  Dashboard = 'Dashboard',
  DashboardAnalysis = 'DashboardAnalysis',
  System = 'System',
  SystemAccount = 'SystemAccount',
  About = 'About',
  ErrorPage = 'ErrorPage',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: PageRouterName.Root,
    redirect: '/dashboard',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    name: PageRouterName.Login,
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/dashboard',
    name: PageRouterName.Dashboard,
    component: LayoutRoot,
    redirect: '/dashboard/analysis',
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: 'analysis',
        name: PageRouterName.DashboardAnalysis,
        component: () => import('@/pages/dashboard/analysis.vue'),
        meta: {
          title: 'Analysis',
        },
      },
    ],
  },
  {
    path: '/system',
    name: PageRouterName.System,
    component: LayoutRoot,
    redirect: '/system/account',
    meta: {
      title: 'System',
    },
    children: [
      {
        path: 'account',
        name: PageRouterName.SystemAccount,
        component: () => import('@/pages/system/account.vue'),
        meta: {
          title: 'SystemAccount',
        },
      },
    ],
  },
  {
    path: '/about',
    name: PageRouterName.About,
    component: LayoutRoot,
    redirect: '/about/index',
    meta: {
      title: 'About',
    },
    children: [
      {
        path: 'index',
        name: PageRouterName.About,
        component: () => import('@/pages/about/index.vue'),
        meta: {
          title: 'About',
        },
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: PageRouterName.ErrorPage,
    component: LayoutRoot,
    meta: {
      title: 'ErrorPage',
    },
    children: [
      {
        path: '/:path(.*)*',
        name: PageRouterName.ErrorPage,
        component: () => import('@/pages/exception/index.vue'),
        meta: {
          title: 'ErrorPage',
        },
      },
    ],
  },
];

// app router
const router = createRouter({
  // createWebHistory => history路由
  // createWebHashHistory => hash路由
  history: createWebHashHistory(),
  routes: (routes as unknown) as RouteRecordRaw[],
  strict: true,
  // 滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
