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
    if (info) {
      if (
        info instanceof TokenExpiredError &&
        context.switchToHttp().getRequest().cookies['refresh_token']
      ) {
        return this.authService.refreshTokens(
          context.switchToHttp().getRequest(),
        );
      }

      if (
        info instanceof Error &&
        info.message === 'No auth token' &&
        context.switchToHttp().getRequest().cookies['refresh_token'] &&
        !context.switchToHttp().getRequest().cookies['access_token']
      ) {
        return this.authService.refreshTokens(
          context.switchToHttp().getRequest(),
        );
      }
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
