import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsService],
  imports: [AuthModule],
})
export class PostsModule {}
