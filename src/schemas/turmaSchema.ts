import { z } from "zod";

export const turmaSchema = z.object({
  codigo: z.string(),
  semestre: z.string().min(1, "Insira o semestre"),
  cursoId: z.string().min(1, "Insira o curso"),
  // //nome: z.string().min(1, "Insira o nome"),
  // turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO"]),
  // //curso: z.string().min(1, "Insira o curso"),
  
  // modalidade: z.enum(["PRESENCIAL", "EAD", "HIBRIDO"]),
  turno: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO"]).optional().refine(val => val !== undefined, {
    message: "Insira o turno"
  }),
  modalidade: z.enum(["PRESENCIAL", "EAD", "HIBRIDO"]).optional().refine(val => val !== undefined, {
    message: "Insira a modalidade"
  }),
});

export type TurmaSchemaType = z.infer<typeof turmaSchema>;
