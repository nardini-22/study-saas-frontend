import { z } from "zod";
import { PostsSchema } from "../posts";
import { UsersSchema } from "../users";

export const TrailRankingSchema = z.object({
  sequential: z.number(),
  user: UsersSchema.pick({
    id: true,
    name: true,
    username: true,
    profilePicture: true,
  }),
});

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
  trail_post: z.array(PostsSchema),
  trail_ranking: z.array(TrailRankingSchema),
});

export const CreateTrailSchema = TrailsSchema.pick({
  name: true,
  description: true,
});
