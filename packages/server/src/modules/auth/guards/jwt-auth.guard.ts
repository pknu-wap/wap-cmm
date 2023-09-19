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
    console.log(err, user, info);
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (info) {
      if (
        info instanceof TokenExpiredError &&
        req.cookies['refresh_token'] !== 'undefined'
      ) {
        console.log('첫번째');

        return this.authService.refreshTokens(req, res);
      }

      if (
        info instanceof Error &&
        info.message === 'No auth token' &&
        req.cookies['refresh_token'] !== 'undefined' &&
        req.cookies['access_token'] === 'undefined'
      ) {
        console.log('두번째');
        return this.authService.refreshTokens(req, res);
      }
    }
    if (err || !user) {
      console.log('세번째');

      throw err || new UnauthorizedException();
    }
    return user;
  }
}
