import React from "react";
import DataTableAluno from "./_components/data-table-aluno";
import { AlunoService } from "@/services/aluno";
import { cookies } from "next/headers";

const Students = async () => {
  const accessToken = (await cookies()).get("token")?.value;

  const data = await AlunoService.getAlunos(accessToken!);
  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableAluno data={data} />
    </main>
  );
};

export default Students;
