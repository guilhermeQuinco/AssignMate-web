import React from "react";
import DataTableAluno from "./_components/data-table-aluno";
import { AlunoService } from "@/services/aluno";

const Students = async () => {
  const data = await AlunoService.getAlunos();
  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableAluno data={data} />
    </main>
  );
};

export default Students;
