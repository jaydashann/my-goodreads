import z from 'zod';

export const userSchema = z.object({
    email: z.email(),
}).required();

export type CreateUserDto = z.infer<typeof userSchema>;