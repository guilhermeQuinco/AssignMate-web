"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addLink: string;
  addLabel?: string;
}

export function SectionHeaderLista({
  title,
  searchValue,
  onSearchChange,
  addLink,
  addLabel = "+ Adicionar",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl font-medium">{title}</h1>

      <div className="flex items-center gap-16">
        <div className="relative w-[18.75rem]">
          <Input
            placeholder="Pesquisar"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 bg-transparent placeholder:text-black pr-10 pl-4 outline-none w-full border border-zinc-800 rounded-[14px]"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-800"
          />
        </div>
        <Button className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300 text-base font-medium flex items-center gap-2">
          <Link href={addLink}>
            <span>{addLabel}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
