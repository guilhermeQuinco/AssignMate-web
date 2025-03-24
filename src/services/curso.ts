import { CourseSchemaType } from "@/schemas/courseSchema";
import axios from "axios";

export async function createCourse(data: CourseSchemaType) {
  return await axios.post("/api/cursos", {
    codigo: data.codigo,
    nome: data.nome,
    decricao: data.descricao,
  });
}

export async function getCourses() {
  const { data } = await axios.get("/api/cursos");

  return data;
}
