"use server";

import { api } from "@/lib/axios";
import { TurmaSchemaType } from "@/schemas/turmaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getProfessorTurmas() {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get("/turmas", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.data;
}

export async function getSingleTurma(id: string) {
  const token = (await cookies()).get("token")?.value;

  const response = await api.get(`/turmas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
