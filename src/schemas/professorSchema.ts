import { z } from "zod";

export const professorSchema = z.object({
  matricula: z.string().min(1, "Insira a matrícula"),
  nome: z.string().min(1, "Insira o nome completo"),
  dataNascimento: z.string().min(1, "Insira a data de nascimento"),
  especialidade: z.string().min(1, "Insira a especialidade"),
  email: z.string().min(1, "Insira o e-mail"),
});

export type ProfessorSchemaType = z.infer<typeof professorSchema>;
