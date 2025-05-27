"use client";

import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderAluno } from "../../components/sectionHeaderAluno";
import { SectionHeaderDetalhes } from "../../components/sectionHeaderDetalhes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const disciplinas = [
  {
    codigo: "SIS101",
    disciplina: "Programação Web",
    n1: 8.5,
    n2: 7.0,
    n3: 9.0,
    atividades: 9.5,
    media: 8.2,
  },
  {
    codigo: "SIS102",
    disciplina: "Banco de Dados",
    n1: 7.0,
    n2: 6.5,
    n3: 7.5,
    atividades: 8.0,
    media: 7.3,
  },
  {
    codigo: "SIS103",
    disciplina: "Estrutura de Dados",
    n1: 9.0,
    n2: 8.5,
    n3: 9.2,
    atividades: 8.5,
    media: 8.8,
  },
  {
    codigo: "SIS104",
    disciplina: "Engenharia de Software",
    n1: 6.0,
    n2: 7.5,
    n3: 6.8,
    atividades: 7.0,
    media: 6.8,
  },
  {
    codigo: "SIS105",
    disciplina: "Sistemas Operacionais",
    n1: 8.0,
    n2: 7.2,
    n3: 8.1,
    atividades: 8.0,
    media: 7.8,
  },
];

const VisualizacaoNotas = () => {
  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderAluno title="Notas" />
        <SectionHeaderDetalhes title="" />

        <div className="bg-white mx-auto rounded-xl shadow overflow-hidden w-3/4 mt-10">
          <Table className="min-w-[700px]">
            <TableHeader className="bg-[#0076A3]">
              <TableRow className="uppercase font-medium">
                <TableHead className="text-white py-2 px-5">CÓDIGO</TableHead>
                <TableHead className="text-white py-2 px-5">DISCIPLINA</TableHead>
                <TableHead className="text-white py-2 px-5">N1</TableHead>
                <TableHead className="text-white py-2 px-5">N2</TableHead>
                <TableHead className="text-white py-2 px-5">N3</TableHead>
                <TableHead className="text-white py-2 px-5">ATIVIDADES</TableHead>
                <TableHead className="text-white py-2 px-5">MÉDIA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white text-md text-black">
              {disciplinas.map((disciplina, index) => (
                <TableRow key={index} className="text-md">
                  <TableCell className="px-5">{disciplina.codigo}</TableCell>
                  <TableCell className="px-5">{disciplina.disciplina}</TableCell>
                  <TableCell className="px-5">{disciplina.n1}</TableCell>
                  <TableCell className="px-5">{disciplina.n2}</TableCell>
                  <TableCell className="px-5">{disciplina.n3}</TableCell>
                  <TableCell className="px-5">{disciplina.atividades}</TableCell>
                  <TableCell className="px-5">{disciplina.media}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </main>
  );
};

export default VisualizacaoNotas;
