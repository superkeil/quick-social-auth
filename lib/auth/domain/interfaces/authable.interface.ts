import { UserModel } from '../models';
import { HttpServiceInterface } from './';

export interface AuthableInterface {
    getName(): string;
    getAccessToken(code: string): Promise<string>;
    getUser(auth: string): Promise<UserModel>;
}

