import { z } from "zod";

export const courseSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
