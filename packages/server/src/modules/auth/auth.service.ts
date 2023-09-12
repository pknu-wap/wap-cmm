import { BadRequestException, Injectable } from '@nestjs/common';

import { Provider, User } from '@prisma/client';
import { Request } from 'express';

import { UsersService } from '../users/users.service';

export interface AuthRequest extends Request {
  user: User;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async socialProviderLogin(req: AuthRequest, provider: Provider) {
    try {
      const user = this.usersService.continueWithSocialProvider(req);
      // set token
      // redirect to client
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  generateTokens() {}
}
