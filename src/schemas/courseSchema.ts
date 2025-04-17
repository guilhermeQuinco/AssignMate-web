import { z } from "zod";

export const courseSchema = z.object({
  codigo: z.string(),
  nome: z.string().min(1, "Insira o nome do curso"),
  descricao: z.string().min(1, "insira a descrição do curso"),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
