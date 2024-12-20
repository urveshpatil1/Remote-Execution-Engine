import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export const SignUpSchema = z.object({
  body: UserSchema,
});

export const SignInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
