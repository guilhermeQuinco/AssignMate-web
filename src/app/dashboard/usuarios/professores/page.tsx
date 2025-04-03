import DataTableProfessor from "./_components/data-table-professor";
import { getProfessors } from "./actions/professors";

export default async function Professors() {
  const data = await getProfessors();

  return (
    <main className="min-h-screen bg-[#d9d9d9]">
      <DataTableProfessor data={data} />
    </main>
  );
}
