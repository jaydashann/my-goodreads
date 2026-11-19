import {
  date,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { usersTable } from '../users/schema.js';

export const bookStatusEnum = pgEnum('status', [
  'want-to-read',
  'currently-reading',
  'read',
  'did-not-finish',
]);

export const booksTable = pgTable('books', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  book_cover: text('book_cover'),
  title: text('title'),
  author: text('author'),
  description: text('description'),
  status: bookStatusEnum('status').default('want-to-read'),
  rating: doublePrecision('rating'),
  notes: text('notes'),
  started_at: date('started_at'),
  completed_at: date('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
