import { AuthModule, AuthService } from '../lib/auth';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';

describe('Auth Module', () => {
    it('should get auth provider', () => {
        const module = AuthModule.forRoot({ authPath: '', redirectUri: '' });
        const provider = (module.providers[0] as FactoryProvider).useFactory();
        expect(provider).toBeInstanceOf(AuthService);
    });
});
