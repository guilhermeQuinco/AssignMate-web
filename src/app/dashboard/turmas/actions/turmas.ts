"use server";

import { api } from "@/lib/axios";
import { TurmaSchemaType } from "@/schemas/turmaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios"; // Garanta que o axios esteja importado

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
        //nome: turmaData.nome, // Descomente se 'nome' for parte do seu TurmaSchemaType e necessário aqui
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
      message: "Turma adicionada com sucesso!", // Mensagem de sucesso mais descritiva
      data: response.data,
    };
  } catch (error) {
    // Verifica se o erro é um AxiosError para acessar detalhes da resposta
    if (axios.isAxiosError(error)) {
      // Loga a resposta de erro completa da API para depuração
      console.error("Erro da API ao adicionar turma:", error.response?.data);

      // Verifica por um código de status específico (ex: 409 Conflict para duplicatas)
      // Ou procura por uma mensagem específica nos dados da resposta de erro
      if (error.response?.status === 409) { // Exemplo: Se seu backend retorna 409 para conflitos
        throw new Error("Erro: Turma já existe com este código ou dados. Por favor, verifique.");
      }
      
      // Se o backend enviar uma mensagem específica, use-a
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Fallback para outros erros do Axios
      throw new Error("Erro ao cadastrar turma: " + (error.response?.statusText || "Erro desconhecido da API."));
    }

    // Fallback para erros que não são do Axios (ex: problemas de rede)
    console.error("Erro inesperado ao adicionar turma:", error);
    throw new Error("Erro inesperado ao cadastrar turma. Tente novamente.");
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
      console.error("Erro na API ao excluir turma:", error.response?.data); // Ajustado para "turma"
      throw new Error(
        error.response?.data?.message || "Erro ao excluir turma"
      );
    }

    console.error("Erro desconhecido ao excluir turma:", error);
    throw new Error("Erro inesperado ao excluir turma");
  }
}