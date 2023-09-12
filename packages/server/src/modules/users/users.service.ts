import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuthRequest } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async continueWithSocialProvider(req: AuthRequest) {
    const exUser = await this.prisma.user.findFirst({
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

    if (!exUser) {
      const user = await this.prisma.user.create({
        data: {
          ...req.user,
          role: 'USER',
        },
      });

      return user;
    }

    return exUser;
  }
}
