"use client";

import { useState } from "react";
import CursoForm from "./components/curso-form";

export default function NovaPaginaCurso() {
  const [codigoGerado, setCodigoGerado] = useState<string>("");

  return (
    <section className="bg-[#d9d9d9] min-h-screen">
      <CursoForm
        codigoGerado={codigoGerado}
      />
    </section>
  );
}
