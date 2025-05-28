import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderAluno } from "../components/sectionHeaderAluno";
import Link from "next/link";

const HorariosAluno = async () => {


  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <Container>
        <SectionHeaderAluno title="Quadro de Horários" />
      </Container>
    </main>
  );
};

export default HorariosAluno;
