import z from 'zod';

export const userSchema = z.object({
    email: z.email(),
}).required();

export type CreateUserRequestDto = z.infer<typeof userSchema>;