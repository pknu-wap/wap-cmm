import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { $Enums } from '@prisma/client';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';

export interface JwtAccessPayload {
  userId: string;
  email: string;
  role: $Enums.Role;
}

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
    console.log('extractJwtFromCookie');

    if (req && req.cookies) {
      const token = req.cookies['access_token'];
      if (token === 'undefined') return null;
      return token;
    }

    return null;
  }

  async validate(payload: JwtAccessPayload) {
    console.log('validate', payload);

    const user = await this.userService.getUserById(payload.userId);

    if (!user) throw new UnauthorizedException('Invalid token');

    return user;
  }
}
