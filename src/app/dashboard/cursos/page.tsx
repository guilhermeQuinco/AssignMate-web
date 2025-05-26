import React from "react";
import { cookies } from "next/headers";
import DataTableCourse from "./_components/data-table-course";
import { getCourses } from "./actions/course";
import { PaginationComponent } from "@/components/pagination-component";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Courses = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const courses = await getCourses();
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const lastPage = Math.ceil(courses.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const paginatedCourses = courses.data.slice(initialIndex, finalIndex);

  const data = {
    courses: paginatedCourses,
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableCourse data={data.courses} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={courses.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
};

export default Courses;
