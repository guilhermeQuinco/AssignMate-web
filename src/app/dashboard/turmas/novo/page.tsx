"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types";
import { TurmaForm } from "./components/turma-form";
import { getCourses } from "../../cursos/actions/course";

const NovaTurmaPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cursos = await getCourses();
        setCourses(Array.isArray(cursos) ? cursos : cursos.data || []);
      } catch (error) {
        console.error("Erro ao carregar os cursos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="bg-[#d9d9d9] min-h-screen">
      <TurmaForm courses={courses} />
    </section>
  );
};

export default NovaTurmaPage;
