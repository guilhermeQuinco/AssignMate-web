import { api } from "@/lib/axios";

export async function getAlunos(accessToken: string) {
  const { data } = await api.get("/alunos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export const AlunoService = {
  getAlunos,
};
