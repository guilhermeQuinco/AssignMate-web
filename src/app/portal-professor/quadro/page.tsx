import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";

type ScheduleItem = {
  day: string;
  discipline: string;
  time: string;
  class: string;
};

const schedule: ScheduleItem[] = [
  {
    day: "SEGUNDA",
    discipline: "AUDITORIA DE QUALIDADE DE PROCESSO",
    time: "18:00 - 21:30",
    class: "SIS221N02",
  },
  {
    day: "TERÇA",
    discipline: "ENGENHARIA DE SOFTWARE I",
    time: "18:00 - 21:30",
    class: "SIS221N02",
  },
  {
    day: "QUARTA",
    discipline: "TÓPICOS ESPECIAIS I",
    time: "18:00 - 21:30",
    class: "SIS221N02",
  },
  {
    day: "QUINTA",
    discipline: "SISTEMAS DISTRIBUÍDOS",
    time: "18:00 - 21:30",
    class: "SIS221N02",
  },
  {
    day: "SEXTA",
    discipline: "MODELAGEM DE BANCO DE DADOS",
    time: "18:00 - 21:30",
    class: "SIS221N02",
  },
];

const QuadroHorarios = async () => {
  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderProfessor title="Quadro de Horários" />
        <div className="bg-white rounded-md overflow-x-auto mx-auto mt-10 w-3/4">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#19325c] text-white">
              <tr>
                <th className="py-4 px-6">DIA</th>
                <th className="py-4 px-6">DISCIPLINA</th>
                <th className="py-4 px-6">HORÁRIO</th>
                <th className="py-4 px-6">TURMA</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-6 font-semibold">{item.day}</td>
                  <td className="py-4 px-6 whitespace-pre-line">{item.discipline}</td>
                  <td className="py-4 px-6">{item.time}</td>
                  <td className="py-4 px-6">{item.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
};

export default QuadroHorarios;
