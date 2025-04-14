"use client";

import DisciplinaForm from "./components/disciplina-form";

export default function CreateDisciplinaPage() {
  // Exemplo: "MAT0005" é a última matrícula registrada (ajuste conforme necessário)
  const lastRegistration = "MAT0005";

  return <DisciplinaForm lastRegistration={lastRegistration} />;
}
