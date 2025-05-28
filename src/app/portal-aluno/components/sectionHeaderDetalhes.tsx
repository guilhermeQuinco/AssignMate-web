"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface SectionHeaderProps {
  title: string;
  addLabel?: string;
  onSave?: () => void;
}

export function SectionHeaderDetalhes({
  title,
  addLabel = "Voltar",
  onSave,
}: SectionHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Exemplo de períodos letivos – você pode substituir por dados reais
  const periodosLetivos = [
    "2023.1",
    "2023.2",
    "2024.1",
    "2024.2",
    "2025.1",
    "2025.2",
  ];

  return (
    <div className="w-3/4 mx-auto mt-10 gap-10 border border-[#1d3e62] rounded-md px-6 py-6 bg-[#d9d9d9] text-[#0f172a] flex flex-col sm:flex-row justify-between">
      <div className="space-y-2 w-full">
        <p>
          <strong>CURSO:</strong>{" "}
          <span className="text-gray-600">Sistemas de Informação</span>
        </p>
        <p>
          <strong>TURMA:</strong>{" "}
          <span className="text-gray-600">02</span>
        </p>
      </div>

      <div className="space-y-2 w-full">
        <p>
          <strong>ANO:</strong>{" "}
          <span className="text-gray-600">2025</span>
        </p>
        <p>
          <strong>PERÍODO:</strong>{" "}
          <span className="text-gray-600">7°</span>
        </p>
      </div>

      <div className="space-y-2 w-full">
        <p className="flex items-center gap-2">
          <strong>PERÍODO LETIVO:</strong>
          <select
            className="px-2 py-1 rounded-xl bg-[#d9d9d9] border border-[#ABABAB] text-[#0f172a] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3a3a3] transition"
            defaultValue="2025.1"
          >
            {periodosLetivos.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </p>
      </div>
    </div>
  );
}
