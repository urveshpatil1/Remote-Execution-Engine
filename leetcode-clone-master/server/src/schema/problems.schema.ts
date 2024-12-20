import { z } from "zod";

export const ProblemsSchema = z.object({
  title: z.string(),
  acceptance: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});
