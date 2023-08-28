import { AuthableInterface, HttpServiceInterface } from '../../interfaces';
import { UserModel } from '../';

interface GoogleAdapterOptionsInterface {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

interface AccessTokenInterface {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
}

interface ProfileInterface {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}

// https://developers.google.com/identity/protocols/oauth2/web-server?hl=fr#httprest_1
// https://www.googleapis.com/oauth2/v3/userinfo?access_token=ya29
// https://stackoverflow.com/a/75876719
export class GoogleAdapter implements AuthableInterface {
    public constructor(
        protected readonly options: GoogleAdapterOptionsInterface,
        protected readonly httpService: HttpServiceInterface
    ) { }

    public getName(): string {
        return 'google';
    }

    public async getAccessToken(code: string): Promise<string> {
        const url = 'https://oauth2.googleapis.com/token';
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
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
        const response = await this.httpService.get<ProfileInterface>(url, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const model = new UserModel();
        model.email = response.data.email;
        model.additionalFields = response.data;
        return model;
    }
}
