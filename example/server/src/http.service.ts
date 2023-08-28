import { HttpService as AxiosService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import type { HttpServiceInterface, HttpServiceRequestConfig, HttpServiceResponse } from 'quick-social-auth';

@Injectable()
export class HttpService implements HttpServiceInterface {
    public constructor(
        private readonly axiosService: AxiosService
    ) { }

    public get<T = any>(url: string, config?: HttpServiceRequestConfig): Promise<HttpServiceResponse<T>> {
        return lastValueFrom(this.axiosService.get(url, config));
    }

    public post<T = any>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<HttpServiceResponse<T>> {
        return lastValueFrom(this.axiosService.post(url, data, config));
    }
}
