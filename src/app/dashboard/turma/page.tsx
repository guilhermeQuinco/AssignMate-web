import React from "react";
import { cookies } from "next/headers";
import DataTableCourse from "./_components/data-table-turma";
import { getCourses } from "./actions/turma";

const Courses = async () => {
  const data = await getCourses();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableCourse data={data} />
    </main>
  );
};

export default Courses;
