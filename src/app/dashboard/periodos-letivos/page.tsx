/* import React from "react";
import { cookies } from "next/headers";
import DataTablePeriodoLetivo from "./_components/data-table-periodo-letivo";
import { getPeriodosLetivos } from "./actions/periodos-letivos";
import { PaginationComponent } from "@/components/pagination-component";

type Params = Promise<{
  slug: string;
}>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const PeriodosLetivos = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const periodosLetivos = await getPeriodosLetivos();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const lastPage = Math.ceil(periodosLetivos.total / limit);

  let currentPage = +page || 1;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  const initialIndex = limit * (currentPage - 1);
  const finalIndex = limit * currentPage + 1;

  const data = {
    periodosLetivos: periodosLetivos.data,
    initialIndex,
    finalIndex,
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTablePeriodosLetivos data={data} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent
          totalItems={periodosLetivos.total}
          page={page}
          limit={limit}
        />
      </div>
    </main>
  );
};

export default PeriodosLetivos;*/
