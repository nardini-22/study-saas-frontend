import { z } from "zod";
import { CreatePostSchema, PostsSchemas } from "./posts.schema";

export type IPosts = z.infer<typeof PostsSchemas>;
export type ICreatePost = z.infer<typeof CreatePostSchema>;
