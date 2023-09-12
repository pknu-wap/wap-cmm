import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '@prisma/client';

import { ROLES_KEY } from '../decorators';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (requiredRoles.length === 0) return true;

    const { user }: { user: User } = context.switchToHttp().getRequest();

    return user && requiredRoles.some((role) => user.role?.includes(role));
  }
}
