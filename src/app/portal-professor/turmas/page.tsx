import React from "react";
import { getProfessorTurmas } from "./actions/turmas-professor";
import { Turma } from "@/types";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";
import Link from "next/link";
import Disciplinas from "@/app/dashboard/disciplinas/page";

const TurmasProfessor = async () => {
  const turmas: Turma[] = await getProfessorTurmas();

  // Agrupar turmas por curso
  const turmasPorCurso = turmas.reduce<Record<string, Turma[]>>((acc, turma) => {
    const nomeCurso = turma.curso?.nome || "Sem Curso";
    if (!acc[nomeCurso]) {
      acc[nomeCurso] = [];
    }
    acc[nomeCurso].push(turma);
    return acc;
  }, {});

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderProfessor title="Turmas" />

        <div className="flex flex-col gap-10 mt-10">
          {Object.entries(turmasPorCurso).map(([curso, turmas]) => (
            <div key={curso} className="flex items-center gap-10">
              {/* Coluna do nome do curso */}
              <div className="min-w-[250px]">
                <span className="bg-[#1D3E62] text-white font-semibold px-5 py-3 rounded-xl block text-center uppercase text-sm tracking-wider">
                  {curso}
                </span>
              </div>

              {/* Coluna das turmas */}
              <div className="flex flex-wrap gap-6">
                {turmas.map((item) => (
                  <Link href={`/portal-professor/turmas/${item.id}`} key={item.id}>
                    <div className="w-[250px] bg-[#1D3E624D] hover:bg-[#1D3E6270] transition-colors p-5 rounded-2xl shadow-sm flex flex-col gap-3">
                      <h1 className="font-semibold text-sm text-[#0f172a]">{item.codigo}</h1>
                      <p className="text-[#0f172a] text-sm">{item.disciplinas?.nome}</p>
                      <p className="text-[#0f172a] text-sm">Lógica de Programação</p>
                      <p className="text-sm text-[#64748B]">
                        {/* {item.semestre}° Período - 2025 */} 1° Período - 2025
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default TurmasProfessor;
