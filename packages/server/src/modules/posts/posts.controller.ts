import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthRequest } from '../auth/auth.service';
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
  async createPost(@Body() dto: CreatePostDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.postsService.createPost(dto.title, dto.body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.postsService.deletePost(id, userId);
  }
}
