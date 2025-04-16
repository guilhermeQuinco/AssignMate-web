import { z } from "zod";

export const professorSchema = z.object({
  matricula: z.string().min(1, "Insira a matrícula"),
  nomeCompleto: z.string().min(1, "Insira o nome completo"),
  dataNascimento: z.coerce.date(),
  especialidade: z.string().min(1, "Insira uma especialidade"),
  email: z.string().min(1, "Insira o e-mail"),
});

export type ProfessorSchemaType = z.infer<typeof professorSchema>;
