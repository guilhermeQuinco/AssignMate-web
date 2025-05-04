import { PaginationComponent } from "@/components/pagination-component";
import DataTableProfessor from "./_components/data-table-professor";
import { getProfessors } from "./actions/professors";
import { cookies } from "next/headers";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Professors(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const professors = await getProfessors();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 5;

  const lastPage = Math.ceil(professors.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const data = {
    professors: professors.data,
    initialIndex,
    finalIndex,
  };

  console.log(professors.data);

  return (
    <main className="min-h-screen bg-[#d9d9d9]">
      <DataTableProfessor data={data} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={professors.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
}
