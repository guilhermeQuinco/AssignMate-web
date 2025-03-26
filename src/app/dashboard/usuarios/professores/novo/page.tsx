import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaArrowLeft } from "react-icons/fa";

import { generateRegistration } from "@/lib/utils";
import { getProfessors } from "../actions/professors";
import ProfessorForm from "./components/professor-form";

const NewProfessor = async () => {
  const response = await getProfessors();

  const lastRegistration = response
    .map((registration: { matricula: string }) => registration.matricula)
    .sort()
    .at(-1);

  return (
    <section className="bg-[#065D89] min-h-screen">
      <ProfessorForm lastRegistration={lastRegistration} />
    </section>
  );
};
export default NewProfessor;
