import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { UserWithoutPassword } from 'src/users/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserWithoutPassword;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем требуемые роли из декоратора @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Если роли не указаны, разрешаем доступ
    if (!requiredRoles) {
      return true;
    }

    // Получаем пользователя из request (добавлен JwtAuthGuard)
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Проверяем, что пользователь существует (JwtAuthGuard должен был его добавить)
    if (!user) {
      return false;
    }

    // Проверяем, есть ли у пользователя нужная роль
    return requiredRoles.some((role) => user.role === role);
  }
}
