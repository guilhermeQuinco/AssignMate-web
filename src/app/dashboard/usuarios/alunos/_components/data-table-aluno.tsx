"use client";

import * as React from "react";

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

import { Container } from "../../../_components/container";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Aluno, Professor } from "@/types";
import { DateFormatter } from "@/lib/date";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "postcss";

interface TableProfessorProps {
  data: Aluno[];
}

export default function DataTableAluno({ data }: TableProfessorProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const columns: ColumnDef<Aluno>[] = [
    {
      accessorKey: "matricula",
      header: "Matrícula",
    },
    {
      accessorKey: "nomeCompleto",
      header: "Nome",
    },
    {
      accessorKey: "dataNascimento",
      header: "Data de nascimento",
      cell: ({ row }) => {
        return <span>{DateFormatter(row.original.dataNascimento)}</span>;
      },
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },

    {
      accessorKey: "actions",
      header: "Ação",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-5">
            <button>
              <Edit size={20} />
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
          <h1 className="text-[2rem] font-bold">Lista de Alunos</h1>

          <div className="flex items-center gap-16  ">
            <div className="flex items-center justify-between  border-2 border-white rounded-full p-3">
              <input
                placeholder="Search..."
                value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="bg-transparent placeholder:text-white outline-none w-[300px]"
              />

              <Search />
            </div>

            <Button className="py-6" asChild>
              <Link href={"/dashboard/usuarios/alunos/novo"}>
                <span>+ Adicionar Aluno</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-[#313056]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white">
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
