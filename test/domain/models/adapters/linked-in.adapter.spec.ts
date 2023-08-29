import { LinkedInAdapter, HttpServiceInterface, UserModel } from '../../../../lib/auth';

describe('LinkedInAdapter Adapter', () => {
    it('should get name', () => {
        const httpService: HttpServiceInterface = {
            get: jest.fn(),
            post: jest.fn()
        }
        const adapter = new LinkedInAdapter({ redirectUri: '', clientId: '', clientSecret: '' }, httpService);
        const result = adapter.getName();
        expect(result).toBe('linkedIn');
    });

    it('should get access token', () => {
        const httpService: HttpServiceInterface = {
            get: jest.fn(),
            post: jest.fn()
        }
        jest.spyOn(httpService, 'post').mockResolvedValue({ status: 200, data: { access_token: 'token' } });
        const adapter = new LinkedInAdapter({ redirectUri: '', clientId: '', clientSecret: '' }, httpService);
        const result = () => adapter.getAccessToken('code');
        expect(result()).resolves.toBe('token');
    });

    it('should get user', async () => {
        const httpService: HttpServiceInterface = {
            get: jest.fn(),
            post: jest.fn()
        }
        jest.spyOn(httpService, 'get').mockResolvedValue({ status: 200, data: { email: 'email@gmail.com' } });
        const adapter = new LinkedInAdapter({ redirectUri: '', clientId: '', clientSecret: '' }, httpService);
        const result = await adapter.getUser('token');
        expect(result).toBeInstanceOf(UserModel);
        expect(result.email).toBe('email@gmail.com');
    });
});
