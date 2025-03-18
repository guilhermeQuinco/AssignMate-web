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

import { Container } from "../../_components/container";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const data: Professor[] = [
  {
    matricula: "m5gr84i9",
    nome: "Carlos Henrique Augusto",
    nascimento: "success",
    email: "ken99@example.com",
  },
  {
    matricula: "3u1reuv4",
    nome: "Carlos Henrique Augusto",
    nascimento: "success",
    email: "Abe45@example.com",
  },
  {
    matricula: "derv1ws0",
    nome: "Carlos Henrique Augusto",
    nascimento: "processing",
    email: "Monserrat44@example.com",
  },
  {
    matricula: "5kma53ae",
    nome: "Carlos Henrique Augusto",
    nascimento: "success",
    email: "Silas22@example.com",
  },
  {
    matricula: "bhqecj4p",
    nome: "Carlos Henrique Augusto",
    nascimento: "failed",
    email: "carmella@example.com",
  },
];

export type Professor = {
  matricula: string;
  nome: string;
  nascimento: string;
  email: string;
};

export default function Professors() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  const columns: ColumnDef<Professor>[] = [
    {
      accessorKey: "matricula",
      header: "Matrícula",
    },
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "nascimento",
      header: "Data de nascimento",
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
    router.push("/dashboard/usuarios/professores/edit");
  };

  return (
    <main className="bg-[#065D89] min-h-screen">
      <Container>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between mb-10">
            <h1 className="text-[2rem] font-bold">Lista de professores</h1>

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
                <Link href={"/dashboard/usuarios/professores/novo"}>
                  <span>+ Adicionar professor</span>
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
    </main>
  );
}
