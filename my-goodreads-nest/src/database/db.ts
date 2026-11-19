import { ExtractTablesWithRelations } from 'drizzle-orm';
import {
  drizzle,
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import * as schema from './index.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, logger: false });

export type AppRawDbConnection = NodePgDatabase<typeof schema>;
export type AppTransactionalDbConnection = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type AppDb = AppRawDbConnection | AppTransactionalDbConnection;
