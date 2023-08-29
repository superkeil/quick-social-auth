import { AuthService, ParseTokenPipe, UserModel } from '../../../lib/auth';

describe('Parse Token Pipe', () => {
    it('should get user from token', () => {
        const user = new UserModel();
        const authService = new AuthService({ authPath: '', redirectUri: ''});
        jest.spyOn(authService, 'getUser').mockResolvedValue(user);
        const pipe = new ParseTokenPipe(authService);

        const result = () => pipe.transform('token', { type: 'custom' });

        expect(result()).resolves.toBe(user);
    });
});
