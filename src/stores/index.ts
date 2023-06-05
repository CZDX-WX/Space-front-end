import type { App } from 'vue';
import { createPinia } from 'pinia';

/**
 * 创建 store
 */
const store = createPinia();

/**
 * 挂载 store
 * @param app
 */
export function setupStore(app: App<Element>) {
    app.use(store);
}

export { store };
