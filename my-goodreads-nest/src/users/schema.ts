import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createTimestamps } from '../common/utils.js';
import { systemModulesDbEnum } from '../system-module/db-enums/schema.js';

export const userRoleDbEnum = pgEnum('user_role', ['admin', 'guest']);

export type UserRoles = 'admin' | 'guest';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  role: userRoleDbEnum('role').default('admin'),
  username: text('username').notNull(),
  password: text('password').notNull(),
  modules: systemModulesDbEnum('modules').array().notNull().default([]),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const userRefreshTokensTable = pgTable('user_rfsh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  ...createTimestamps,
});

export type UserRecord = typeof usersTable.$inferSelect;
export type User = UserRecord;
