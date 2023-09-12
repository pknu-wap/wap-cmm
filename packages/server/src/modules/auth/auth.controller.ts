import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { AuthRequest, AuthService } from './auth.service';
import { GithubGuard } from './guards/github.guard';

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
  githubAuthCallback(@Req() req: AuthRequest) {
    return this.authService.socialProviderLogin(req, 'GITHUB');
  }
}
