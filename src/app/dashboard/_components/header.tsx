"use client";

import { signOut } from "@/app/actions/auth";
import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";

export function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    setCurrentDate(`Manaus, ${formattedDate}`);
  }, []);

  const deleteSession = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b z-10 flex-row justify-between px-5 bg-[#d9d9d9] border-zinc-800">
      <div className="text-black font-medium text-lg font-playfair tracking-[3px] gap-3 flex items-center">
        <SidebarTrigger />
        <div className="w-[1px] h-5 bg-black" />
        {currentDate}
      </div>
      <div className="flex items-center space-x-2">
      <Label className="">Admin</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-zinc-800" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={deleteSession}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
