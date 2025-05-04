"use server";

import { api } from "@/lib/axios";
import { ProfessorSchemaType } from "@/schemas/professorSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios";

/**
 * Busca todos os professores cadastrados.
 */
export async function getProfessors() {
  const token = (await cookies()).get("token")?.value;

  const response = await api.get("/professores", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

/**
 * Adiciona um novo professor no sistema.
 * ⚠️ O campo senha não é enviado pois ainda não existe no banco de dados.
 */
export async function addNewProfessor(professorData: ProfessorSchemaType) {
  const token = (await cookies()).get("token")?.value;

  try {
    const response = await api.post(
      "/professores",
      {
        matricula: professorData.matricula,
        nomeCompleto: professorData.nomeCompleto,
        dataNascimento: professorData.dataNascimento,
        especialidade: professorData.especialidade,
        email: professorData.email,
        password: professorData.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Atualiza o cache da lista de professores
    revalidatePath("/dashboard/usuarios/professores");

    return response.data;
  } catch (error) {
    // Log detalhado para erros de API
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro na API ao adicionar professor:",
        error.response?.data
      );
      throw new Error(
        error.response?.data?.message || "Erro ao adicionar professor"
      );
    }

    // Outros tipos de erro
    console.error("Erro desconhecido ao adicionar professor:", error);
    throw new Error("Erro inesperado ao adicionar professor");
  }
}

/**
 * Exclui um professor por ID.
 */
export async function deleteProfessor(id: number) {
  const token = (await cookies()).get("token")?.value;

  try {
    const response = await api.delete(`/professores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/usuarios/professores");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API ao excluir professor:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Erro ao excluir professor"
      );
    }

    console.error("Erro desconhecido ao excluir professor:", error);
    throw new Error("Erro inesperado ao excluir professor");
  }
}
