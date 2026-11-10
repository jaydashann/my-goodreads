import z from "zod";

export const UserCreadentialsSchema = z.object({
  email: z.string(),
});

export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
};
