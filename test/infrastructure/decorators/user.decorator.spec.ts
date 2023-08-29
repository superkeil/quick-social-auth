import { User } from '../../../lib/auth';

describe('User Decorator', () => {
    it('should exist', () => {
        const decorator = User();
        expect(decorator).toBeDefined();
    });

});
