// router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 导入组件
import Login from '@views/Login.vue';

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页面',
      requiresAuth: false,//需要权限
    }, // 设置页面标题
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/Home.vue'),
    props: true,
    meta: {
      title: '主页',// 设置页面标题
      requiresAuth: true,//需要权限
    },
    children: [
      {
        path: 'tab1',
        name: 'Tab1',
        component: () => import('@/views/tabs/Tab1.vue'),
      },
      {
        path: 'tab2',
        name: 'Tab2',
        component: () => import('@/views/tabs/Tab2.vue'),
      },
      {
        path: 'tab3',
        name: 'Tab3',
        component: () => import('@/views/tabs/Tab3.vue'),
      },
      {
        path: 'tab4',
        name: 'Tab4',
        component: () => import('@/views/tabs/Tab4.vue'),
      },
      {
        path: 'tab5',
        name: 'Tab5',
        component: () => import('@/views/tabs/Tab5.vue'),
      },
      {
        path: 'tab6',
        name: 'Tab6',
        component: () => import('@/views/tabs/Tab6.vue'),
      },
      {
        path: 'tab7',
        name: 'Tab7',
        component: () => import('@/views/tabs/Tab7.vue'),
      },
      {
        path: 'tab8',
        name: 'Tab8',
        component: () => import('@/views/tabs/Tab8.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      // 检查是否需要验证登录
      if (to.meta.requiresAuth && !isLoggedIn) {
        next('/Login'); // 如果需要验证登录且未登录，则导航到登录页面
      } else {
        next() // 否则，继续导航
      }
    }
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫 - 在每次路由跳转前更新页面标题
router.beforeEach((to) => {
  const title = to.meta.title as string; // 获取目标路由的页面标题
  if (title) {
    document.title = title; // 更新网站标题
  }
});

export default router;
