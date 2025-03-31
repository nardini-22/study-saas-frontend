import { z } from "zod";
import { UsersSchema } from "../users";

export const PostsSchema = z.object({
  id: z.string().uuid(),
  trailId: z.string().uuid(),
  title: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  content: z.string().optional(),
  picture: z.string().optional(),
  ownerId: z.string().uuid(),
  user: UsersSchema.pick({
    id: true,
    name: true,
    username: true,
    profilePicture: true,
  }),
});

export const CreatePostSchema = PostsSchema.pick({
  title: true,
  content: true,
});
