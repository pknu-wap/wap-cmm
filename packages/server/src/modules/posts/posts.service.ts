import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts() {
    return this.prisma.post.findMany();
  }

  async getPostById(postId: string) {
    return this.prisma.post.findUnique({
      where: { id: postId },
    });
  }

  async createPost(title: string, body: string, userId: string) {
    return this.prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
    });
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw new BadRequestException('Post not found');

    if (post.userId !== userId)
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );

    return this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
