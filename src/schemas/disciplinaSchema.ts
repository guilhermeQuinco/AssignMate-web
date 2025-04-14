import { z } from "zod";

export const disciplinaSchema = z.object({
  codigo: z.string(),
  nome: z.string().min(1, "Insira o nome"),
  descricao: z.string().min(1, "Insira uma descrição"),
  cargaHoraria: z.string().min(1, "Insira a carga horária"),
  periodo: z.string().min(1, "Insira o período"),
});

export type DisciplinaSchemaType = z.infer<typeof disciplinaSchema>;
