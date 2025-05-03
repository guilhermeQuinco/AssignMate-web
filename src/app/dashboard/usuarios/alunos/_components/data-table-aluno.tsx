"use client";

import * as React from "react";

import { Header } from "@/app/dashboard/_components/header";
import { SideBar } from "@/app/dashboard/_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SectionHeaderLista } from "@/app/dashboard/_components/sectionHeaderLista";

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
  LockOpen,
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
import { Aluno } from "@/types";
import { DateFormatter } from "@/lib/date";

import { StudentSchemaType } from "@/schemas/studentSchema";

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

interface TableAlunoProps {
  data: Aluno[];
}

export default function DataTableAluno({ data }: TableAlunoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const handleEdit = async (data: StudentSchemaType) => { };

  const removeStudent = async (id: number) => {
    await deleteStudent(id);
  };

  const columns: ColumnDef<Aluno, any>[] = [
    {
      accessorKey: "matricula",
      header: "Matrícula",
      meta: { className: "w-[6.25rem]" },
    },
    {
      accessorKey: "nomeCompleto",
      header: "Nome",
      meta: { className: "w-[14rem]" },
      cell: ({ row }) => <span className="line-clamp-2">{row.original.nomeCompleto}</span>,
    },
    {
      accessorKey: "dataNascimento",
      header: "Data de nascimento",
      meta: { className: "w-[10.2rem]" },
      cell: ({ row }) => {
        return <span>{DateFormatter(row.original.dataNascimento)}</span>;
      },
    },
    {
      accessorKey: "email",
      header: "E-mail",
      meta: { className: "w-[14rem]" },
    },

    {
      accessorKey: "actions",
      header: "Ação",
      meta: { className: "w-[6.25rem]" },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <button>
              <LockOpen size={18} />
            </button>
            <EditStudentModal student={row.original} />

            <Dialog>
              <DialogTrigger>
                <Trash size={18} />
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
    initialState: {
      pagination: {
        pageSize: 10, // Ajuste esse valor conforme o tamanho do seu header e layout
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
        title="Lista de Alunos"
        searchValue={(table.getColumn("nomeCompleto")?.getFilterValue() as string) ?? ""}
        onSearchChange={(value) =>
          table.getColumn("nomeCompleto")?.setFilterValue(value)
        }
        addLink="/dashboard/usuarios/alunos/novo" />

      {/* Wrapper responsivo com rolagem horizontal se necessário */}
      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <Table className="min-w-[700px]">
            <TableHeader className="bg-zinc-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="uppercase font-medium">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`text-white py-2 px-5 ${(header.column.columnDef.meta as any)?.className ?? ""}`}
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
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="text-md">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`px-5 ${(cell.column.columnDef.meta as any)?.className ?? ""}`}
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </div>

      {/* Paginação */}
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
    </Container>
  );
}
