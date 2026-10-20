import z from 'zod';
import { bookStatus } from '../schema.js';

export enum Status {
  WantToRead = 'want-to-read',
  CurrentlyReading = 'currently-reading',
  Read = 'read',
  DidNotFinish = 'did-not-finish',
}

export const UpdateBookSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    status: z.enum(bookStatus.enumValues),
    rating: z.coerce.number(),
    notes: z.string(),
    started_at: z.coerce.date(),
    completed_at: z.coerce.date(),
}).partial();

export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;
