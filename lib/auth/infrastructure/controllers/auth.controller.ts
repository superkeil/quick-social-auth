import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from '../../services';

export const createDynamicAuthController = (controllerOptions: { authPath: string }) => {
    @Controller()
    class AuthController {
        public constructor(
            public readonly authService: AuthService
        ) { }

        @Get(controllerOptions.authPath)
        @Redirect('http://localhost:8080/', 302)
        public async getToken(@Query('code') code: string): Promise<{url: string}> {
            const token = await this.authService.getAccessToken(code);
            return { url: this.authService.options.redirectUri + '?token=' + token };
        }
    }

    return AuthController;
};

