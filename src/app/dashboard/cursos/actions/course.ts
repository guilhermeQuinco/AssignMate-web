"use server";

import { api } from "@/lib/axios";
import { CourseSchemaType } from "@/schemas/courseSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCourses() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/cursos", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.data;
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
      message: "curso adicionado",
      data: response.data,
    };
  } catch (error) {
    return error;
  }
}
