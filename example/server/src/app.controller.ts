import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { User, UserModel } from 'quick-social-auth';

@Controller()
export class AppController {

    @Get()
    public getHello(@User() authUser: UserModel): UserModel {
        if (!authUser) {
            throw new UnauthorizedException();
        }
        return authUser;
    }
}
