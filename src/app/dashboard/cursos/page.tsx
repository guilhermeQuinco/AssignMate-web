import React from "react";
import { cookies } from "next/headers";
import DataTableCourse from "./_components/data-table-course";
import { getCourses } from "./actions/course";

const Courses = async () => {
  const data = await getCourses();
  console.log(data);

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableCourse data={data} />
    </main>
  );
};

export default Courses;
