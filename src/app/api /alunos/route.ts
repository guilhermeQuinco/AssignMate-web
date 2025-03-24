import { api } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await api.post("/alunos", {
      matricula: body.matricula,
      nomeCompleto: body.nomeCompleto,
      dataNascimento: body.dataNascimento,
      curso: body.curso,
      email: body.email,
    });

    return NextResponse.json({ message: "User has been created" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
