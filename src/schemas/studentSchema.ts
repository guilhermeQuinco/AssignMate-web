import { z } from "zod";

export const studentSchema = z.object({
  matricula: z.string().min(1, "Insira a matrícula"),
  nomeCompleto: z.string().min(1, "Insira o nome completo"),
  dataNascimento: z.string().min(1, "Insira a data de nascimento"),
  curso: z.string().min(1, "Insira o curso"),
  email: z.string().min(1, "Insira o email"),
  senha: z.string().min(1, "Insira a matrícula"),
  confirmarSenha: z.string().min(1, "Insira a matrícula"),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
