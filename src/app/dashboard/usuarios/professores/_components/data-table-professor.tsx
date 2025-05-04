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
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  LockOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Container } from "../../../_components/container";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Professor } from "@/types";
import { DateFormatter } from "@/lib/date";
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
import { deleteProfessor } from "../actions/professors";
import EditProfessor from "../edit/page";
import { Button } from "@/components/ui/button";
import { PaginationComponent } from "@/components/pagination-component";

interface TableProfessorProps {
  data: { professors: Professor[]; initialIndex: number; finalIndex: number };
}

export default function DataTableProfessor({ data }: TableProfessorProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const onDeleteProfessor = async (id: number) => {
    try {
      await deleteProfessor(id);
    } catch (error) {}
  };

  const columns: ColumnDef<Professor, any>[] = [
    {
      accessorKey: "matricula",
      header: "Matrícula",
      meta: { className: "w-[6.25rem]" },
    },
    {
      accessorKey: "nomeCompleto",
      header: "Nome",
      meta: { className: "w-[11.8rem]" },
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.nomeCompleto}</span>
      ),
    },
    {
      accessorKey: "dataNascimento",
      header: "Data de nascimento",
      meta: { className: "w-[11.7rem]" },
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
      accessorKey: "especialidade",
      header: "Especialidade",
      meta: { className: "w-[11.8rem]" },
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.especialidade}</span>
      ),
    },

    {
      accessorKey: "actions",
      header: "Ação",
      meta: { className: "w-[6.25rem]" },
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-4">
            <button>
              <LockOpen size={18} />
            </button>
            <button onClick={() => handleUser()}>
              <Edit size={18} />
            </button>
            <Dialog>
              <DialogTrigger>
                <Trash size={18} />
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Tem certeza disso?</DialogTitle>
                  <DialogDescription>
                    Essa ação não pode ser desfeita. Isso deleterá
                    permanentemente o professor{" "}
                    <span className="font-bold">
                      {row.original.nomeCompleto}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose
                    onClick={() => onDeleteProfessor(row.original.id)}
                  >
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
    data: data.professors.slice(data.initialIndex, data.finalIndex),
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5, // Ajuste esse valor conforme o tamanho do seu header e layout
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleUser = () => {
    router.push("/dashboard/usuarios/professores/edit");
  };

  return (
    <Container>
      <SectionHeaderLista
        title="Lista de Professores"
        searchValue={
          (table.getColumn("nomeCompleto")?.getFilterValue() as string) ?? ""
        }
        onSearchChange={(value) =>
          table.getColumn("nomeCompleto")?.setFilterValue(value)
        }
        addLink="/dashboard/usuarios/professores/novo"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="uppercase font-medium">
                {headerGroup.headers.map((header) => {
                  return (
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
                  );
                })}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
