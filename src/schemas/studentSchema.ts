import { z } from "zod";

export const studentSchema = z.object({
  matricula: z.string(),
  nomeCompleto: z.string().min(1, "Insira o nome completo"),
  dataNascimento: z.coerce.date(),
  curso: z.string().min(1, "Insira o curso"),
  email: z.string().min(1, "Insira o email"),
  password: z.string(),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
