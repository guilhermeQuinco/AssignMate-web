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

interface TableProfessorProps {
  data: Professor[];
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

  const columns: ColumnDef<Professor>[] = [
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
      accessorKey: "especialidade",
      header: "Especialidade",
    },
    {
      accessorKey: "actions",
      header: "Ação",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-5">
            <button>
              <LockOpen size={20} />
            </button>
            <button onClick={() => handleUser()}>
              <Edit size={20} />
            </button>
            <Dialog>
              <DialogTrigger>
                <Trash size={20} />
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
    router.push("/dashboard/usuarios/professores/edit");
  };

  return (
    <Container>
      <div className="w-full font-robotoSlab text-[#242729]">
        <div className="flex items-center py-4 justify-between mb-10">
          <h1 className="text-3xl font-medium">Lista de Professores</h1>

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
                className="bg-transparent placeholder:text-black outline-none w-[300px]"
              />

              <Search />
            </div>

            <Button className="py-6" asChild>
              <Link href={"/dashboard/usuarios/professores/novo"}>
                <span>+ Adicionar </span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border overflow-hidden">
          <Table className="">
            <TableHeader className="bg-zinc-800 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="uppercase font-bold text-md">
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
      </div>
    </Container>
  );
}
