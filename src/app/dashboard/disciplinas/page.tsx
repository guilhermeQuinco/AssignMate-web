import React from "react";
import { cookies } from "next/headers";
import DataTableDisciplina from "./_components/data-table-disciplina";
import { getDisciplinas } from "./actions/disciplinas";

const Disciplinas = async () => {
  const data = await getDisciplinas();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableDisciplina data={data} />
    </main>
  );
};

export default Disciplinas;
