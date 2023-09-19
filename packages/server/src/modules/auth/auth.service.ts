import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { $Enums, Provider, User } from '@prisma/client';
import { Request, Response } from 'express';

import { setTokenCookie } from '../../libs/cookies';
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
      if (provider == $Enums.Provider.GOOGLE) {
        // implement google auth
      }
      const user = await this.usersService.continueWithSocialProvider(req);
      const [accessToken, refreshToken] = await this.generateTokens(user);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async generateToken({
    payload,
    tokenType,
  }: {
    payload: {
      userId: string;
      email: string;
      role: $Enums.Role;
    };
    tokenType: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
  }) {
    const token = await this.jwtService.signAsync(
      {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
      {
        secret: this.configService.get<string>(`${tokenType}.SECRET`),
        expiresIn: this.configService.get<string>(`${tokenType}.DURATION`),
      },
    );

    return token;
  }

  async generateTokens(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.generateToken({
      payload,
      tokenType: 'ACCESS_TOKEN',
    });
    const refreshToken = await this.generateToken({
      payload,
      tokenType: 'REFRESH_TOKEN',
    });

    return [accessToken, refreshToken];
  }

  async refreshTokens(req: AuthRequest, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN.SECRET'),
      });

      const accessToken = await this.generateToken({
        payload,
        tokenType: 'ACCESS_TOKEN',
      });

      console.log('여기가 토큰 생성, access token', accessToken);

      setTokenCookie(res, { accessToken });

      const user = await this.usersService.getUserById(payload.userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
