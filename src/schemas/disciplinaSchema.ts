import { z } from "zod";

export const disciplinaSchema = z.object({
  codigo: z.string(),
  nome: z.string().min(1, "Insira o nome"),
  ementa: z.string().min(1, "Selecione a ementa da disciplina"),
  cargaHoraria: z.string().min(1, "Insira a carga horária"),
  periodo: z.string().min(1, "Insira o período"),
  curso: z.string().min(1, "Insira o curso que a disciplina está incluída"),
});

export type DisciplinaSchemaType = z.infer<typeof disciplinaSchema>;
