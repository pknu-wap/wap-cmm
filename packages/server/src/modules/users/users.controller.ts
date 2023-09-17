import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { AuthRequest } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersServie: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getCurrentUser(@Req() req: AuthRequest) {
    console.log('req.user', req.user);

    const userId = req.user.id;
    const user = await this.usersServie.getUserById(userId);
    return user;
  }
}
