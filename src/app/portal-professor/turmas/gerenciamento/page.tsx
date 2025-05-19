"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";
import { SectionHeaderDetalhes } from "@/app/portal-professor/components/sectionHeaderDetalhes";
import { Button } from "@/components/ui/button";

const initialAlunos = Array.from({ length: 8 }, (_, i) => ({
  matricula: `25A0001`,
  nome: "George R.R Martin",
  n1: 0,
  n2: 0,
  n3: 0,
  atividades: 0,
  media: 0,
}));

const TurmasGerenciamento = () => {
  const { id } = useParams();

  const [alunos, setAlunos] = useState(initialAlunos);

  const handleNotaChange = (
    index: number,
    field: "n1" | "n2" | "n3" | "atividades",
    value: number
  ) => {
    const updatedAlunos = [...alunos];
    const aluno = { ...updatedAlunos[index], [field]: value };

    // Atualiza a média automaticamente
    const { n1, n2, n3 } = aluno;
    const media = parseFloat(((n1 + n2 + n3) / 3).toFixed(2));

    aluno.media = media;
    updatedAlunos[index] = aluno;
    setAlunos(updatedAlunos);
  };

  const handleSave = () => {
    console.log("Notas salvas:", alunos);
    // Aqui você pode substituir pelo envio para o backend (API)
  };

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        {/* <SectionHeaderProfessor title={`Notas da Turma: ${id}`} /> */}
        <SectionHeaderProfessor title="Notas da Turma: SIS221N01" />
        <SectionHeaderDetalhes title="" />
        <div className="bg-white rounded-md overflow-x-auto mx-auto mt-10 w-3/4">
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
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4">{aluno.matricula}</td>
                  <td className="py-2 px-4">{aluno.nome}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      value={aluno.n1}
                      onChange={(e) =>
                        handleNotaChange(idx, "n1", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      value={aluno.n2}
                      onChange={(e) =>
                        handleNotaChange(idx, "n2", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      value={aluno.n3}
                      onChange={(e) =>
                        handleNotaChange(idx, "n3", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      value={aluno.atividades}
                      onChange={(e) =>
                        handleNotaChange(idx, "atividades", parseFloat(e.target.value))
                      }
                    />
                  </td>
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

export default TurmasGerenciamento;
