import z from 'zod';
import { bookStatus } from '../schema.js';

export enum Status {
  WantToRead = 'want-to-read',
  CurrentlyReading = 'currently-reading',
  Read = 'read',
  DidNotFinish = 'did-not-finish',
}

export const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    status: z.enum(bookStatus.enumValues),
    rating: z.coerce.number(),
    notes: z.string(),
    started_at: z.coerce.date(),
    completed_at: z.coerce.date(),
}).required();

export type CreateBookDto = z.infer<typeof bookSchema>;
