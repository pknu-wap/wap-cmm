import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { $Enums, User } from '@prisma/client';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(readonly configService: ConfigService) {
    const GITHUB_CLIENT_ID = configService.get<string>('GITHUB.CLIENT_ID');
    const GITHUB_CLIENT_SECRET = configService.get<string>(
      'GITHUB.CLIENT_SECRET',
    );
    const GITHUB_CALLBACK_URL = configService.get<string>(
      'GITHUB.CALLBACK_URL',
    );

    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    try {
      const user: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'> = {
        provider: $Enums.Provider.GITHUB,
        providerId: profile.id,
        displayName: profile.username ?? profile.displayName,
        email: profile.emails?.[0].value,
        password: 'provided',
        profileImage: profile.photos?.[0].value,
      };

      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
