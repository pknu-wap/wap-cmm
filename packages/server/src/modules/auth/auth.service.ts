import { BadRequestException, Injectable } from '@nestjs/common';

import { Provider } from '@prisma/client';
import { Response } from 'express';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async socialProviderLogin(res: Response, provider: Provider) {
    try {
      // const user = this.usersService.continueWithSocialProvider(provider);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
