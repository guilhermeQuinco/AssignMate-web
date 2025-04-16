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

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => {
        const user = row.original;

        return <span className=" ">{row.original.nome}</span>;
      },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <span className=" w-[700px] line-clamp-3 ">
            {row.original.descricao}
          </span>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Ação",
      cell: ({ row }) => {
        const course = row.original;

        return (
          <div className="flex flex-row gap-5">
            <button>
              <Edit size={20} />
            </button>
            <Dialog>
              <DialogTrigger>
                <Trash />
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
          <h1 className="text-3xl font-bold text-black">Lista de Cursos</h1>

          <div className="flex gap-[10rem] items-center">
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
                  className="bg-transparent placeholder:text-black outline-none w-[300px] "
                />

                <Search />
              </div>
            </div>
            <Link
              href={"/dashboard/cursos/novo"}
              className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            >
              + Adicionar
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden relative ">
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
