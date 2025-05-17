"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { mockPeriodoLetivo } from "./mock-periodo-letivo-data";
import DataTablePeriodoLetivo from "./_components/data-table-periodo-letivo";
import { PaginationComponent } from "@/components/pagination-component";

export default function PeriodosLetivosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 8);

  const filteredData = useMemo(() => {
    return mockPeriodoLetivo.filter((item) =>
      item.curso.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const total = filteredData.length;
  const lastPage = Math.ceil(total / limit);
  const currentPage = Math.min(Math.max(page, 1), lastPage);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };
  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTablePeriodoLetivo
        data={paginatedData}
        searchValue={search}
        onSearchChange={handleSearchChange} />
              <div className="flex items-center justify-end space-x-2 py-4 pr-10">
        <PaginationComponent totalItems={total} page={currentPage} limit={limit} />
        </div>
        </main>
  )
}