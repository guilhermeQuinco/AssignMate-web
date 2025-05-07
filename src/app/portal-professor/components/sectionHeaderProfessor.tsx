"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
  title: string;
  addLabel?: string;
}

export function SectionHeaderProfessor({
  title,
  addLabel = "Voltar",
}: SectionHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-[#1D3E62] text-3xl font-medium">{title}</h1>

      <Button
        type="button"
        onClick={() => router.back()}
        className="w-32 h-10 px-6 bg-[#1D3E62] rounded-2xl text-zinc-300 text-base font-medium flex items-center gap-2"
      >
        <FaArrowLeft className="w-4 h-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}
