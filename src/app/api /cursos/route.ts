import { api } from "@/lib/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const token = (await cookies()).get("token")?.value;

export async function GET() {
  const data = await api.get("/cursos", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await api.post(
      "/cursos",
      {
        codigo: body.codigo,
        nome: body.name,
        descricao: body.descricao,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      message: "Curso criado com sucesso",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
