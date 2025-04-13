import React from "react";
import { cookies } from "next/headers";
import DataTableTurma from "./_components/data-table-turma";
import { getTurmas } from "./actions/turma";

const Turmas = async () => {
  const data = await getTurmas();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableTurma data={data} />
    </main>
  );
};

export default Turmas;
