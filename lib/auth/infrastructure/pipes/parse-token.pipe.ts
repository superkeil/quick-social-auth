import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserModel } from '../../domain';
import { AuthService } from '../../services';

@Injectable()
export class ParseTokenPipe implements PipeTransform {

    constructor(protected readonly authService: AuthService) { }

    public async transform(value: any, _metadata: ArgumentMetadata): Promise<UserModel> {
        // console.log('additional options', metadata.data);
        return this.authService.getUser(value);
    }
}
