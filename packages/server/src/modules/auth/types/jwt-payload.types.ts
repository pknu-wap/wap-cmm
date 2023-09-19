import { User } from '@prisma/client';

export interface JwtPayload {
  userId: User['id'];
  email: User['email'];
  role: User['role'];
}
