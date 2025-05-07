import React from "react";
import { getProfessorTurmas } from "./actions/turmas-professor";
import { Turma } from "@/types";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
import Link from "next/link";

const TurmasProfessor = async () => {
  const turmas: Turma[] = await getProfessorTurmas();

  console.log(turmas);

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderCadastro title="Turmas" />
        <div className="w-full grid grid-cols-3 gap-10">
          {turmas.map((item) => (
            <Link href={`/portal-professor/turmas/${item.id}`} key={item.id}>
              <div className="w-full border bg-[#1D3E624D] p-5 rounded-2xl flex flex-col gap-3">
                <h1 className="font-semibold text-lg">{item.codigo}</h1>
                {item.turno}

                <div className="flex flex-col gap-2 text-[#64748B]">
                  {item.semestre}/ Semestre
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default TurmasProfessor;
