import DataTableAluno from "./_components/data-table-aluno";
import { getStudents } from "./actions/students";

export default async function Students() {
  const data = await getStudents();

  return (
    <main className="bg-[#d9d9d9] min-h-screen">
      <DataTableAluno data={data} />
    </main>
  );
}
