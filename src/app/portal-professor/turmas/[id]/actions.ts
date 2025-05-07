import { api } from "@/lib/axios";
import { TurmaSchemaType } from "@/schemas/turmaSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getSingleTurma(id: string) {
  const token = (await cookies()).get("token")?.value;
  const data = await api.get(`/turmas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
}
