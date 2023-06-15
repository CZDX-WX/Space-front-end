import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Loading from '@/components/Loading.vue';

const app = createApp(App)

const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn) {
    // 如果存在登录状态，则将其保存到应用程序的状态中
    app.config.globalProperties.$isLoggedIn = isLoggedIn;
}
// 全局路由导航守卫
router.beforeEach((to, from, next) => {
    // 在每次路由切换开始时显示加载动画组件
    app.component('Loading', Loading);
    next();
});

router.afterEach((to, from) => {
    // 在每次路由切换完成后移除加载动画组件
    delete app._context.components.Loading;
});


app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
