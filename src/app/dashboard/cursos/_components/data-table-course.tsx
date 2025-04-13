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

import Link from "next/link";
import { Container } from "../../_components/container";

import { Course } from "@/types";
import { useRouter } from "next/navigation";
interface TableCourseProps {
  data: Course[];
}

export default function DataTableCourse({ data }: TableCourseProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const columns: ColumnDef<Course>[] = [
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
      cell: ({ row }) => {
        const user = row.original;

        return (
          <span className="w-full line-clamp-1 ">{row.original.descricao}</span>
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

  return (<SidebarProvider>
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-[250px] bg-[#111]">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col bg-[#e0e2e3] overflow-hidden">
        <div className="border-b border-gray-300">
          <Header />
        </div>

        <div className="p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-black">
              Lista de Cursos
            </h1>

            <div className="flex gap-[10rem] items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="w-80 h-10 pl-10 pr-4 py-2 bg-zinc-100 rounded-2xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                />
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition">
                + Adicionar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="grid grid-cols-4 bg-black text-white font-semibold px-4 py-3 text-sm uppercase">
              <span>Código</span>
              <span>Nome</span>
              <span>Descripção</span>
              <span>Ação</span>
            </div>

            <div className="p-10 text-center text-gray-500 text-sm">
              Sem nada para mostrar
            </div>
          </div>
        </div>
      </div>
    </div>
  </SidebarProvider>
  );
}
