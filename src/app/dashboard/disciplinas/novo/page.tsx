"use client";

import { useEffect, useState } from "react";
import DisciplinaForm from "./components/disciplina-form";
import { getCourses } from "@/app/dashboard/cursos/actions/course";
import { getDisciplinas } from "../actions/disciplinas";

const NovaDisciplinaPage = () => {
  const [lastRegistration, setLastRegistration] = useState<string>("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cursos = await getCourses();
        setCourses(Array.isArray(cursos) ? cursos : cursos.data || []);

        const disciplinas = await getDisciplinas();
        const allCodigos = Array.isArray(disciplinas)
          ? disciplinas.map((d) => d.codigo)
          : disciplinas?.data?.map((d: any) => d.codigo) || [];

        const prefixos = allCodigos.map((c: string) => c?.substring(0, 3)).filter(Boolean);
        const prefixoMaisRecente = prefixos.length ? prefixos[prefixos.length - 1] : "MAT";

        const codigosFiltrados = allCodigos
          .filter((c: string) => c.startsWith(prefixoMaisRecente))
          .map((c: string) => parseInt(c.slice(prefixoMaisRecente.length), 10))
          .filter((n: number) => !isNaN(n));

        const maxNumber = codigosFiltrados.length ? Math.max(...codigosFiltrados) : 0;
        const lastCodigo = `${prefixoMaisRecente}${String(maxNumber).padStart(4, "0")}`;
        setLastRegistration(lastCodigo);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="bg-[#D9D9D9] min-h-screen">
      <DisciplinaForm lastRegistration={lastRegistration} courses={courses} />
    </section>
  );
};

export default NovaDisciplinaPage;
