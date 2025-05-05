import React from "react";
import { cookies } from "next/headers";
import DataTableTurma from "./_components/data-table-turma";
import { getTurmas } from "./actions/turmas";
import { getCourses } from "../cursos/actions/course";
import { Course } from "@/types";
import { PaginationComponent } from "@/components/pagination-component";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Turmas = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const turmas = await getTurmas();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const lastPage = Math.ceil(turmas.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const data = {
    turmas: turmas.data,
    initialIndex,
    finalIndex,
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableTurma data={data} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={turmas.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
};

export default Turmas;
