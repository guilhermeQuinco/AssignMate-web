"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { SectionHeaderLista } from "../../_components/sectionHeaderLista";

interface PeriodoLetivoData {
  id: string;
  periodoLetivo: string;
  curso: {
    nome: string;
  };
  turma: string;
  disciplina: string;
  professor: string;
  diaSemana: string;
  turno: string;
}

interface DataTablePeriodoLetivoProps {
  data: PeriodoLetivoData[];
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function DataTablePeriodoLetivo({
  data,
  searchValue,
  onSearchChange,
}: DataTablePeriodoLetivoProps) {
  const router = useRouter();
  const columns: ColumnDef<PeriodoLetivoData, any>[] = [
    {
      accessorKey: "periodoLetivo",
      header: "Período Letivo",
    },
    {
      accessorKey: "curso",
      header: "Curso",
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.curso.nome}</span>
      ),
    },
    {
      accessorKey: "turma",
      header: "Turma",
    },
    {
      accessorKey: "disciplina",
      header: "Disciplina",
    },
    {
      accessorKey: "professor",
      header: "Professor",
    },
    {
      accessorKey: "diaSemana",
      header: "Dia da Semana",
    },
    {
      accessorKey: "turno",
      header: "Turno",
    },
    {
      accessorKey: "actions",
      header: "Ação",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            router.push(`/dashboard/periodos-letivos/${row.original.id}/edit`)
          }
        >
          <Edit size={18} />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <SectionHeaderLista
        title="Lista de Períodos Letivos"
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        addLink="/dashboard/periodos-letivos/novo"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="uppercase font-medium"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white py-2 px-5">
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
                <TableRow key={row.id}>
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
