import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (info) {
      if (
        info.name === 'TokenExpiredError' &&
        context.switchToHttp().getRequest().cookies['refresh_token']
      ) {
        return this.authService.refreshToken(
          context.switchToHttp().getRequest(),
        );
      }

      if (
        info instanceof Error &&
        info.message === 'No auth token' &&
        context.switchToHttp().getRequest().cookies['refresh_token'] &&
        !context.switchToHttp().getRequest().cookies['access_token']
      ) {
        return this.authService.refreshToken(
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
