import { pgTable, serial, text, integer, doublePrecision, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
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
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    book_cover: text('book_cover'),
    title: text('title'),
    author: text('author'),
    description: text('description'),
    status: bookStatus('status').default('want-to-read'),
    rating: doublePrecision('rating'),
    notes: text('notes'),
    started_at: timestamp('started_at'),
    completed_at: timestamp('completed_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})