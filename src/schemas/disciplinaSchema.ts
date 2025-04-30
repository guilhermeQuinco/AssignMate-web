import { z } from "zod";

export const disciplinaSchema = z.object({
  codigo: z.string().min(6, "O código deve ter ao menos 6 caracteres"), // ex.: LOG001
  nome: z.string().min(5, "Insira o nome da disciplina"),
  descricao: z.string().optional(), // será sempre "" no cadastro
  cargaHoraria: z.coerce.number().min(30, "Mín. 30h").max(200, "Máx. 200h"),
  periodo: z.string().min(1, "Insira o período"),
  cursoId: z.string().min(1, "Curso é obrigatório"),
  //curso: z.string().min(1, "Insira o curso que a disciplina está incluída"),
});
export type DisciplinaSchemaType = z.infer<typeof disciplinaSchema>;

