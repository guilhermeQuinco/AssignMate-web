"use server";

import { api } from "@/lib/axios";
import { TurmaSchemaType } from "@/schemas/turmaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getTurmas() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/turmas", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.data;
}

export async function addNewTurma(turmaData: TurmaSchemaType) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.post(
      "/turmas",
      {
        codigo: turmaData.codigo,
        semestre: turmaData.semestre,
        //nome: turmaData.nome,
        turno: turmaData.turno,
        modalidade: turmaData.modalidade,
        cursoId: turmaData.curso,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/dashboard/turmas");

    return {
      message: "turma adicionada",
      data: response.data,
    };
  } catch (error) {
    return error;
  }
}
