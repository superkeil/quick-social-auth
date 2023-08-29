import { AuthableInterface, AuthService, UserModel } from '../lib/auth';

describe('Auth Service', () => {
    it('should get adapter', () => {
        class CustomAdapter implements AuthableInterface {
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
        const customAdapter = new CustomAdapter();

        const service = new AuthService({ authPath: '', redirectUri: '' });

        service.addAdapter(customAdapter);
        const adapter = service.getAdapter(CustomAdapter);

        expect(adapter).toBe(customAdapter);
    });

    it('should get access token', () => {
        class CustomAdapter implements AuthableInterface {
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
        const customAdapter = new CustomAdapter();
        jest.spyOn(customAdapter, 'getAccessToken').mockResolvedValue('token');

        const service = new AuthService({ authPath: '', redirectUri: '' });
        service.addAdapter(customAdapter);

        const result = () => service.getAccessToken('code');

        expect(result()).resolves.toBe('eyJ0b2tlbiI6InRva2VuIiwicHJvdmlkZXIiOiIifQ==');
    });

    it('should not get access token', () => {
        class CustomAdapter implements AuthableInterface {
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
        const customAdapter = new CustomAdapter();
        jest.spyOn(customAdapter, 'getAccessToken').mockImplementation(() => { throw new Error('bad code'); });

        const service = new AuthService({ authPath: '', redirectUri: '' });
        service.addAdapter(customAdapter);

        const result = () => service.getAccessToken('code');

        expect(result()).resolves.not.toBeDefined();
    });

    it('should not get access token because no provider', () => {
        const service = new AuthService({ authPath: '', redirectUri: '' });

        const result = () => service.getAccessToken('code');

        expect(result()).resolves.not.toBeDefined();
    });

    it('should get user from token', () => {
        class CustomAdapter implements AuthableInterface {
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
        const user = new UserModel();
        const customAdapter = new CustomAdapter();
        jest.spyOn(customAdapter, 'getUser').mockResolvedValue(user);

        const service = new AuthService({ authPath: '', redirectUri: '' });
        service.addAdapter(customAdapter);

        const result = () => service.getUser('eyJ0b2tlbiI6InRva2VuIiwicHJvdmlkZXIiOiIifQ==');

        expect(result()).resolves.toBe(user);
    });

    it('should not get user from token', () => {
        class CustomAdapter implements AuthableInterface {
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
        const user = new UserModel();
        const customAdapter = new CustomAdapter();
        jest.spyOn(customAdapter, 'getUser').mockRejectedValue('not found');

        const service = new AuthService({ authPath: '', redirectUri: '' });
        service.addAdapter(customAdapter);

        const result = () => service.getUser('eyJ0b2tlbiI6InRva2VuIiwicHJvdmlkZXIiOiIifQ==');

        expect(result()).resolves.toBe(null);
    });
});
