export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

/**
 * 请求配置
 */
export interface RequestOptions {
    /**
     * 将请求参数拼接到url
     */
    joinParamsToUrl?: boolean;
    /**
     * 格式请求参数时间
     */
    formatDate?: boolean;
    /**
     * 是否处理请求结果
     */
    isTransformResponse?: boolean;
    /**
     * 是否返回本机响应头
     * 例如:当您需要获得响应头时，使用此属性
     */
    isReturnNativeResponse?: boolean;
    /**
     * 是否加入url
     */
    joinPrefix?: boolean;
    /**
     * 接口地址，使用默认apiUrl，如果您保留空白
     */
    apiUrl?: string;
    /**
     * 请求拼接路径
     */
    urlPrefix?: string;
    /**
     * 错误消息提示类型
     */
    errorMessageMode?: ErrorMessageMode;
    /**
     * 是否添加时间戳
     */
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    /**
     * 是否在头部发送令牌
     */
    withToken?: boolean;
    /**
     * 请求重试机制
     */
    retryRequest?: RetryRequest;
}

export interface RetryRequest {
    isOpenRetry: boolean;
    count: number;
    waitTime: number;
}

/**
 * 返回结果类型
 */
export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    result: T;
    error_code?: number;
    error_description?: string;
    [name: string]: any;
}

/**
 * 多部分/格式:上传文件
 */
export interface UploadFileParams {
    /**
     * 其他参数
     */
    data?: Recordable;
    /**
     * 文件参数接口字段名
     */
    name?: string;
    /**
     * 文件名称
     */
    file: File | Blob;
    /**
     * 文件名称
     */
    filename?: string;
    [key: string]: any;
}
