import { SetMetadata } from '@nestjs/common';

import { User } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: User['role'][]) => SetMetadata('roles', roles);
