"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
  title: string;
  addLabel?: string;
}

export function SectionHeaderAluno({
  title,
  addLabel = "Voltar",
}: SectionHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-[#0076A3] text-3xl font-medium">{title}</h1>

      <Button
        type="button"
        onClick={() => router.back()}
        className="w-32 h-10 px-6 bg-[#0076A3] rounded-2xl text-zinc-300 text-base font-medium flex items-center gap-2 hover:bg-[#0076A3]"
      >
        <FaArrowLeft className="w-4 h-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}
