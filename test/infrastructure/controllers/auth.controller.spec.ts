import { AuthService, createDynamicAuthController } from '../../../lib/auth';

describe('Auth Controller', () => {
    it('should get redirect url', () => {
        const authService = new AuthService({ authPath: '', redirectUri: '' });
        jest.spyOn(authService, 'getAccessToken').mockResolvedValue('token');
        const controller = createDynamicAuthController({ authPath: '' });
        const instance = new controller(authService);
        const result = () => instance.getToken('code');
        expect(result()).resolves.toEqual({ url: '?token=token' });
    });
});
