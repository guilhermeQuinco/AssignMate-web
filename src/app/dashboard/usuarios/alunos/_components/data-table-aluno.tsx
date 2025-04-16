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
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  Trash2,
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

import { Input } from "postcss";
import { StudentSchemaType } from "@/schemas/studentSchema";

import { Label } from "@radix-ui/react-select";
import EditStudentModal from "./edit-student-modal";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteStudent } from "../actions/students";

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

  const handleEdit = async (data: StudentSchemaType) => {};

  const removeStudent = async (id: string) => {
    await deleteStudent(id);
  };

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
        return (
          <div className="flex items-center gap-5">
            <EditStudentModal student={row.original} />

            <Dialog>
              <DialogTrigger>
                <Trash />
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Tem certeza disso?</DialogTitle>
                  <DialogDescription>
                    Essa ação não pode ser desfeita. Isso deleterá
                    permanentemente o Aluno{" "}
                    <span className="font-bold">
                      {row.original.nomeCompleto}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose onClick={() => removeStudent(row.original.id)}>
                    Sim
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <div className="flex items-center justify-between  border-2 border-black rounded-full p-3">
              <input
                placeholder="Search..."
                value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="bg-transparent placeholder:text-black outline-none w-[300px] "
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
        <div className="rounded-2xl border overflow-hidden">
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
                    No results.
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
