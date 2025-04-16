import { Course } from "@/types";
import DisciplinaForm from "./components/disciplina-form";
import { getCourses } from "../../cursos/actions/course";

export default async function CreateDisciplinaPage() {
  // Exemplo: "MAT0005" é a última matrícula registrada (ajuste conforme necessário)
  const lastRegistration = "MAT0005";

  const courses: Course[] = await getCourses();

  return (
    <DisciplinaForm lastRegistration={lastRegistration} courses={courses} />
  );
}
