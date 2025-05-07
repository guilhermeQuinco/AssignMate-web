"use client";

import { useEffect, useState } from "react";
import DisciplinaForm from "./components/disciplina-form";
import { getCourses } from "@/app/dashboard/cursos/actions/course";
import { getDisciplinas } from "../actions/disciplinas";

// Tipagem opcional para segurança
type Disciplina = {
  codigo: string;
  [key: string]: any;
};

const NovaDisciplinaPage = () => {
  const [courses, setCourses] = useState([]); // Tipar adequadamente, caso necessário
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]); // Tipado aqui

  useEffect(() => {
    async function fetchData() {
      try {
        const cursos = await getCourses();
        setCourses(Array.isArray(cursos) ? cursos : cursos?.data || []);

        const disciplinasData = await getDisciplinas();
        const lista = Array.isArray(disciplinasData)
          ? disciplinasData
          : disciplinasData?.data || [];

        setDisciplinas(lista);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="bg-[#D9D9D9] min-h-screen">
      <DisciplinaForm
        courses={courses}
        disciplinas={disciplinas}
        lastRegistration="" // Deixe que o DisciplinaForm gerencie o código
      />
    </section>
  );
};

export default NovaDisciplinaPage;
