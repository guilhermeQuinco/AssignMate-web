import { z } from "zod";

export const disciplinaSchema = z.object({
  codigo: z.string(), // ex.: LOG001
  nome: z.string().min(5, "Insira o nome da disciplina"),
  descricao: z.string().optional(), // será sempre "" no cadastro
  cargaHoraria: z.coerce.number().min(30, "Mín. 30h").max(200, "Máx. 200h"),
  periodo: z.string().min(1, "Insira o período"),
  cursoId: z.string().min(1, "Curso é obrigatório"),
});
export type DisciplinaSchemaType = z.infer<typeof disciplinaSchema>;

