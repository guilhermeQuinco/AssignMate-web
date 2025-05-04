"use client";

import * as React from "react";

import { Header } from "../../_components/header";
import { SideBar } from "../../_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SectionHeaderLista } from "../../_components/sectionHeaderLista";

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
import { Input } from "@/components/ui/input";

import { Container } from "../../_components/container";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Course, Turma } from "@/types";

interface TableTurmaProps {
  data: { turmas: Turma[]; initialIndex: number; finalIndex: number };
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
      accessorKey: "curso",
      header: "Curso",
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
          <div className="flex items-center gap-4">
            <button onClick={() => handleUser()}>
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
    data: data.turmas.slice(data.initialIndex, data.finalIndex),
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

  const handleUser = () => {
    router.push("/dashboard/turmas/edit");
  };

  return (
    <Container>
      <SectionHeaderLista
        title="Lista de Turmas"
        searchValue={
          (table.getColumn("curso")?.getFilterValue() as string) ?? ""
        }
        onSearchChange={(value) =>
          table.getColumn("curso")?.setFilterValue(value)
        }
        addLink="/dashboard/turmas/novo"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="uppercase font-medium">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white py-2 px-5">
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
    </Container>
  );
}
