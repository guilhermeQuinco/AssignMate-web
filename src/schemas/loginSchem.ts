import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Insira seu email" }),
  password: z.string().min(1, { message: "Insira sua senha" }),
});

export const apiResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.string().datetime(),
    role: z.string(),
    image: z.string().url(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  token: z.string(),
});
