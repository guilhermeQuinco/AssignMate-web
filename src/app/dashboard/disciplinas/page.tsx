import React from "react";
import { cookies } from "next/headers";
import DataTableDisciplina from "./_components/data-table-disciplina";
import { getDisciplinas } from "./actions/disciplinas";
import { PaginationComponent } from "@/components/pagination-component";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Disciplinas = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const disciplinas = await getDisciplinas();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const lastPage = Math.ceil(disciplinas.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const paginateDisciplinas = disciplinas.data.slice(initialIndex, finalIndex);

  const data = {
    disciplinas: paginateDisciplinas,
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableDisciplina data={data.disciplinas} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={disciplinas.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
};

export default Disciplinas;
