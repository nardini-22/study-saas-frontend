import { z } from "zod";

export const PostsSchemas = z.object({
  id: z.string().uuid(),
  trailId: z.string().uuid(),
  title: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  content: z.string().optional(),
  picture: z.string().optional(),
  ownerId: z.string().uuid(),
});

export const CreatePostSchema = PostsSchemas.pick({
  title: true,
  content: true,
});
