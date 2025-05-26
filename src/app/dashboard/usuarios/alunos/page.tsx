import { PaginationComponent } from "@/components/pagination-component";
import DataTableAluno from "./_components/data-table-aluno";
import { getStudents } from "./actions/students";
import { cookies } from "next/headers";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Students(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const students = await getStudents();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 2;

  const lastPage = Math.ceil(students.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const paginatedStudents = students.data.slice(initialIndex, finalIndex);

  const data = {
    students: paginatedStudents,
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableAluno data={data.students} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={students.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
}
