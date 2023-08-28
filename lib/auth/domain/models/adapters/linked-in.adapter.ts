import { AuthableInterface, HttpServiceInterface } from '../../interfaces';
import { UserModel } from '../';

// https://learn.microsoft.com/fr-fr/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1

interface AccessTokenInterface {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
}

interface ProfileInterface {
    sub: string;
    email_verified: boolean;
    name: string;
    locale: {
        country: string;
        language: string;
    },
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
}

interface LinkedInAdapterOptionsInterface {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}


export class LinkedInAdapter implements AuthableInterface {
    public constructor(
        protected readonly options: LinkedInAdapterOptionsInterface,
        protected readonly httpService: HttpServiceInterface
    ) { }

    public getName(): string {
        return 'linkedIn';
    }

    public async getAccessToken(code: string): Promise<string> {
        const url = 'https://www.linkedin.com/oauth/v2/accessToken';
        const data = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            redirect_uri: this.options.redirectUri
        });
        const response = await this.httpService.post<AccessTokenInterface>(
            url,
            data.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        return response.data.access_token;
    }

    public async getUser(token: string): Promise<UserModel> {
        const url = 'https://api.linkedin.com/v2/userinfo';
        const response = await this.httpService.get<ProfileInterface>(url, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const model = new UserModel();
        model.email = response.data.email;
        model.additionalFields = response.data;
        return model;
    }
}
