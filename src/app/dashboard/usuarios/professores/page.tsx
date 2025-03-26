import DataTableProfessor from "./_components/data-table-professor";
import { getProfessors } from "./actions/professors";

export default async function Professors() {
  const data = await getProfessors();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableProfessor data={data} />
    </main>
  );
}
