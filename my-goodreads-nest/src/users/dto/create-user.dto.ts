import z from 'zod';
import { REGEX_VALID_PASSWORD } from '../../common/regex.js';

export const userSchema = z
  .object({
    email: z.email(),
    username: z.string(),
    password: z
      .string()
      .min(8, 'Password much be 8 characters long')
      .regex(REGEX_VALID_PASSWORD, 'Invalid Password'),
  })
  .required();

export type CreateUserDto = z.infer<typeof userSchema>;
