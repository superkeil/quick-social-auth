import { AuthableInterface, HttpServiceInterface, UserModel } from '../domain';
import { AuthOptionsInterface } from '../';

interface TokenInterface {
    token: string;
    provider: string;
}

export class AuthService {
    protected readonly adapters: AuthableInterface[] = [];

    public constructor(
        public readonly options: AuthOptionsInterface,
    ) { }

    public addAdapter(adapter: AuthableInterface): void {
        this.adapters.push(adapter);
    }

    public getAdapter<T>(adapterClass: new (...args: any[]) => T): T {
        return this.adapters.find(adapter => adapter.constructor === adapterClass) as T;
    }

    public getAccessToken(code: string): Promise<string> {
        try {
            return Promise.any(
                this.adapters
                    .map(async adapter => {
                        const token = await adapter.getAccessToken(code);
                        return this.wrapToken(token, adapter.getName());
                    })
            );
        } catch (err) {
            console.error(err);
        }
    }

    public wrapToken(token: string, adapterName: string): string {
        const json: TokenInterface = {
            token,
            provider: adapterName
        };
        const data = JSON.stringify(json);
        return Buffer.from(data, 'utf-8').toString('base64');
    }

    public async getUser(tokenDataB64: string): Promise<UserModel> {
        try {
            const tokenDataUtf8 = Buffer.from(tokenDataB64, 'base64').toString('utf-8');
            const tokenData: TokenInterface = JSON.parse(tokenDataUtf8);
            const adapter = this.adapters.find(provider => provider.getName() === tokenData.provider);
            return adapter.getUser(tokenData.token).catch(() => null);
        } catch { }
    }
}
