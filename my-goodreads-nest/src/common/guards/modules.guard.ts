import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SystemModule } from '../../system-module/system-module.enum.js';
import { UserRecord } from '../../users/schema.js';
import { MODULES_KEY } from '../decorators/modules.decorator.js';

@Injectable()
export class ModulesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredModules = this.reflector.getAllAndOverride<SystemModule[]>(
      MODULES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredModules) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest() as {
      user: UserRecord;
    };

    // check if th euse has at least one allowed modules
    return requiredModules.some((module) => user.modules.includes(module));
  }
}
