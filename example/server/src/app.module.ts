import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AuthModule, AuthService, FacebookAdapter, GoogleAdapter, LinkedInAdapter } from 'quick-social-auth';
import { HttpService } from './http.service';
import 'dotenv/config';
import { DbAdapter } from './adapters/db.adapter';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
    imports: [
        HttpModule,
        AuthModule.forRoot({
            redirectUri: 'http://localhost:8080/dashboard.html',
            authPath: '/auth/token'
        })
    ],
    controllers: [AppController, UserController],
    providers: [HttpService, UserRepository]
})
export class AppModule implements OnModuleInit {
    public constructor(
        private readonly httpService: HttpService,
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository
    ) { }

    public onModuleInit(): void {
        this.authService.addAdapter(new LinkedInAdapter({
            clientId: process.env.AUTH_LINKEDIN_CLIENT_ID,
            clientSecret: process.env.AUTH_LINKEDIN_CLIENT_SECRET,
            redirectUri: process.env.AUTH_REDIRECT_URI
        }, this.httpService));
        this.authService.addAdapter(new GoogleAdapter({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.AUTH_REDIRECT_URI
        }, this.httpService));
        this.authService.addAdapter(new FacebookAdapter({
            appId: process.env.AUTH_FACEBOOK_CLIENT_ID,
            appSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
            redirectUri: process.env.AUTH_REDIRECT_URI
        }, this.httpService));
        this.authService.addAdapter(new DbAdapter({ jwtSecret: process.env.JWT_SECRET }, this.userRepository));
    }
}
