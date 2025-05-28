"use server";

import { api } from "@/lib/axios";
import { CourseSchemaType } from "@/schemas/courseSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import axios from "axios"; // Make sure axios is imported to use axios.isAxiosError

export async function getCourses() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/cursos", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
}

export async function addCourse(courseData: CourseSchemaType) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.post(
      "/cursos",
      {
        codigo: courseData.codigo,
        nome: courseData.nome,
        descricao: courseData.descricao,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/dashboard/cursos");

    return {
      message: "Curso adicionado com sucesso!", // More descriptive success message
      data: response.data,
    };
  } catch (error) {
    // Check if the error is an AxiosError to access response details
    if (axios.isAxiosError(error)) {
      // Log the full API error response for debugging
      console.error("Erro da API ao adicionar curso:", error.response?.data);

      // ***** MAIN ADJUSTMENT HERE *****
      // Prioritize the 'course already exists' message if the status is 409
      if (error.response?.status === 409) {
        throw new Error("Erro: Curso já existe com este código ou dados. Por favor, verifique.");
      }
      
      // If not a 409 error, but the backend sent a specific message, use it
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Fallback for other Axios errors (e.g., 400 Bad Request, 500 Internal Server Error)
      throw new Error("Erro ao cadastrar curso: " + (error.response?.statusText || "Erro desconhecido da API."));
    }

    // Fallback for non-Axios errors (e.g., network issues before the request is sent)
    console.error("Erro inesperado ao adicionar curso:", error);
    throw new Error("Erro inesperado ao cadastrar curso. Tente novamente.");
  }
}

export async function deleteCourse(id: string) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await api.delete(`/cursos/${id}`, { // Changed to capture response for potential future use
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/cursos");
    return { message: "Curso excluído com sucesso!" }; // Added a success message for delete
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na API ao excluir curso:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Erro ao excluir curso"
      );
    }

    console.error("Erro desconhecido ao excluir curso:", error);
    throw new Error("Erro inesperado ao excluir curso");
  }
}