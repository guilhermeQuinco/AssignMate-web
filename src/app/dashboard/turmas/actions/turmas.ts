"use server";

import { api } from "@/lib/axios";
import { TurmaSchemaType } from "@/schemas/turmaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios";

export async function getTurmas() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/turmas", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
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
        cursoId: turmaData.cursoId,
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

export async function deleteTurma(id: string) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.delete(`/turmas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/turmas");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API ao excluir professor:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Erro ao excluir turma"
      );
    }

    console.error("Erro desconhecido ao excluir turma:", error);
    throw new Error("Erro inesperado ao excluir turma");
  }
}