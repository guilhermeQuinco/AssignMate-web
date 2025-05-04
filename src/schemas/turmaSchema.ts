import { z } from "zod";

export const turmaSchema = z.object({
  codigo: z.string(),
  semestre: z.string().min(1, "Insira o semestre"),
  //nome: z.string().min(1, "Insira o nome"),
  turno: z.enum(["MANHA", "TARDE", "NOITE"]),
  //curso: z.string().min(1, "Insira o curso"),
  cursoId: z.string().min(1, "Insira o curso"),
  modalidade: z.enum(["PRESENCIAL", "EAD", "HIBRIDO"]),
});

export type TurmaSchemaType = z.infer<typeof turmaSchema>;
