import { pgEnum } from 'drizzle-orm/pg-core';
import { SystemModule } from '../system-module.enum.js';

export const systemModulesDbEnum = pgEnum('sysmodule_enum', [
  SystemModule.Users,
  SystemModule.Books,
]);
