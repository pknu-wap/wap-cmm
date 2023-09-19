import { User } from '@prisma/client';

export interface AuthenticatedUser {
  userId: User['id'];
  email: User['email'];
  role: User['role'];
}
