import { Course } from "@/types";
import { getCourses } from "../../cursos/actions/course";
import { TurmaForm } from "./components/turma-form";

export default async function NovaTurma() {
  const courses: Course[] = (await getCourses()).sort();

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <TurmaForm courses={courses} />
    </div>
  );
}
