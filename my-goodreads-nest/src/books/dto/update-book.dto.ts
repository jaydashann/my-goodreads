import z from 'zod';
import { bookStatusEnum } from '../schema.js';

export enum Status {
  WantToRead = 'want-to-read',
  CurrentlyReading = 'currently-reading',
  Read = 'read',
  DidNotFinish = 'did-not-finish',
}

export const UpdateBookSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    status: z.enum(bookStatusEnum.enumValues),
    rating: z.coerce.number(),
    notes: z.string(),
    started_at: z.coerce.string(),
    completed_at: z.string(),
  })
  .partial();

export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;
