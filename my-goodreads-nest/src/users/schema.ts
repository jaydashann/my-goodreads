<<<<<<< HEAD
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
=======
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createTimestamps } from '../common/utils.js';
import { systemModulesDbEnum } from '../system-module/db-enums/schema.js';

export const userRoleDbEnum = pgEnum('user_role', ['admin', 'guest']);

export type UserRoles = 'admin' | 'guest';
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  role: userRoleDbEnum('role').default('admin'),
  username: text('username').notNull(),
  password: text('password').notNull(),
  modules: systemModulesDbEnum('modules').array().notNull().default([]),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
