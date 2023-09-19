import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { CurrentUser, GetCurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return this.postsService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
    @Body() dto: CreatePostDto,
  ) {
    console.log('userId', userId);

    return this.postsService.createPost(dto.title, dto.body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(id, userId);
  }
}
