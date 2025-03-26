import React from "react";
import DataTableAluno from "./_components/data-table-aluno";

import { cookies } from "next/headers";
import { getStudents } from "./actions/students";

const Students = async () => {
  const data = await getStudents();

  console.log(data);

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableAluno data={data} />
    </main>
  );
};

export default Students;
