import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { AuthRequest, AuthService } from './auth.service';
import { GithubGuard } from './guards/github.guard';
import { setTokenCookie } from '../../libs/cookies';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(GithubGuard)
  githubAuth() {
    return 'login with github';
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubAuthCallback(@Req() req: AuthRequest, @Res() res: Response) {
    const REDIRECT_URL = this.configService.get<string>('FRONTEND_URL');
    const tokens = await this.authService.socialProviderLogin(req, 'GITHUB');
    setTokenCookie(res, tokens);

    return res.redirect(`${REDIRECT_URL}`);
  }
}
