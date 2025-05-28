"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";
import { SectionHeaderDetalhes } from "@/app/portal-professor/components/sectionHeaderDetalhes";

const initialAlunos = Array.from({ length: 20 }, (_, i) => ({
  matricula: `25A00${i + 1}`,
  nome: `Aluno ${i + 1}`,
  frequencia1: false,
  frequencia2: false,
  frequencia3: false,
}));

const TurmasFrequencia = () => {
  const { id } = useParams();
  const [alunos, setAlunos] = useState(initialAlunos);

  const handleCheckboxChange = (
    index: number,
    field: "frequencia1" | "frequencia2" | "frequencia3",
    value: boolean
  ) => {
    const updatedAlunos = [...alunos];
    updatedAlunos[index][field] = value;
    setAlunos(updatedAlunos);
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen overflow-y-auto">
      <Container>
        <SectionHeaderProfessor title="Frequência da Turma: SIS221N01" />
        <SectionHeaderDetalhes title="" />
        <div className="bg-white rounded-md overflow-x-auto mx-auto mt-10 w-3/4">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#19325c] text-white">
              <tr>
                <th className="py-3 px-4">MATRÍCULA</th>
                <th className="py-3 px-4">NOME COMPLETO</th>
                <th className="py-3 px-4 text-center">FREQUÊNCIA (1)</th>
                <th className="py-3 px-4 text-center">FREQUÊNCIA (2)</th>
                <th className="py-3 px-4 text-center">FREQUÊNCIA (3)</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4">{aluno.matricula}</td>
                  <td className="py-2 px-4">{aluno.nome}</td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.frequencia1}
                      onChange={(e) =>
                        handleCheckboxChange(idx, "frequencia1", e.target.checked)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.frequencia2}
                      onChange={(e) =>
                        handleCheckboxChange(idx, "frequencia2", e.target.checked)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.frequencia3}
                      onChange={(e) =>
                        handleCheckboxChange(idx, "frequencia3", e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
};

export default TurmasFrequencia;
