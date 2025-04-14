import { z } from "zod";

export const UsersSchema = z.object({
  id: z.string().uuid(),
  loginProviderId: z.string().uuid(),
  loginProvider: z.string(),
  name: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  username: z
    .string()
    .min(3, { message: "Esse campo deve ter pelo menos 3 caracteres" })
    .max(20, { message: "Esse campo não pode ter mais de 20 caracteres" })
    .regex(/^[a-zA-Z][a-zA-Z0-9._-]*$/, {
      message:
        "Esse campo deve começar com uma letra e conter apenas letras, números, pontos, underscores e hífens",
    })
    .refine((val) => !val.includes(" "), {
      message: "Esse campo não pode conter espaços",
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
