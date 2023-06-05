import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { CreateAxiosOptions } from './axiosTransform';
import type { RequestOptions, Result } from '#/axios';
import { cloneDeep } from 'lodash-es';
import { isFunction } from '@/utils';

import axios from 'axios';

export * from './axiosTransform';

/**
 * @description:  axios模块
 */
export class VAxios {
    private axiosInstance: AxiosInstance;
    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        // this.setupInterceptors();
    }

    /**
     * 创建axios实例
     * @param config
     */
    private createAxios(config: CreateAxiosOptions): void {
        this.axiosInstance = axios.create(config);
    }

    private getTransform() {
        const { transform } = this.options;
        return transform;
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    /**
     * 重新配置axios
     * @param config
     * @returns
     */
    configAxios(config: CreateAxiosOptions) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    /**
     * 设置通用头
     * @param headers
     * @returns
     */
    // setHeader(headers: any): void {}

    /**
     * 拦截器配置
     * @returns
     */
    // private setupInterceptors() {}

    /**
     * 文件上传
     * @param config
     * @param params
     * @returns
     */
    // uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {}

    /**
     * 支持格式
     * @param config
     * @returns
     */
    // supportFormData(config: AxiosRequestConfig) {}

    /**
     * get 请求
     * @param config
     * @param options
     * @returns
     */
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'GET' }, options);
    }

    /**
     * post 请求
     * @param config
     * @param options
     * @returns
     */
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'POST' }, options);
    }

    /**
     * put 请求
     * @param config
     * @param options
     * @returns
     */
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'PUT' }, options);
    }

    /**
     * delete 请求
     * @param config
     * @param options
     * @returns
     */
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'DELETE' }, options);
    }

    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        // 深拷贝 配置
        let conf: CreateAxiosOptions = cloneDeep(config);
        // 获取 转换 方法
        const transform = this.getTransform();
        // 合并 options
        const { requestOptions } = this.options;
        const opt: RequestOptions = Object.assign({}, requestOptions, options);
        const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
        // 判断是否存在请求之前的方法, 如果存在则处理
        if (beforeRequestHook) {
            conf = beforeRequestHook(conf, opt);
        }
        conf.requestOptions = opt;
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    // 判断是否存在 请求成功 处理方法
                    if (transformRequestHook && isFunction(transformRequestHook)) {
                        try {
                            const ret = transformRequestHook(res, opt);
                            resolve(ret);
                        } catch (err) {
                            reject(err || new Error('request error!'));
                        }
                        return;
                    }
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    // 判断是否存在 请求失败 处理方法
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e, opt));
                        return;
                    }
                    if (axios.isAxiosError(e)) {
                        // 在这里重写axios的错误消息
                    }
                    reject(e);
                });
        });
    }
}
