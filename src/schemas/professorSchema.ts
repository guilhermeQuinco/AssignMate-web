import { z } from "zod";

export const professorSchema = z.object({
  matricula: z.string(), // A matrícula pode ser gerada automaticamente
  nomeCompleto: z.string().min(1, "Insira o nome completo"),
  dataNascimento: z.coerce.date(),
  especialidade: z.string().min(1, "Insira uma especialidade"),
  email: z.string().min(1, "Insira o e-mail"),
  password: z.string(),
});

export type ProfessorSchemaType = z.infer<typeof professorSchema>;
