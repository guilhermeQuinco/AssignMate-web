import { getCourses } from "@/app/dashboard/cursos/actions/course";
import { getStudents } from "../actions/students";
import { Aluno, Course } from "@/types";
import StudentForm from "./components/student-form";

const Student = async () => {
  const lastRegistration = (await getStudents())
    .map((registration: { matricula: string }) => registration.matricula)
    .sort()
    .at(-1);

  const courses: string[] = (await getCourses())
    .map((course: { nome: string }) => course.nome)
    .sort();

  return (
    <div className="min-h-screen bg-[#065D89] ">
      <StudentForm lastRegistration={lastRegistration} courses={courses} />
    </div>
  );
};

export default Student;
