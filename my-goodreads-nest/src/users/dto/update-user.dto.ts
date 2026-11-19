import z from 'zod';
import { REGEX_VALID_PASSWORD } from '../../common/regex.js';
import { Role } from './create-user.dto.js';

export const UpdateUserSchema = z
  .object({
    email: z.email(),
    username: z.string(),
    password: z
      .string()
      .min(8, 'Password much be 8 characters long')
      .regex(REGEX_VALID_PASSWORD, 'Invalid Password'),
    role: z.enum(Role),
  })
  .partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
