"use client";

import { useEffect, useState } from "react";
import ProfessorForm from "./components/professor-form";
import { getProfessors } from "../actions/professors";

const NewProfessor = () => {
  const [lastRegistration, setLastRegistration] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const response = await getProfessors();
      // se vier { data: [...] }
      const arrayData = Array.isArray(response) ? response : response.data;

      // define o prefixo do ano atual
      const yearCode = String(new Date().getFullYear()).slice(-2); // "25"
      const prefix = `${yearCode}P`;                              // "25P"

      // pega só as matriculas que começam com esse prefixo
      const matriculas = arrayData
        .map((prof: any) => prof.matricula)
        .filter((m: string) => typeof m === "string" && m.startsWith(prefix));

      // extrai a parte numérica e encontra o maior
      const numbers = matriculas.map((m: string) =>
        parseInt(m.slice(prefix.length), 10)
      );
      const maxNumber = numbers.length ? Math.max(...numbers) : 0;

      // reconstrói a matrícula completa (sem incrementar aqui)
      const lastReg =
        maxNumber > 0
          ? prefix + String(maxNumber).padStart(5, "0")
          : undefined;

      setLastRegistration(lastReg);
    }

    fetchData();
  }, []);

  return (
    <section className="bg-[#D9D9D9] min-h-screen">
      <ProfessorForm lastRegistration={lastRegistration} />
    </section>
  );
};

export default NewProfessor;
