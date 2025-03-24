import React from "react";
import { AlunoService } from "@/services/aluno";
import { cookies } from "next/headers";
import DataTableCourse from "./_components/data-table-course";
import { getCourses } from "@/services/curso";

const Courses = async () => {
  const data = await getCourses();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableCourse data={data} />
    </main>
  );
};

export default Courses;
