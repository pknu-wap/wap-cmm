import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CurrentUser, GetCurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersServie: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getCurrentUser(
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
  ) {
    const user = await this.usersServie.getUserById(userId);

    return user;
  }
}
