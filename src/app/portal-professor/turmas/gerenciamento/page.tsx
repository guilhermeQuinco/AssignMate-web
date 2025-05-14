import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";
import { SectionHeaderDetalhes } from "@/app/portal-professor/components/sectionHeaderDetalhes";

const alunos = Array.from({ length: 8 }, (_, i) => ({
  matricula: "25A0001",
  nome: "George R.R Martin",
  n1: 0,
  n2: 0,
  n3: 0,
  atividades: 0,
  media: 0,
}));

const TurmasProfessor = async () => {
  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        {/* Cabeçalho com título */}
        <SectionHeaderProfessor title="Notas da Turma: SIS221N02" />
        <SectionHeaderDetalhes title=""/>

        {/* Tabela de notas */}
        <div className="bg-white rounded-md overflow-x-auto mx-auto
        mt-10 w-3/4 ">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#19325c] text-white">
              <tr>
                <th className="py-3 px-4">MATRÍCULA</th>
                <th className="py-3 px-4">NOME COMPLETO</th>
                <th className="py-3 px-4">N1</th>
                <th className="py-3 px-4">N2</th>
                <th className="py-3 px-4">N3</th>
                <th className="py-3 px-4">ATIVIDADES</th>
                <th className="py-3 px-4">MÉDIA</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, idx) => (
                <tr key={idx} className="border-b text-left">
                  <td className="py-2 px-4">{aluno.matricula}</td>
                  <td className="py-2 px-4">{aluno.nome}</td>
                  <td className="py-2 px-4">{aluno.n1}</td>
                  <td className="py-2 px-4">{aluno.n2}</td>
                  <td className="py-2 px-4">{aluno.n3}</td>
                  <td className="py-2 px-4">{aluno.atividades}</td>
                  <td className="py-2 px-4">{aluno.media}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
};

export default TurmasProfessor;
