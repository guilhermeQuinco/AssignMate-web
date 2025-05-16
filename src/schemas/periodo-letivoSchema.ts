import { z } from "zod";

export const periodoLetivoSchema = z.object({
  nome: z.string().min(5, "Insira o nome da disciplina"),
  descricao: z.string().optional(),
  cargaHoraria: z.coerce.number().min(30, "Mín. 30h").max(200, "Máx. 200h"),
  periodo: z.string().min(1, "Insira o período"),
  cursoId: z.string().min(1, "Curso é obrigatório"),
  turma: z.string().min(1, "Turma é obrigatória"),
});
export type PeriodoLetivoSchemaType = z.infer<typeof periodoLetivoSchema>;


