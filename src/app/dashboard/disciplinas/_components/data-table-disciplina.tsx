"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import {
  Search,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "../../_components/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Disciplina } from "@/types";

interface TableDisciplinaProps {
  data: Disciplina[];
}

export default function DataTableDisciplina({ data }: TableDisciplinaProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const columns: ColumnDef<Disciplina>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
    },
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      accessorKey: "cargaHoraria",
      header: "Carga Horária",
    },
    {
      accessorKey: "periodo",
      header: "Período",
    },
    {
      accessorKey: "actions",
      header: "Ação",
      cell: ({ row }) => {
        // Possivelmente utilizando row.original.id para edição
        return (
          <div className="flex items-center gap-5">
            <button onClick={() => router.push(`/dashboard/disciplinas/${row.original.id}/edit`)}>
              <Edit size={20} />
            </button>
            <button>
              <Trash size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center py-4 justify-between mb-10">
          <h1 className="text-[2rem] font-bold">Lista de Disciplinas</h1>
          <div className="flex items-center gap-16">
            <div className="flex items-center justify-between border-2 border-white rounded-full p-3">
              <input
                placeholder="Search..."
                value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("nome")?.setFilterValue(event.target.value)
                }
                className="bg-transparent placeholder:text-white outline-none w-[300px]"
              />
              <Search />
            </div>
            <Button className="py-6" asChild>
              <Link href="/dashboard/disciplinas/novo">
                <span>+ Adicionar</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-[#313056]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white text-black">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Container>
  );
}
