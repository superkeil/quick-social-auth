import { User, UserModel } from '../../../lib/auth';

describe('User Decorator', () => {
    it('should exist', () => {
        class Custom {
            public user: UserModel;
        }

        const ctx = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        authorization: 'Bearer token'
                    }
                })
            })
        };

        const decorator = User();
        const instance = new Custom();
        decorator(instance, 'user', 0);
        const metadata = Reflect.getMetadata('__routeArguments__', instance.constructor, 'user');
        const metadataKey = Object.keys(metadata)[0];
        const result = metadata[metadataKey].factory(null, ctx);

        expect(result).toBe('token');
    });
});
