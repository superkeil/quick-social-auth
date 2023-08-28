import { AuthableInterface, AuthService, UserModel } from '../lib/auth';

describe('Auth Service', () => {
    it('should get adapter', () => {
        class CustomAdatper implements AuthableInterface {
            getAccessToken(code: string): Promise<string> {
                return Promise.resolve('');
            }

            getName(): string {
                return '';
            }

            getUser(auth: string): Promise<UserModel> {
                return Promise.resolve(undefined);
            }
        }
        const customAdapter = new CustomAdatper();

        const service = new AuthService({ authPath: '', redirectUri: '' });

        service.addAdapter(customAdapter);
        const adapter = service.getAdapter(CustomAdatper);

        expect(adapter).toBe(customAdapter);
    });
});
