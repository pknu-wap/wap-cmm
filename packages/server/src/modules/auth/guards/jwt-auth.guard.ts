import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenExpiredError } from 'jsonwebtoken';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // access token 없을 시 && refresh token 존재 시
    if (
      info &&
      info.message === 'No auth token' &&
      req.cookies['refresh_token'] &&
      !req.cookies['access_token']
    ) {
      return this.authService.refreshTokens(req);
    }

    // access token 없을 시 && refresh token 없을 시
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
