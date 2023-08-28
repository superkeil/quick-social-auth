export interface HttpServiceResponse<T = any> {
    data: T;
    status: number;
}

export interface HttpServiceRequestConfig {
    headers?: Record<string, string>;
}

export interface HttpServiceInterface {
    get<T = any>(url: string, config?: HttpServiceRequestConfig): Promise<HttpServiceResponse<T>>;
    post<T = any>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<HttpServiceResponse<T>>;
}
