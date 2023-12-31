import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { AuthenticatedUser, JwtPayload } from '../types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: JwtAuthStrategy.extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN.SECRET'),
    });
  }

  static extractJwtFromCookie(req: Request): string | null {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }

    return token;
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.userService.getUserById(payload.userId);

    if (!user) throw new UnauthorizedException('Invalid token');

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
