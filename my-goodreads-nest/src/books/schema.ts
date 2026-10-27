import { pgTable, uuid, text, integer, doublePrecision, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
import { users } from "../users/schema.js";

export const bookStatus = pgEnum('status', [
    'want-to-read',  
    'currently-reading', 
    'read', 
    'did-not-finish'
]);

export type BookStatus = 
    | 'want-to-read'
    | 'currently-reading'
    | 'read'
    | 'did-not-finish';

export const books = pgTable('books', {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title'),
    author: text('author'),
    decription: text('description'),
    status: bookStatus('status').default('want-to-read'),
    rating: doublePrecision('rating'),
    notes: text('notes'),
    started_at: date('started_at'),
    completed_at: date('completed_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})