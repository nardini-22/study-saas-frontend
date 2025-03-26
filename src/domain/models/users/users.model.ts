import { z } from "zod";
import { CreateUserSchema, UsersSchema } from "./users.schema";

export type IUsers = z.infer<typeof UsersSchema>;
export type ICreateUser = z.infer<typeof CreateUserSchema>;
