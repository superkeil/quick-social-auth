import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ParseTokenPipe } from '../';

export const GetToken = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
    return ctx.switchToHttp().getRequest().headers.authorization?.split('Bearer ')[1];
});

export const User = (additionalOptions?: any) => GetToken(additionalOptions, ParseTokenPipe);
