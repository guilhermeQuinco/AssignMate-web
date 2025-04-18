"use client";

import * as React from "react";

import { Header } from "../../_components/header";
import { SideBar } from "../../_components/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

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
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Container } from "../../_components/container";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Course, Turma } from "@/types";

interface TableTurmaProps {
  data: Turma[];
}

export default function DataTableTurma({ data }: TableTurmaProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const columns: ColumnDef<Turma>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
    },
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "semestre",
      header: "Semestre",
    },
    {
      accessorKey: "turno",
      header: "Turno",
    },
    {
      accessorKey: "modalidade",
      header: "Modalidade",
    },
    {
      accessorKey: "actions",
      header: "Ação",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-5">
            <button onClick={() => handleUser()}>
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

  const handleUser = () => {
    router.push("/dashboard/turmas/edit");
  };

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center py-4 justify-between mb-10">
          <h1 className="text-[2rem] font-bold">Lista de Turmas</h1>

          <div className="flex items-center gap-16  ">
            <div className="flex items-center justify-between  border-2 border-black rounded-full p-3">
              <input
                placeholder="Search..."
                value={
                  (table.getColumn("nome")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("nome")?.setFilterValue(event.target.value)
                }
                className="bg-transparent placeholder:text-black outline-none w-[300px]"
              />

              <Search />
            </div>

            <Button className="py-6" asChild>
              <Link href={"/dashboard/turmas/novo"}>
                <span>+ Adicionar</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl shadow overflow-hidden relative ">
          <Table className="">
            <TableHeader className="bg-zinc-800 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="uppercase font-bold text-md"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-white py-4 px-5"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white text-black">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-lg"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-5">
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Container>
  );
}
