import z from 'zod';
import { REGEX_VALID_PASSWORD } from '../../common/regex.js';
import { userRoleDbEnum } from '../schema.js';

export enum Role {
  Admin = 'admin',
  Guest = 'guest',
}

export const userSchema = z
  .object({
    email: z.email(),
    username: z.string(),
    password: z
      .string()
      .min(8, 'Password much be 8 characters long')
      .regex(REGEX_VALID_PASSWORD, 'Invalid Password'),
    role: z.enum(userRoleDbEnum.enumValues),
  })
  .required();

export type CreateUserDto = z.infer<typeof userSchema>;
