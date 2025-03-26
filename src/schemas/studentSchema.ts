import { z } from "zod";

export const studentSchema = z.object({
  matricula: z.string().min(1, "Insira a matrícula"),
  nomeCompleto: z.string().min(1, "Insira a matrícula"),
  dataNascimento: z.string().min(1, "Insira a matrícula"),
  curso: z.string().min(1, "Insira a matrícula"),
  email: z.string().min(1, "Insira a matrícula"),
  senha: z.string().min(1, "Insira a matrícula"),
  confirmarSenha: z.string().min(1, "Insira a matrícula"),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
