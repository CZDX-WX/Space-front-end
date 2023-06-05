import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '../views/LoginView.vue'
import HomePageVue from '../views/HomePage.vue'
import firstViewVue from '../views/tabViews/firstView.vue'
import secondViewVue from '../views/tabViews/firstView.vue'
import thirdViewVue from '../views/tabViews/firstView.vue'
import forthViewVue from '../views/tabViews/firstView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginViewVue
        },
        {
            path: '/Home',
            name: 'Home',
            component: () => import('../views/HomePage.vue'),
            children: [
                { path: '/nav1', component: firstViewVue },
                { path: '/nav2', component: secondViewVue },
                { path: '/nav3', component: thirdViewVue },
                { path: '/nav4', component: forthViewVue },
            ],
            meta: {
                IsLogin: true,
            }
        }
    ]
})

export default router