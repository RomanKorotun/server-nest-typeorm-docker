import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/metadata-keys.constant';
import { Role } from '../enums/role.enum';
import { RequestWithUser } from '../..//common/types/request-with-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refrector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.refrector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user;

    const userRole = user.getRole();

    if (!roles.includes(userRole)) {
      throw new ForbiddenException('Role може змінювати лише SUPER_ADMIN');
    }

    return true;
  }
}
