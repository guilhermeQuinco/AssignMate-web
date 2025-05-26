"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "../../_components/sidebar";
import { Header } from "../../_components/header";
import { SectionHeaderLista } from "../../_components/sectionHeaderLista";
import { Container } from "../../_components/container";

import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Disciplina } from "@/types";
import { Button } from "@/components/ui/button";

interface TableDisciplinaProps {
  data: Disciplina[];
}

export default function DataTableDisciplina({ data }: TableDisciplinaProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const columns: ColumnDef<Disciplina, any>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
      meta: { className: "w-[6.25rem]" },
    },
    {
      accessorKey: "nome",
      header: "Nome",
      meta: { className: "w-[15rem]" },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      meta: { className: "w-[37rem]" },
      cell: ({ row }) => (
        <span className="line-clamp-5">{row.original.descricao}</span>
      ),
    },
    {
      accessorKey: "cargaHoraria",
      header: "Carga Horária",
      meta: { className: "w-[12.8rem]" },
    },
    {
      accessorKey: "periodo",
      header: "Período",
      meta: { className: "w-[6.25rem]" },
    },
    {
      accessorKey: "cursoId",
      header: "Curso",
      meta: { className: "w-[15rem]" },
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.curso?.nome}</span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Ação",
      meta: { className: "w-[6.25rem]" },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                router.push(`/dashboard/disciplinas/${row.original.id}/edit`)
              }
            >
              <Edit size={18} />
            </button>
            <button>
              <Trash size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 8, // Ajuste esse valor conforme o tamanho do seu header e layout
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Container>
      <SectionHeaderLista
        title="Lista de Disciplinas"
        searchValue={
          (table.getColumn("nome")?.getFilterValue() as string) ?? ""
        }
        onSearchChange={(value) =>
          table.getColumn("nome")?.setFilterValue(value)
        }
        addLink="/dashboard/disciplinas/novo"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="uppercase font-medium">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`text-white py-2 px-5 ${
                      (header.column.columnDef.meta as any)?.className ?? ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white text-md text-black">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-md"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`px-5 ${
                        (cell.column.columnDef.meta as any)?.className ?? ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
