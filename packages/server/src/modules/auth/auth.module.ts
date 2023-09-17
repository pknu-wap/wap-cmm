import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy, JwtAuthStrategy } from './strategies';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UsersService,
    //strategies
    GithubStrategy,
    JwtAuthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
