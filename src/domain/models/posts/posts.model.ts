import { z } from "zod";
import { CreatePostSchema, PostsSchema } from "./posts.schema";

export type IPosts = z.infer<typeof PostsSchema>;
export type ICreatePost = z.infer<typeof CreatePostSchema>;
