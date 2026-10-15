import { pgTable, serial, text, integer, doublePrecision, timestamp, date } from "drizzle-orm/pg-core";
import { users } from "../users/schema.js";

export const BOOK_STATUS = [
    'want-to-read',  
    'currently-reading', 
    'read', 
    'did-not-finish'
] as const;
export type bookStatus = (typeof BOOK_STATUS)[number];

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title'),
    author: text('author'),
    decription: text('description'),
    status: text('status').$type<bookStatus>().default('want-to-read').notNull(),
    rating: doublePrecision('rating'),
    notes: text('notes'),
    started_at: timestamp('started_at'),
    completed_at: timestamp('completed_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})