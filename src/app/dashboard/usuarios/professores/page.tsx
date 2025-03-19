import { ProfessorService } from "@/services/professor";
import DataTableProfessor from "./_components/data-table-professor";

export default async function Professors() {
  const data = await ProfessorService.getProfessors();

  return (
    <main className="bg-[#065D89] min-h-screen">
      <DataTableProfessor data={data} />
    </main>
  );
}
