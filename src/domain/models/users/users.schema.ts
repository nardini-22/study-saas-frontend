import { z } from "zod";

export const UsersSchema = z.object({
  id: z.string().uuid(),
  loginProviderId: z.string().uuid(),
  loginProvider: z.string(),
  name: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  username: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  email: z.string().email(),
  profilePicture: z.string().url().optional(),
  enabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateUserSchema = UsersSchema.pick({
  name: true,
  username: true,
});
