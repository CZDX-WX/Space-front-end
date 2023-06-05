import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';

import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import { deepMerge } from '@/utils';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
     * 处理请求数据。如果数据不是预期格式，可直接抛出错误
     * @param res
     * @param options
     */
    transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
        if (options.errorMessageMode === 'modal') {
            return;
        }
        return res.data;
    },
    /**
     * 请求之前处理config
     * @param config
     * @param options
     */
    // beforeRequestHook: (config, options) => {},
    /**
     * 请求拦截器处理
     * @param config
     * @param options
     * @returns
     */
    // requestInterceptors: (config, options) => {},
    /**
     * 响应拦截器处理
     * @param res
     */
    // responseInterceptors: (res: AxiosResponse<any>) => {},
    /**
     * 响应错误处理
     * @param error
     * @returns
     */
    // responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {},
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        deepMerge(
            {
                authenticationScheme: '',
                // 接口超时时间 单位毫秒
                timeout: 10 * 1000,
                // 接口可能会有通用的地址部分，可以统一抽取出来
                // headers: { 'Content-Type': ContentTypeEnum.JSON },
                // 数据处理方式，见下方说明
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
                    isReturnNativeResponse: false,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'message',
                    // 接口地址
                    // apiUrl: globSetting.apiUrl,
                    //  是否加入时间戳
                    joinTime: true,
                    // 忽略重复请求
                    ignoreCancelToken: true,
                },
            },
            opt || {},
        ),
    );
}

export const defHttp = createAxios();
