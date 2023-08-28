import { AuthableInterface, UserModel } from 'quick-social-auth';
import { UserEntity, UserRepository } from '../user.repository';
import { sign, verify } from 'jsonwebtoken';

interface DbAdapterOptionsInterface {
    jwtSecret: string;
}

export class DbAdapter implements AuthableInterface {

    public constructor(
        protected readonly options: DbAdapterOptionsInterface,
        protected readonly userRepository: UserRepository
    ) { }

    public getName(): string {
        return 'db';
    }

    public async getAccessToken(_code: string): Promise<string> {
        // can be used for email validation
        throw new Error('Not to be implemented because not three-legged way like oauth2');
    }

    public async getUser(token: string): Promise<UserModel> {
        const userId = verify(token, this.options.jwtSecret).sub as string;
        const entity = await this.userRepository.findById(userId);

        const model = new UserModel();
        model.email = entity.email;
        model.additionalFields = entity;
        return model;
    }

    public getUserToken(user: UserEntity): string {
        return sign({ id: user.id }, this.options.jwtSecret, { subject: user.id });
    }
}
