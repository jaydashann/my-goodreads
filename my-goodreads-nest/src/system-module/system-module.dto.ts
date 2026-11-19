import z from 'zod';
import { Role } from '../users/dto/create-user.dto.js';

export const GetSystemModulesDtoSchema = z.object({
  role: z
    .string()
    .transform((val) => val.split(','))
    .pipe(z.array(z.enum(Role)).nonempty())
    .optional(),
});
