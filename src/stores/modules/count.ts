import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0 }),
    getters: {
        // 计算属性
    },
    actions: {
        // 异步操作
        increment() {
            this.count++;
        },
    },
});
