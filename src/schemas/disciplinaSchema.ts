import { z } from "zod";

export const disciplinaSchema = z.object({
  codigo: z.string().min(1, "Insira o código da disciplina"),
  nome: z.string().min(1, "Insira o nome"),
  descricao: z.string().min(1, "Selecione a ementa da disciplina"),
  cargaHoraria: z.string().min(1, "Insira a carga horária"),
  periodo: z.string().min(1, "Insira o período"),
  cursoId: z.coerce
    .number()
    .min(1, "Insira o curso que a disciplina está incluída"),
});

export type DisciplinaSchemaType = z.infer<typeof disciplinaSchema>;
