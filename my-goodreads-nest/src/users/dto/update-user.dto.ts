import z from 'zod';

export const UpdateUserSchema = z.object({
    email: z.email(),
}).partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;