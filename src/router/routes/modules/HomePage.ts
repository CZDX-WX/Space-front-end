import type { AppRouteModule } from '@/router/types';

const Home: AppRouteModule = {
    path: '/',
    name: '首页',
    component: () => import('@/views/home/index.vue'),
    meta: {
        title: '首页',
    },
};

export default Home;
