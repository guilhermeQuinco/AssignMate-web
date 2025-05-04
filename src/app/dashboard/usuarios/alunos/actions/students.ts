"use server";

import { api } from "@/lib/axios";
import { StudentSchemaType } from "@/schemas/studentSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios";

export async function getStudents() {
  const token = (await cookies()).get("token")?.value;

  const response = await api.get("/alunos", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function addNewStudent(studentData: StudentSchemaType) {
  const token = (await cookies()).get("token")?.value;

  try {
    const response = await api.post(
      "/alunos",
      {
        matricula: studentData.matricula,
        nomeCompleto: studentData.nomeCompleto,
        dataNascimento: studentData.dataNascimento,
        curso: studentData.curso,
        email: studentData.email,
        password: studentData.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/dashboard/usuarios/alunos");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API ao adicionar aluno:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Erro ao adicionar aluno"
      );
    }

    // Outros tipos de erro
    console.error("Erro desconhecido ao adicionar aluno:", error);
    throw new Error("Erro inesperado ao adicionar aluno");
  }
}

export async function deleteStudent(id: number) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.delete(`/alunos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/usuarios/alunos");
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
