// router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 导入组件
import Login from '@views/Login.vue';
import { ElMessage } from 'element-plus'

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页面',
      requiresAuth: false,//需要权限
      message: '请登录',
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
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab1.vue'),
      },
      {
        path: 'tab2',
        name: 'Tab2',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab2.vue'),
      },
      {
        path: 'tab3',
        name: 'Tab3',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab3.vue'),
      },
      {
        path: 'tab4',
        name: 'Tab4',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab4.vue'),
      },
      {
        path: 'tab5',
        name: 'Tab5',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab5.vue'),
      },
      {
        path: 'tab6',
        name: 'Tab6',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab6.vue'),
      },
      {
        path: 'tab7',
        name: 'Tab7',
        meta: {
          message: '...的功能',
        },
        component: () => import('@/views/tabs/Tab7.vue'),
      },
      {
        path: 'logout',
        name: 'Logout',
        meta: {
          message: '退出登录',
        },
        component: () => import('@/views/tabs/Logout.vue'),
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
  }, {
    path: '/error',
    name: 'Error',
    component: () => import('@/views/ErrorPage.vue')
  }
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

  const matchedRoutes = to.matched;
  let message = 'Default message';

  // 遍历匹配的路由记录，找到子路由的元信息
  for (const routeRecord of matchedRoutes) {
    if (routeRecord.meta && routeRecord.meta.message) {
      message = JSON.stringify(routeRecord.meta.message).replace(/"/g, '');
      break;
    }
  }

  ElMessage({
    showClose: true,
    message
  });


});



export default router;
