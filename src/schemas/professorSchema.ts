import { z } from "zod";

export const professorSchema = z.object({
  matricula: z.string().min(1, "Insira a matrícula"),
  nomeCompleto: z.string().min(1, "Insira a matrícula"),
  dataNascimento: z.string().min(1, "Insira a matrícula"),
  especialidade: z.string().min(1, "Insira a especialidade"),
  email: z.string().min(1, "Insira a matrícula"),
});

export type ProfessorSchemaType = z.infer<typeof professorSchema>;
