import { z } from "zod";

export const TrailsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  description: z.string(),
  ownerId: z.string().uuid(),
  enabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateTrailSchema = TrailsSchema.pick({
  name: true,
  description: true,
});
