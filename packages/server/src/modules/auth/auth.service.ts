import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Provider, User } from '@prisma/client';
import { Request } from 'express';

import { UsersService } from '../users/users.service';

export interface AuthRequest extends Request {
  user: User;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async socialProviderLogin(req: AuthRequest, provider: Provider) {
    try {
      const user = await this.usersService.continueWithSocialProvider(req);
      const [accessToken, refreshToken] = await this.generateTokens(user);
      // redirect to client
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async generateTokens(user: User) {
    const accessToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN.DURATION'),
      },
    );

    return [accessToken, refreshToken];
  }
}
