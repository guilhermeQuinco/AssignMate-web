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
    turma: "SIS101",
    disciplina: "Programação Web",
    faltas: 5,
    situacao: "Dentro do limite",
  },
  {
    turma: "SIS102",
    disciplina: "Banco de Dados",
    faltas: 0,
    situacao: "Dentro do limite",
  },
  {
    turma: "SIS103",
    disciplina: "Estrutura de Dados",
    faltas: 13,
    situacao: "Próximo do limite",
  },
  {
    turma: "SIS104",
    disciplina: "Engenharia de Software",
    faltas: 16,
    situacao: "Acima do limite",
  },
  {
    turma: "SIS105",
    disciplina: "Sistemas Operacionais",
    faltas: 15,
    situacao: "Limite atingido",
  },
];

const VisualizacaoNotas = () => {
  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderAluno title="Frequência" />
        <SectionHeaderDetalhes title="" />

        <div className="bg-white mx-auto rounded-xl shadow overflow-hidden w-3/4 mt-10">
          <Table className="min-w-[700px]">
            <TableHeader className="bg-[#0076A3]">
              <TableRow className="uppercase font-medium">
                                <TableHead className="text-white py-2 px-5">DISCIPLINA</TableHead>
                                <TableHead className="text-white py-2 px-5">TURMA</TableHead>
                <TableHead className="text-white py-2 px-5">FALTAS</TableHead>
                <TableHead className="text-white py-2 px-5">SITUAÇÃO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white text-md text-black">
              {disciplinas.map((disciplina, index) => (
                <TableRow key={index} className="text-md">
                  <TableCell className="px-5">{disciplina.disciplina}</TableCell>
                  <TableCell className="px-5">{disciplina.turma}</TableCell>
                  <TableCell className="px-5">{disciplina.faltas}</TableCell>
                  <TableCell className="px-5">{disciplina.situacao}</TableCell>
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
