"use server";

import { api } from "@/lib/axios";
import { DisciplinaSchemaType } from "@/schemas/disciplinaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getDisciplinas() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/disciplinas", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.data;
}

export async function addNewDisciplina(disciplinaData: DisciplinaSchemaType) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.post(
      "/disciplinas",
      {
        codigo: disciplinaData.codigo,
        nome: disciplinaData.nome,
        descricao: "Decrição da Disciplina ",
        cargaHoraria: disciplinaData.cargaHoraria,
        periodo: disciplinaData.periodo,
        cursoId: disciplinaData.cursoId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/dashboard/disciplinas");

    return {
      message: "disciplina adicionada",
      data: response.data,
    };
  } catch (error) {
    return error;
  }
}
