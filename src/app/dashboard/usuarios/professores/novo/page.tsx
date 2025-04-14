import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaArrowLeft } from "react-icons/fa";

import { generateRegistration } from "@/lib/utils";
import { getProfessors } from "../actions/professors";
import ProfessorForm from "./components/professor-form";

const NewProfessor = async () => {
  const response = await getProfessors(); // ou const { data } = await getProfessors();
  console.log("Response:", response);
  const arrayData = Array.isArray(response) ? response : response.data;
  const lastRegistration = arrayData
    .map((registration: { matricula: string }) => registration.matricula)
    .sort()
    .at(-1);

  return (
    <section className="bg-[#D9D9D9] min-h-screen">
      <ProfessorForm lastRegistration={lastRegistration} />
    </section>
  );
};
export default NewProfessor;
