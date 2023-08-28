import { Injectable } from '@nestjs/common';

export interface UserEntity {
    id: string;
    email: string;
    password: string;
}

@Injectable()
export class UserRepository {
    private readonly users: UserEntity[] = [
        { id: 'a1', email: 'a1@gmail.com', password: 'p1' },
        { id: 'a2', email: 'a2@gmail.com', password: 'p2' }
    ];

    public async findById(id: string): Promise<UserEntity> {
        return this.users.find(user => user.id === id);
    }

    public async findByCredentials(email: string, password: string): Promise<UserEntity> {
        return this.users.find(user => user.email === email && user.password === password);
    }
}

