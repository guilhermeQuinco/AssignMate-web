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
import { deleteCourse } from "../actions/course";
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

  const onDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id);
    } catch (error) {
      console.error;
    }
  };

  const columns: ColumnDef<Course, any>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
      meta: { className: "w-[6.25rem]" },
    },
    {
      accessorKey: "nome",
      header: "Nome",
      meta: { className: "w-[15rem]" },
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.nome}</span>
      ),
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      meta: { className: "w-[37rem]" },
      cell: ({ row }) => {
        const user = row.original;

        return <span className="line-clamp-5">{row.original.descricao}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "Ação",
      meta: { className: "w-[6.25rem]" },
      cell: ({ row }) => {
        const course = row.original;

        return (
          <div className="flex flex-row gap-4">
            <button>
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
                    permanentemente o curso de{" "}
                    <span className="font-bold">{course.nome}</span>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose onClick={() => onDeleteCourse(course.id)}>
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
        title="Lista de Curso"
        searchValue={
          (table.getColumn("nome")?.getFilterValue() as string) ?? ""
        }
        onSearchChange={(value) =>
          table.getColumn("nome")?.setFilterValue(value)
        }
        addLink="/dashboard/cursos/novo"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-zinc-800 ">
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
          <TableBody className="bg-white text-black text-md">
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
