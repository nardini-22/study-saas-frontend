import { z } from "zod";
import { CreateTrailSchema, TrailsSchema } from "./trails.schema";

export type ITrails = z.infer<typeof TrailsSchema>;
export type ICreateTrail = z.infer<typeof CreateTrailSchema>;
