import { z } from "zod";

export const turmaSchema = z.object({
  codigo: z.string(),
  semestre: z.string().min(1, "Insira o semestre"),
  nome: z.string().min(1, "Insira o nome"),
  turno: z.string().min(1, "Insira o turno"),
  modalidade: z.string().min(1, "Insira a modalidade (EAD, presencial, híbrido)"),
});

export type TurmaSchemaType = z.infer<typeof turmaSchema>;
