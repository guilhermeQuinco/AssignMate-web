import { api } from "@/lib/axios";

export async function getProfessors() {
  const { data } = await api.get("/professores");

  return data;
}

export const ProfessorService = {
  getProfessors,
};
