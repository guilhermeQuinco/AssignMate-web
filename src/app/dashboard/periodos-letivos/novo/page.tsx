"use client";

import React from "react";
import PeriodoLetivoForm from "./components/periodo-letivo-form";
import {
  periodosLetivos,
  mockCourses,
  mockTurmas,
  mockDisciplinas,
  mockProfessores,
  mockHorarios,
  diasSemana,
} from "../mock-periodo-letivo-data";

export default function NovoPeriodoLetivoPage() {
  return (
    <section className="bg-[#D9D9D9] min-h-screen">
      <PeriodoLetivoForm
        courses={mockCourses}
        turmas={mockTurmas}
        disciplinas={mockDisciplinas}
        professores={mockProfessores}
        horarios={mockHorarios}
        diasSemana={diasSemana}
        periodos={periodosLetivos} 
      />
    </section>
  );
}
