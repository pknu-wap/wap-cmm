import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UsersService, GithubStrategy],
  exports: [],
})
export class AuthModule {}
