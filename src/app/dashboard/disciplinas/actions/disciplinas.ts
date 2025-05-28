"use server";

import { api } from "@/lib/axios";
import { DisciplinaSchemaType } from "@/schemas/disciplinaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios";

export async function getDisciplinas() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/disciplinas", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
}

export async function addNewDisciplina(disciplinaData: DisciplinaSchemaType) {
  const token = (await cookies()).get("token")?.value;

  // 1) Log do Payload
  console.log("Payload de criação:", {
    codigo: disciplinaData.codigo,
    nome: disciplinaData.nome,
    descricao: disciplinaData.descricao ?? "",
    cargaHoraria: Number(disciplinaData.cargaHoraria),
    periodo: disciplinaData.periodo,
    cursoId: disciplinaData.cursoId,
  });

  try {
    const response = await api.post(
      "/disciplinas",
      {
        codigo: disciplinaData.codigo,
        nome: disciplinaData.nome,
        descricao: disciplinaData.descricao ?? "",
        cargaHoraria: Number(disciplinaData.cargaHoraria),
        periodo: disciplinaData.periodo,
        cursoId: disciplinaData.cursoId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    revalidatePath("/dashboard/disciplinas");
    return { success: true };
  } catch (error: any) {
    // 2) Log do corpo de resposta de erro
    if (error.response) {
      console.error("Erro do servidor (body):", error.response.data);
      console.error("Erro do servidor (status):", error.response.status);
      console.error("Erro do servidor (data):", error.response.data);
    }
    console.error("Erro em addNewDisciplina:", error);
    throw error;    
  }
}

export async function deleteDisciplina(id: string) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.delete(`/disciplinas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/usuarios/disciplinas");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API ao excluir disciplina:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Erro ao excluir disciplina"
      );
    }

    console.error("Erro desconhecido ao excluir disciplina:", error);
    throw new Error("Erro inesperado ao excluir disciplina");
  }
}
