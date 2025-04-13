import { z } from "zod";

export const turmaSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
});

export type TurmaSchemaType = z.infer<typeof turmaSchema>;
