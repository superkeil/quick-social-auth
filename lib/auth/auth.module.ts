import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './services';
import { AuthOptionsInterface } from './';
import { createDynamicAuthController } from './infrastructure';

@Module({})
export class AuthModule {
    static forRoot(options?: AuthOptionsInterface): DynamicModule {
        return {
            module: AuthModule,
            controllers: [createDynamicAuthController({ authPath: options.authPath })],
            providers: [
                {
                    provide: AuthService,
                    useFactory: () => new AuthService(options)
                }
            ],
            exports: [AuthService]
        };
    }
}
