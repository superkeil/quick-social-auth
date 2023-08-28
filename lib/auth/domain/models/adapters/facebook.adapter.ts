import { AuthableInterface, HttpServiceInterface } from '../../interfaces';
import { UserModel } from '../';

// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow

interface FacebookAdapterOptionsInterface {
    appId: string;
    appSecret: string;
    redirectUri: string;
}

interface AccessTokenInterface {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface ProfileInterface {
    "name": string;
    "email": string;
    "id": number;
}

export class FacebookAdapter implements AuthableInterface {
    public constructor(
        protected readonly options: FacebookAdapterOptionsInterface,
        protected readonly httpService: HttpServiceInterface
    ) { }

    public getName(): string {
        return 'facebook';
    }

    public async getAccessToken(code: string): Promise<string> {
        const url = 'https://graph.facebook.com/v17.0/oauth/access_token';
        const data = new URLSearchParams({
            code: code,
            client_id: this.options.appId,
            client_secret: this.options.appSecret,
            redirect_uri: this.options.redirectUri
        });
        const response = await this.httpService.get<AccessTokenInterface>(
            url + '?' + data.toString()
        );
        return response.data.access_token;
    }

    public async getUser(token: string): Promise<UserModel> {
        const url = 'https://graph.facebook.com/v17.0/me?fields=name,email';
        const response = await this.httpService.get<ProfileInterface>(url, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const model = new UserModel();
        model.email = response.data.email;
        model.additionalFields = response.data;
        return model;
    }

}
