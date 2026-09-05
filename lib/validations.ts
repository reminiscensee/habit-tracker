import { z } from "zod";

export const habitNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(60); 