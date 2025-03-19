import { api } from "@/lib/axios";

export async function getAlunos() {
  const { data } = await api.get("/alunos");

  return data;
}

export const AlunoService = {
  getAlunos,
};
