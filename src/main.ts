import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'


const app = createApp(App)

const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn) {
    // 如果存在登录状态，则将其保存到应用程序的状态中
    app.config.globalProperties.$isLoggedIn = isLoggedIn;
}

app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
