import { pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { createTimestamps } from '../common/utils.js';
import { userRoleDbEnum } from '../users/schema.js';
import { systemModulesDbEnum } from './db-enums/schema.js';

export const roleSystemModulesTable = pgTable(
  'role_sysmodules',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    role: userRoleDbEnum('role').notNull(),
    module: systemModulesDbEnum('module').notNull(),
    ...createTimestamps,
  },
  (table) => [
    uniqueIndex('role_sysmodules_role_module_uidx').on(
      table.role,
      table.module,
    ),
  ],
);
