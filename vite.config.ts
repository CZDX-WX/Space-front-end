import type { ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: {
        '@': resolve('src'), // 源码根目录
        '@img': resolve('src/assets/img'), // 图片
        '@less': resolve('src/assets/less'), // 预处理器
        '@libs': resolve('src/libs'), // 本地库
        '@plugins': resolve('src/plugins'), // 本地插件
        '@cp': resolve('src/components'), // 公共组件
        '@views': resolve('src/views'), // 路由组件
      },
    },
    plugins: [vue()],
  };
};
