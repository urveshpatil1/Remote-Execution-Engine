import { z } from "zod";
import { LanguageEnum } from "../enums";

export const SubmissionSchema = z.object({
  problemId: z.string(),
  submission: z.string(),
  language: z.enum([LanguageEnum.JAVASCRIPT, LanguageEnum.PYTHON]),
});

export const SubmissionCreateSchema = z.object({
  body: SubmissionSchema,
});
