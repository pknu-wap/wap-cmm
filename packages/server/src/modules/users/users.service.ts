import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { AuthRequest } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async continueWithSocialProvider(req: AuthRequest) {
    let user: User;

    user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: req.user.email,
          },
          {
            providerId: req.user.providerId,
          },
        ],
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          ...req.user,
          role: 'USER',
        },
      });
    }

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
