import React from "react";
import { cookies } from "next/headers";
import DataTableTurma from "./_components/data-table-turma";
import { getTurmas } from "./actions/turmas";
import { getCourses } from "../cursos/actions/course";
import { Course } from "@/types";

const Turmas = async () => {
  const data = await getTurmas();

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableTurma data={data} />
    </main>
  );
};

export default Turmas;
