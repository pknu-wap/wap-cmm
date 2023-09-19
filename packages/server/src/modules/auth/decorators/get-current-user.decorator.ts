import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthenticatedUser } from '../types';

export const GetCurrentUser = createParamDecorator<
  keyof AuthenticatedUser | undefined,
  ExecutionContext
>((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();

  if (!req.user) return null;
  if (!data) return req.user;
  return req.user[data];
});

export type CurrentUser<
  Prop extends keyof AuthenticatedUser | undefined = undefined,
> = Prop extends undefined
  ? AuthenticatedUser
  : Prop extends keyof AuthenticatedUser
  ? AuthenticatedUser[Prop]
  : never;
