import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DbAdapter } from './adapters/db.adapter';
import { AuthService } from 'quick-social-auth';

@Controller()
export class UserController {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) { }

    @Post('user')
    public async login(@Body() payload: { email: string; password: string }): Promise<string> {
        const user = await this.userRepository.findByCredentials(payload.email, payload.password);
        if (!user) {
            throw new ForbiddenException();
        }
        const adapter = this.authService.getAdapter(DbAdapter);
        const token = adapter.getUserToken(user);
        return this.authService.wrapToken(token, adapter.getName());
    }
}
