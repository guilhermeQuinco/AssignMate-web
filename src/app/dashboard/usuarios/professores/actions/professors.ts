"use server";

import { api } from "@/lib/axios";
import { ProfessorSchemaType } from "@/schemas/professorSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getProfessors() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/professores", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.data;
}

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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/dashboard/usuarios/professores");
    return response;
  } catch (error) {
    return error;
  }
}

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
    return error;
  }
}
