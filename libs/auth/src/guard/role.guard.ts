import { forwardRef, Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, Role as PrimasRoles } from '@prisma/client';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const roles = this.reflector.get<PrimasRoles[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user.user;
    return this.userService.get(user.id).then((user: User) => {
        let hasPermission = false;
        const role: any = user.role;
        const hasRole = roles.indexOf(role);
        if (hasRole != -1) {
            hasPermission = true;
        }
        return user && hasPermission;
    });
  }
}