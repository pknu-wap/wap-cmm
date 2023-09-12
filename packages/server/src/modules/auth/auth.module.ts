import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
  exports: [],
})
export class AuthModule {}
